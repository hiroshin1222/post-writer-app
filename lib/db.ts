// avoid creating multiple instances of PrismaClient in development

// @schema.prisma 
// output   = "../generated/prisma" 
// you need to import prisma client from the designated output path in the @schema.prisma file
import { PrismaClient } from "../generated/prisma/index.js";

declare global {
    var cachePrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachePrisma) {
        global.cachePrisma = new PrismaClient();
    }
    prisma = global.cachePrisma;
}

export const db = prisma;
