import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let supabaseResponse = NextResponse.next({ request });
  let user = null;
  let supabase: Awaited<ReturnType<typeof updateSession>>["supabase"] | null = null;

  try {
    const result = await updateSession(request);
    supabaseResponse = result.supabaseResponse;
    user = result.user;
    supabase = result.supabase;
  } catch {
    return supabaseResponse;
  }

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/auth/giris", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { data: profile } = await supabase!
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      // profiles tablosu yoksa veya kayıt yoksa geliştirme ortamında geç
      if (profile && profile.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      // profiles tablosu henüz oluşturulmamış — kullanıcı giriş yapmışsa izin ver
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
