// Jules REST API CLI — scripts/jules.ts
// Docs: https://jules.google/docs/api/reference
// ponytail: alpha API — all calls isolated here so spec churn is a one-file fix.
import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'

loadEnv({ path: resolve(process.cwd(), '.env') })

const BASE = 'https://jules.googleapis.com/v1alpha'
const KEY = process.env.JULES_API_KEY
const SOURCE = process.env.JULES_SOURCE ?? 'sources/github/dwirijal/sundayVibes'

if (!KEY) die('JULES_API_KEY missing — generate at https://jules.google/settings')

type SessionState =
  | 'STATE_UNSPECIFIED' | 'QUEUED' | 'PLANNING' | 'AWAITING_PLAN_APPROVAL'
  | 'AWAITING_USER_FEEDBACK' | 'IN_PROGRESS' | 'PAUSED' | 'FAILED' | 'COMPLETED'

interface Session {
  name: string
  id: string
  prompt?: string
  title?: string
  state: SessionState
  url?: string
  outputs?: { pullRequest?: { url?: string; title?: string; description?: string } }[]
  createTime?: string
  updateTime?: string
}

const TERM = '\x1b[0m'
const useColor = process.stdout.isTTY
const wrap = (code: string) => (s: unknown) => (useColor ? `${code}${s}${TERM}` : String(s))
const dim = wrap('\x1b[2m')
const bold = wrap('\x1b[1m')
const green = wrap('\x1b[32m')
const red = wrap('\x1b[31m')
const yellow = wrap('\x1b[33m')

async function req<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'x-goog-api-key': KEY!, 'Content-Type': 'application/json', ...init.headers },
  })
  const text = await res.text()
  if (!res.ok) {
    const detail = text ? ` — ${text}` : ''
    die(`${res.status} ${res.statusText}${detail}`)
  }
  return text ? (JSON.parse(text) as T) : (undefined as T)
}

function die(msg: string): never {
  console.error(red(`error: ${msg}`))
  process.exit(1)
}

function flag(args: string[], name: string): boolean {
  return args.some((a) => a === name)
}

function opt(args: string[], name: string): string | undefined {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}

async function create(args: string[]): Promise<void> {
  const prompt = args.filter((a) => !a.startsWith('--')).join(' ').trim()
  if (!prompt) die('usage: jules create "<prompt>" [--branch main] [--pr] [--require-plan]')
  const branch = opt(args, '--branch') ?? 'main'
  const body = {
    prompt,
    title: prompt.slice(0, 60),
    sourceContext: { source: SOURCE, githubRepoContext: { startingBranch: branch } },
    ...(flag(args, '--pr') ? { automationMode: 'AUTO_CREATE_PR' } : {}),
    ...(flag(args, '--require-plan') ? { requirePlanApproval: true } : {}),
  }
  const s = await req<Session>('/sessions', { method: 'POST', body: JSON.stringify(body) })
  console.log(`${green('created')} ${bold(s.id)}  ${dim(s.state)}`)
  if (s.url) console.log(`  ${dim(s.url)}`)
}

async function list(): Promise<void> {
  const r = await req<{ sessions: Session[] }>('/sessions?pageSize=30')
  if (!r.sessions?.length) return console.log(dim('no sessions'))
  for (const s of r.sessions) {
    const mark = s.state === 'COMPLETED' ? green('✓') : s.state === 'FAILED' ? red('✗') : yellow('•')
    console.log(`${mark} ${bold(s.id)}  ${dim(s.state)}  ${s.title ?? ''}`)
  }
}

async function get(id: string): Promise<Session> {
  if (!id) die('usage: jules get <sessionId>')
  return req<Session>(`/sessions/${id}`)
}

async function show(id: string): Promise<void> {
  const s = await get(id)
  console.log(`${bold(s.id)}  ${s.state}  ${s.title ?? ''}`)
  if (s.url) console.log(dim(s.url))
  if (s.prompt) console.log(dim(`prompt: ${s.prompt}`))
  for (const o of s.outputs ?? []) {
    const pr = o.pullRequest
    if (pr?.url) console.log(`  ${green('PR')} ${pr.url}`)
  }
}

const TERMINAL: SessionState[] = ['COMPLETED', 'FAILED']
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function watch(id: string): Promise<void> {
  if (!id) die('usage: jules watch <sessionId>')
  let backoff = 5000
  for (;;) {
    const s = await get(id)
    process.stdout.write(`\r${bold(s.id)}  ${s.state}${' '.repeat(8)}`)
    if (TERMINAL.includes(s.state)) {
      process.stdout.write('\n')
      console.log(s.state === 'COMPLETED' ? green('✓ completed') : red('✗ failed'))
      for (const o of s.outputs ?? []) if (o.pullRequest?.url) console.log(`  PR ${o.pullRequest.url}`)
      return
    }
    await sleep(backoff)
    backoff = Math.min(backoff * 2, 30000) // cap 30s; reset implicitly next run
  }
}

async function approve(id: string): Promise<void> {
  if (!id) die('usage: jules approve <sessionId>')
  await req(`/sessions/${id}:approvePlan`, { method: 'POST', body: '{}' })
  console.log(green('plan approved'))
}

async function msg(args: string[]): Promise<void> {
  const id = args[0]
  const text = args.slice(1).join(' ').trim()
  if (!id || !text) die('usage: jules msg <sessionId> "<message>"')
  await req(`/sessions/${id}:sendMessage`, {
    method: 'POST',
    body: JSON.stringify({ prompt: text }),
  })
  console.log(green('sent'))
}

interface Activity {
  originator?: string
  description?: string
  createTime?: string
  planGenerated?: { plan?: { steps?: { index: number; title: string }[] } }
  agentMessaged?: { agentMessage?: string }
  sessionFailed?: { reason?: string }
  artifacts?: { bashOutput?: { command?: string; output?: string } }[]
}

async function activities(id: string): Promise<void> {
  if (!id) die('usage: jules activities <sessionId>')
  const r = await req<{ activities: Activity[] }>(`/sessions/${id}/activities?pageSize=100`)
  if (!r.activities?.length) return console.log(dim('no activities'))
  for (const a of r.activities) {
    const who = a.originator ?? '?'
    const desc = a.description ?? ''
    console.log(`${dim(a.createTime ?? '')}  ${bold(who.padEnd(7))} ${desc}`)
    if (a.planGenerated?.plan?.steps) {
      for (const st of a.planGenerated.plan.steps)
        console.log(`    ${dim(`${st.index}.`)} ${st.title}`)
    }
    if (a.agentMessaged?.agentMessage) console.log(`    ${dim('agent:')} ${a.agentMessaged.agentMessage}`)
    if (a.sessionFailed?.reason) console.log(`    ${red('FAILED:')} ${a.sessionFailed.reason}`)
    for (const art of a.artifacts ?? []) {
      if (art.bashOutput) console.log(`    ${dim(`$ ${art.bashOutput.command}`)}\n      ${art.bashOutput.output}`)
    }
  }
}

async function sources(): Promise<void> {
  const r = await req<{
    sources: { name: string; githubRepo?: { owner?: string; repo?: string; defaultBranch?: { displayName?: string } } }[]
  }>('/sources?pageSize=100')
  for (const s of r.sources ?? []) {
    const gh = s.githubRepo ?? {}
    console.log(`${bold(s.name)}  ${gh.owner ?? ''}/${gh.repo ?? ''}  ${dim(gh.defaultBranch?.displayName ?? '')}`)
  }
}

async function main(): Promise<void> {
  const [cmd, ...rest] = process.argv.slice(2)
  switch (cmd) {
    case 'create': return create(rest)
    case 'list': case 'ls': return list()
    case 'get': return show(rest[0] ?? '')
    case 'watch': return watch(rest[0] ?? '')
    case 'approve': return approve(rest[0] ?? '')
    case 'msg': case 'message': return msg(rest)
    case 'activities': case 'act': return activities(rest[0] ?? '')
    case 'sources': return sources()
    default:
      console.log(`usage: npm run jules -- <command>

commands:
  create "<prompt>" [--branch main] [--pr] [--require-plan]   start a task
  list                                                          list sessions
  get <id>                                                      show one session
  watch <id>                                                    poll until done
  approve <id>                                                  approve pending plan
  msg <id> "<text>"                                             send a message
  activities <id>                                               show plan + outputs
  sources                                                       list connected repos`)
      if (cmd && cmd !== '-h' && cmd !== '--help') process.exit(1)
  }
}

main().catch((e) => die(e?.message ?? String(e)))
