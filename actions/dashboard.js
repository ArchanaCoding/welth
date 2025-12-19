"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";

export async function createAccount(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

// if user exit inside our DB or not
const user = await db.user.findUnique({
    where: {clerkUserId: userId},
});

if (!user) {
    throw new Error("User not found in database");
}

//Convert balance to float before storing in DB
const balanceFloat = parseFloat(data.balance)
if(isNaN(balanceFloat)) {
    throw new Error("Invalid balance amount");
}

//Check if this is teh user's first account
const existingAccounts = await db.account.findMany({
    where: { userId: user.id },
})

const shouldBeDefault = existingAccounts.length === 0?true:data.idDeafault;

if(shouldBeDefault) {
    await db.account.updateMany({
        where: { userId: user.id, is }
    })
}


    } catch (error) {

    }
}