import jwt from "jsonwebtoken";

const auth = (req: any, res: any, next: any) => {
  try {
    let token;
    if (req.headers.cookie) token = req.headers.cookie.split("=")[1];
    //checks if token exists
    if (!token)
      return res.sendStatus(403).json({
        errorMessage: "Unauthorized Access",
      });

    jwt.decode(token);
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403).json({ errorMessage: "Unauthorized Access" });
  }
};

export default auth;
