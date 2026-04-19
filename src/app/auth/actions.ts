"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  const next = String(formData.get("next") || "/");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: {
      data: { full_name: String(formData.get("fullName")) },
    },
  });
  if (error) return { error: error.message };
  return { success: "E-posta adresinizi doğrulayın." };
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmanız gerekiyor." };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: String(formData.get("full_name") || ""),
      phone: String(formData.get("phone") || "") || null,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/hesap");
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
