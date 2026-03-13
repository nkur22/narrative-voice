import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import mammoth from "mammoth";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = file.name;
    const mimeType = file.type;
    const extension = filename.split(".").pop()?.toLowerCase();

    // Validate file type
    const isDocx =
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      extension === "docx" ||
      extension === "doc";

    const isPdf = mimeType === "application/pdf" || extension === "pdf";

    if (!isDocx && !isPdf) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    let extractedText = "";

    if (isDocx) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (isPdf) {
      const result = await pdfParse(buffer);
      extractedText = result.text;
    }

    // Upload raw file to Vercel Blob
    const blobFilename = `cv-uploads/${Date.now()}-${filename}`;
    const blob = await put(blobFilename, file, { access: "public" });

    return NextResponse.json({
      text: extractedText,
      blobUrl: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
