import { NextRequest, NextResponse } from "next/server";

// for single file
// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const file = formData.get("file") as File;
//   const buffer = await file.arrayBuffer();
//   // Aquí puedes procesar el buffer o guardar el archivo
//   return NextResponse.json("ok");
// }

// for multiple files
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  console.log(files);
  const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
  // Aquí puedes procesar el buffer o guardar el archivo
  return NextResponse.json("ok");
}
