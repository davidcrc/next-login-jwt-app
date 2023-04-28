// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { myToken } = req.cookies;

  if (!myToken) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    verify(myToken || "", process.env.SECRET_STRING_FOR_API || "");

    const serialized = serialize(process.env.NAME_FOR_TOKEN || "", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // depends what is the server
      maxAge: 0,
      path: "/",
    });

    //TODO: esta parte deberia funcionar en un interceptor de axios
    // debe borrarse la cookie
    res.setHeader("Set-cookie", serialized);

    res.status(200).json("Logout succesfully");
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
}
