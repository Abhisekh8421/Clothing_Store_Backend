import jwt from "jsonwebtoken";
export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decodedToken !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_EMAIL_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
