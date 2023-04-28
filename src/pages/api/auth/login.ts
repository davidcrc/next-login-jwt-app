import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("body?", req.body);

  const { email, password } = req.body;

  // TODO: validate it from DB or BE
  // check if email and password are valid
  // if email exists
  // if password is correct

  if (email === "admin@local.local" && password === "") {

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 dias
        email: "admin@local.local",
        username: "david",
      },
      process.env.SECRET_STRING_FOR_API || ""
    );

    const serialized = serialize(process.env.NAME_FOR_TOKEN || "", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // depends what is the server
      maxAge: 1000 * 60 * 60 * 24 * 2, // dos dias
      path: "/",
    });

    //TODO: esta parte deberia funcionar en un interceptor de axios
    // debe guardar la cookie
    res.setHeader("Set-Cookie", serialized);

    return res.json("login successefully");
  }

  return res.status(401).json({ error: "invalid email or password" });
};

export default handler;
