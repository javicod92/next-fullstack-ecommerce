import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const buffer = await file.arrayBuffer();
  console.log(buffer);
  // Aquí puedes procesar el buffer o guardar el archivo
  return NextResponse.json({ message: "Archivo recibido" });
}
