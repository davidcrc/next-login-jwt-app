// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("req", req.cookies);

  const { myToken } = req.cookies;

  if (!myToken) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    const user = verify(myToken || "", process.env.SECRET_STRING_FOR_API || "");
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
}
