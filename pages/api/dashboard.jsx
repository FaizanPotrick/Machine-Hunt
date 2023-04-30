import db from "../../db";
import jwt from "jsonwebtoken";
import User from "../../db/UserSchema";
import ApiKey from "../../db/ApiKeySchema";

db();

const Dashboard = async (req, res) => {
  const { method } = req;
  if (method !== "GET") {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      type: "error",
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user_response = await User.findById(decoded.user_id).lean();
    const api_response = await ApiKey.find({
      user_id: decoded.user_id,
    }).lean();
    res.status(200).json({
      user_name: user_response.name,
      history: api_response.reverse(),
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
};

export default Dashboard;
