// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare global {
//   var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
// }

// const db = globalThis.prismaGlobal || prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db

// export default db;

import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

export default db;