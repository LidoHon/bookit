"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    // fetch rooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );
    // revalidate the cache
    revalidatePath("/", "layout");

    return room;
  } catch (error) {
    console.log("failed to get room", error);
    redirect("/error");
  }
}
