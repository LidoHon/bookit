"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";

export default async function cancelBooking(bookingId) {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    // get users id

    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "you must be logged in to cancel a booking",
      };
    }

    //  get the booking
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );
    // check if booking belongs to the current user
    if (booking.user_id !== user.id) {
      return {
        error: "you cannot cancel this booking",
      };
    }
    // cancel the booking
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );
    revalidatePath("/bookings", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to cancel booking ", error);
    return {
      error: "failed to cancel booking",
    };
  }
}
