import { getChatGPTUser } from "@/app/chatgpt-auth";

export const ADMIN_EMAIL = "deblslima3@gmail.com";

export async function isAdminRequest(): Promise<boolean> {
  const user = await getChatGPTUser();
  return user?.email.toLowerCase() === ADMIN_EMAIL;
}
