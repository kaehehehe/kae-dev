import "server-only";

import { Client } from "@notionhq/client";

import { Post } from "@/app/types/post";

const NOTION_TOKEN = process.env.NOTION_TOKEN as string;
const DB_ID = process.env.NOTION_DATABASE_ID as string;

if (!NOTION_TOKEN) throw new Error("Missing NOTION_TOKEN");
if (!DB_ID) throw new Error("Missing NOTION_DATABASE_ID");

const notion = new Client({ auth: NOTION_TOKEN, notionVersion: "2022-06-28" });

function mapPage(page: any): Post {
  const p = page.properties;
  return {
    pageId: String(page.id),
    slug: p.slug.rich_text[0].plain_text,
    title: p.title.title[0].plain_text,
    description: p.description.rich_text.map((t: any) => t.plain_text).join(""),
    createdAt: p.created.date.start,
    tags: p.tags.multi_select.map((t: any) => t.name),
    coverUrl: page.cover?.external?.url ?? page.cover?.file?.url ?? undefined,
  };
}

let CACHED_STATUS_KEY: string | null = null;

async function getStatusKey(): Promise<string> {
  if (CACHED_STATUS_KEY) return CACHED_STATUS_KEY;
  const db: any = await notion.request({
    method: "get",
    path: `databases/${DB_ID}`,
  });
  const props: Record<string, any> = db?.properties ?? {};
  const found = Object.keys(props).find((k) => props[k]?.type === "status");
  if (!found)
    throw new Error("No status-type property found in the Notion database.");
  CACHED_STATUS_KEY = found;
  return found;
}

async function queryLive(params?: {
  slug?: string;
  pageSize?: number;
  startCursor?: string;
}) {
  const statusKey = await getStatusKey();
  const filter = params?.slug
    ? {
        and: [
          { property: statusKey, status: { equals: "Live" } },
          { property: "slug", rich_text: { equals: params.slug } },
        ],
      }
    : { property: statusKey, status: { equals: "Live" } };

  const baseBody: any = {
    filter,
    sorts: [{ property: "created", direction: "descending" }],
    page_size: params?.pageSize,
    start_cursor: params?.startCursor,
  };

  try {
    return (await notion.request({
      method: "post",
      path: `databases/${DB_ID}/query`,
      body: baseBody,
    })) as any;
  } catch (e: any) {
    if (
      e?.code === "validation_error" ||
      /Could not find sort property/i.test(e?.message)
    ) {
      return (await notion.request({
        method: "post",
        path: `databases/${DB_ID}/query`,
        body: {
          ...baseBody,
          sorts: [{ timestamp: "created_time", direction: "descending" }],
        },
      })) as any;
    }
    throw e;
  }
}

export async function getLivePosts(): Promise<Post[]> {
  const res = await queryLive();
  return (res.results ?? []).map(mapPage);
}

export async function getLivePostBySlug(slug: string): Promise<Post | null> {
  const res = await queryLive({ slug, pageSize: 1 });
  const page = res.results?.[0];
  return page ? mapPage(page) : null;
}
