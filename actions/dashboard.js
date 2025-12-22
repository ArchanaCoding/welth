"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) => {
    const serialized = {...obj};

    if(obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }
}

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

const shouldBeDefault = existingAccounts.length === 0 ? true:data.isDeafault;

if(shouldBeDefault) {
    await db.account.updateMany({
        where: { userId: user.id, isDeafault: true },
        data: { isDeafault: false},
    });
}

// Next.js does not support decimal values before sending it to over next.js we need to serialized balance value of this account and conert bal back to number.
 // New Account Creation
const account = await db.account.create({
    data: {
        ...data,
        balance:balanceFloat,
        userId: user.id,
        isDeafault: shouldBeDefault,
    },
});

const serializedAccount = serializeTransaction(account);

revalidatePath("/dashboard"); // refetch the values from the dashboard page
return {success: true, data: serializedAccount };

    } catch (error) {
throw new Error(error.message);
    }
}