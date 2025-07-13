import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';
import FormData from 'form-data';
import fetch from 'node-fetch';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save the uploaded file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = path.join(os.tmpdir(), file.name);
    await writeFile(tempPath, buffer);

    // Prepare form data for external API
    const externalForm = new FormData();
    externalForm.append("image", buffer, file.name);

    // Call external API
    const externalRes = await fetch("https://gemini-api-production-4516.up.railway.app/extract", {
      method: "POST",
      body: externalForm,
      headers: externalForm.getHeaders(),
    });

    const result = await externalRes.json();

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Proxy Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
