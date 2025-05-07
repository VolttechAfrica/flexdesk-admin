import { NextRequest, NextResponse } from "next/server";
import processQuestion from "@services/genAI";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const result = await processQuestion(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API Error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
