'use server'

import { createAdminClient } from "@/config/appwrite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getAllRooms() {
    try {
        const {databases}= await createAdminClient()
        // fetch rooms

        const {documents:rooms}= await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_PROJECT, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS)
        // revalidate the cache
        revalidatePath('/', 'layout')

        return rooms
    } catch (error) {
        console.log("failed to get rooms", error)
        redirect('/error')
    }
    
}
