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
// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const files = formData.getAll("file") as File[];
//   console.log(files);
//   const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
//   // Aquí puedes procesar el buffer o guardar el archivo
//   return NextResponse.json("ok");
// }

import multiparty from "multiparty";
import { Readable } from "node:stream";

// export const runtime = "nodejs";

// Función para convertir el request en un Node.js Readable Stream
function toNodeReadable(request: Request): Readable {
  const readable = new Readable({
    read() {},
  });

  request.arrayBuffer().then((buffer) => {
    readable.push(Buffer.from(buffer));
    readable.push(null);
  });

  return readable;
}

interface FormParseResult {
  fields: Record<string, string[] | undefined>;
  files: Record<string, File[] | undefined>;
}

export async function POST(request: Request) {
  const nodeReq = toNodeReadable(request) as Readable & {
    headers: Record<string, string>;
  };

  // Añadir headers al Readable Stream
  nodeReq.headers = Object.fromEntries(request.headers);

  const form = new multiparty.Form();

  const { fields, files }: FormParseResult = await new Promise(
    (resolve, reject) => {
      form.parse(nodeReq as any, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files } as FormParseResult);
        console.log(files);
      });
    }
  );

  return Response.json(files);
}
