import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let globalWithMongoose = global as typeof globalThis & {
  _mongooseConnection?: Promise<typeof mongoose>;
};

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    // Conexión ya lista
    return mongoose.connection.asPromise();
  }

  if (process.env.NODE_ENV === "development") {
    // Use a  global conection en desarrollo para HMR
    if (!globalWithMongoose._mongooseConnection) {
      if (uri) {
        globalWithMongoose._mongooseConnection = mongoose.connect(uri);
      }
    }
    return globalWithMongoose._mongooseConnection;
  }

  // Conexión única en producción
  if (uri) {
    return mongoose.connect(uri);
  }
}

// import mongoose from "mongoose";

// export function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     if (uri) {
//       return mongoose.connect(uri);
//     }
//   }
// }
