"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";
export default async function getMyBookings() {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(
      sessionCookie.value
    );
    // get users id

    const {user} = await checkAuth()
  
  if(!user){
    return{
        error: 'you must be logged in to see your bookings'
    }
  }

    // fetch user bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("user_id", user.id)]
    );
    return bookings;
  } catch (error) {
    console.log("failed to get user bookings", error);
    return{
        error:'failed to get user bookings'
    }
  }
}
