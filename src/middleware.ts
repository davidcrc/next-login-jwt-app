import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/about-2", request.url));

  let jwt = request.cookies.get(process.env.NAME_FOR_TOKEN || "")?.value;

  // if (request.nextUrl.pathname.includes("/dashboard")) {
  //   // validar
  //   if (!jwt) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  //   console.log("jjjj", jwt);

  //   try {
  //     const { payload } = await jwtVerify(
  //       jwt,
  //       new TextEncoder().encode(process.env.SECRET_STRING_FOR_API | "")
  //     );
  //     console.log("pp", payload);

  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // validar
  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("jjjj", jwt);

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.SECRET_STRING_FOR_API || "")
    );
    console.log("pp", payload);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/"], // subroutes /route/:path*
};
