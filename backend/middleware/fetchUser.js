import jwt from "jsonwebtoken";
const jwt_secret = "yam";

const fetchUser = (req, res, next) => {
  // Get the User from the jwt token and add id to req object
  // const token =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2OWM3MmQxNTMwODZiYjgyNGQzMGZmIn0sImlhdCI6MTY4NDg1Mzk2MX0.JdTFUnbJ5umIcffx3-P7f6-uZDWWok_XLwoEQDsPObM'
  // const token = req.header('Authentication')
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2OWM3MmQxNTMwODZiYjgyNGQzMGZmIn0sImlhdCI6MTY4NDk4MjU2Mn0.jIKrCoW9-Vv2_53KYdspUDGloISI7GDzzZ6OIyIrM9o";

  // console.log(token)

  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    // console.log(req.user)
    // console.log(data)
    next();
  } catch (error) {
    console.log(error);
    // res.status(401).send({ error: 'Please authenticate using a valid token' })
  }
};

export default fetchUser;
