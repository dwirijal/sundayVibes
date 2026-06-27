// Structured logger — wraps console with JSON output and log levels
// ponytail: swap for pino in production with pino-pretty in dev

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }
const minLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

function log(level: LogLevel, msg: string, data?: Record<string, unknown>) {
  if (LEVELS[level] < LEVELS[minLevel]) return
  const entry = { time: new Date().toISOString(), level, msg, ...data }
  const out = JSON.stringify(entry)
  if (level === 'error') console.error(out)
  else if (level === 'warn') console.warn(out)
  else console.log(out)
}

export const logger = {
  debug: (msg: string, data?: Record<string, unknown>) => log('debug', msg, data),
  info: (msg: string, data?: Record<string, unknown>) => log('info', msg, data),
  warn: (msg: string, data?: Record<string, unknown>) => log('warn', msg, data),
  error: (msg: string, data?: Record<string, unknown>) => log('error', msg, data),
}
