"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
async function removeSession() {
  // retrieve the session cookie
  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie) {
    return {
      error: "No session cookie found!",
    };
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // delete the session
    await account.deleteSession("current");
    // clear session cookie
    cookies().delete("appwrite-session");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error signing out!",
    };
  }
}

export default removeSession;
