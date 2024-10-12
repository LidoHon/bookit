"use server"; // Ensure you're running this on the server side

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite"; // Import necessary Appwrite components

export async function updateRoom(roomId, formData) {
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");

  }

  // Uploading image
  let imageID;
  const image = formData.get("image");
  if (image && image.size > 0 && image.name !== "undefined") {
    try {
      // Upload image
      const storage = createStorageClient(sessionCookie.value); 
      const response = await storage.createFile("rooms", ID.unique(), image);
      imageID = response.$id;
    } catch (error) {
      console.log("Error uploading the image:", error);
      return {
        error: "Error uploading the image",
      };
    }
  } else {
    console.log("No image file provided or file is invalid");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value
    );

    // Get user's ID
    const user = await account.get();
    const userId = user.$id;

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    // Fetch room to update
    const roomToUpdate = rooms.find((room) => room.$id === roomId);

    // Update the room
    if (roomToUpdate) {
      const updatedRoom = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToUpdate.$id,
        {
          user_id: userId, // Ensure this is correct
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
      return updatedRoom;
    } else {
      console.log("Room not found for ID:", roomId);
      return { error: "Room not found" };
    }
  } catch (error) {
    console.log("Error updating room:", error);
    throw new Error(error.message || "Failed to update room");
  }
}
export default updateRoom;
