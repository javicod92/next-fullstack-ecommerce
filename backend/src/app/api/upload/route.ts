import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

type PromiseType = Record<string, string>;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Obtain all images of form
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json("No files", { status: 400 });
    }

    // Array of promises to create each image
    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const response: PromiseType = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "next-ecommerce" }, (err, result) => {
            if (err) reject(err);
            resolve(result as PromiseType);
          })
          .end(buffer);
      });
      // Return url of uploaded image
      return response.secure_url;
    });

    // Wait for all the promises to be resolved
    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Imágenes subidas con éxito",
      urls,
    });
  } catch (error) {
    console.error("Error to upload images:", error);
    return NextResponse.json(
      { error: "Error to upload images" },
      { status: 500 }
    );
  }
}

// This function works good, but is only for one image
// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// // import { writeFile } from "fs/promises";
// // import path from "path";

// type PromiseType = Record<string, string>;

// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const image = data.get("file") as File;

//   if (!image) {
//     return NextResponse.json("No se subió ninguna imágen", { status: 400 });
//   }

//   const bytes = await image.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // Save file within a folder in my local project
//   // const filePath = path.join(process.cwd(), "public", image.name);
//   // await writeFile(filePath, buffer);

//   const response: PromiseType = await new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: "next-ecommerce" }, (err, result) => {
//         if (err) reject(err);
//         resolve(result as PromiseType);
//       })
//       .end(buffer);
//   });

//   console.log(response);

//   return NextResponse.json({
//     message: "Imágen subida con éxito",
//     url: response.secure_url,
//   });
// }

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
