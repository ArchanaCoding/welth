import { PrismaClient } from "@prisma/client"
// initialized prisma clinet
export const db = globalThis.prisma || new PrismaClient() // If you already have a client, use that one || If not, create a new client.

if (process.env.NODE_ENV !== "production") { //Is the app running in development mode?
    globalThis.prisma = db; // Store the created client in a global object for next time
}

// Save the client in development to avoid creating a new client repeatedly.
// Why This Code? > Hot Reload = Code change par server restart.
// Har restart par new PrismaClient() banega.
// Multiple database connections = Performance issue.

//Note:
// Pehli baar: new PrismaClient() banega
// Next reload: wahi client reuse hoga (globalThis.se store hai)

//Works:
// 1. First Time (Server Start):

// globalThis.prisma = undefined
// export const db = undefined || new PrismaClient()  // New client
// globalThis.prisma = db  // Store for next time

// 2. Second Time (Hot Reload):

// globalThis.prisma = PrismaClient (existing)
// export const db = existing_client || new PrismaClient()  // Reuse
// globalThis.prisma = db  // Update reference