import "server-only";
import { NextResponse } from "next/server";

import { getLivePostBySlug } from "@/app/api/posts/notion";

type RouteParams = Promise<{ slug: string }>;

export async function GET(
  _request: Request,
  { params }: { params: RouteParams },
) {
  try {
    const { slug } = await params;

    const post = await getLivePostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[api/posts/[slug]] error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
