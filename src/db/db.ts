import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const db = globalThis.prismaGlobal ||prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db

export default db;