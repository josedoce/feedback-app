import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'] //mostra o log de sql
});