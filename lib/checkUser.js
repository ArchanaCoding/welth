import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma"; 

export const checkUser = async() =>  {
    // will take the user details fromm clerk
    const user = await currentUser();

    // 1st will check clerk
    if (!user) {
        return null;
    }

    // 2nd will check our supbase DB 
    try {
     const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
     });

     if (loggedInUser) {
        return loggedInUser;
     }

     const name = `${user.firstName} ${user.lastName}`;

     const newUser = await db.user.create({ // create user inside DB
        data: { // object call data
            clerkUserId: user.id,
            name,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress, // come from clerk & this can have multiple email addr so we taken 0 index
        },
     });

     return newUser;
    } catch (error) {
        console.log(error.message);
    }
}