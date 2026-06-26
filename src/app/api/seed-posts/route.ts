import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(_req: NextRequest) {
  const payload = await getPayload({ config: configPromise });
  const log: string[] = [];

  let authorId: number | undefined;
  const usersRes = await payload.find({ collection: "users", limit: 1, overrideAccess: true });
  if (usersRes.docs.length) authorId = usersRes.docs[0].id as number;

  // Use equipment specs (known working richText) as content template
  const eq = await payload.find({ collection: "equipment", where: { slug: { equals: "dji-lito-x1" } }, limit: 1, overrideAccess: true, depth: 0 });
  const workingSpecs = (eq.docs[0] as any)?.specs;
  log.push(`working specs type: ${typeof workingSpecs}`);

  try {
    const result = await payload.create({
      collection: "posts",
      overrideAccess: true,
      data: { title: "Test Post X", slug: "test-post-x", category: "Test", content: workingSpecs, author: authorId as any },
    });
    log.push(`post created! id=${result.id}`);
  } catch (e: any) {
    log.push(`failed: ${e.message}`);
  }

  return NextResponse.json({ ok: true, log });
}
