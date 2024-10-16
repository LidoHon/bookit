"use server";
import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
  // get databases instance

  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "you must be logged in to create a room",
      };
    }
    // uploading image
    let imageID;

    const image = formData.get("image");
    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        // upload image
        const response = await storage.createFile("rooms", ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        console.log("error uploading the image", error);
        return {
          error: "error uploading the image",
        };
      }
    } else {
      console.log("N image file provided or file is invalid");
    }

    // create a room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
        image: imageID,
      }
    );
    revalidatePath("/", "layout");
    return {
      success: true,
    };
  } catch (error) {
    console.log("error creating rooms", error);
    const errorMessage =
      error?.response?.message || "unexpected error has occurred";
    return {
      error: errorMessage,
    };
  }
}
export default createRoom;
