import "server-only";

import { NextResponse } from "next/server";

import { getLivePosts } from "@/app/api/posts/notion";

export async function GET() {
  try {
    const posts = await getLivePosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("[api/posts] error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal Server Error" },
      { status: 500 },
    );
  }
}
