import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getClickCounts());
}

export async function POST(request: Request) {
  const { linkId } = await request.json().catch(() => ({}));

  // 등록된 링크만 집계해 임의의 키가 DB에 쌓이지 않게 합니다.
  if (typeof linkId !== "string" || !links.some((link) => link.id === linkId)) {
    return NextResponse.json({ error: "Unknown link" }, { status: 400 });
  }

  try {
    const count = await incrementClick(linkId);
    return NextResponse.json({ linkId, count });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
  }
}
