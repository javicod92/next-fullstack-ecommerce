import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
// import { writeFile } from "fs/promises";
// import path from "path";

type PromiseType = Record<string, string>;

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image = data.get("file") as File;

  if (!image) {
    return NextResponse.json("No se subió ninguna imágen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save file within a folder in my local project
  // const filePath = path.join(process.cwd(), "public", image.name);
  // await writeFile(filePath, buffer);

  const response: PromiseType = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "next-ecommerce" }, (err, result) => {
        if (err) reject(err);
        resolve(result as PromiseType);
      })
      .end(buffer);
  });

  console.log(response);

  return NextResponse.json({
    message: "Imágen subida con éxito",
    url: response.secure_url,
  });
}

// for single file
// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const file = formData.get("file") as File;
//   const buffer = await file.arrayBuffer();
//   // Aquí puedes procesar el buffer o guardar el archivo
//   return NextResponse.json("ok");
// }

// for multiple files
// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const files = formData.getAll("file") as File[];
//   console.log(files);
//   const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
//   // Aquí puedes procesar el buffer o guardar el archivo
//   return NextResponse.json("ok");
// }

// import multiparty from "multiparty to manage the form parse"-------------------------------------------
// import { Readable } from "node:stream";

// // export const runtime = "nodejs";

// // Función para convertir el request en un Node.js Readable Stream
// function toNodeReadable(request: Request): Readable {
//   const readable = new Readable({
//     read() {},
//   });

//   request.arrayBuffer().then((buffer) => {
//     readable.push(Buffer.from(buffer));
//     readable.push(null);
//   });

//   return readable;
// }

// interface FormParseResult {
//   fields: Record<string, string[] | undefined>;
//   files: Record<string, File[] | undefined>;
// }

// export async function POST(request: Request) {
//   const nodeReq = toNodeReadable(request) as Readable & {
//     headers: Record<string, string>;
//   };

//   // Añadir headers al Readable Stream
//   nodeReq.headers = Object.fromEntries(request.headers);

//   const form = new multiparty.Form();

//   const { fields, files }: FormParseResult = await new Promise(
//     (resolve, reject) => {
//       form.parse(nodeReq as any, (err, fields, files) => {
//         if (err) reject(err);
//         resolve({ fields, files } as FormParseResult);
//         console.log(files);
//       });
//     }
//   );

//   return Response.json(files);
// }
