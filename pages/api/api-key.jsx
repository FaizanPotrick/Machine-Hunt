import db from "../../db";
import jwt from "jsonwebtoken";
import ApiKey from "../../db/ApiKeySchema";
import ShortUniqueId from "short-unique-id";
import ErrorHandler from "../../db/ErrorHandler";

const uid = new ShortUniqueId({ length: 24 });

db();

const Api_Key = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        type: "error",
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { machine_name } = req.body;
    const Api_Key = await uid();
    try {
      const api_response = await ApiKey.findOne({
        user_id: decoded.user_id,
        machine: machine_name,
      }).lean();
      if (api_response) {
        return res.status(400).json({
          type: "error",
          message: "Machine already Generated",
        });
      }
      await ApiKey.create({
        user_id: decoded.user_id,
        machine: machine_name,
        api_key: Api_Key,
      });
      return res.status(200).json({
        type: "success",
        message: "API Key Generated Successfully",
      });
    } catch (err) {
      return ErrorHandler(err, res);
    }
  } else if (method === "DELETE") {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        type: "error",
        message: "Unauthorized",
      });
    }
    const { api_id } = req.query;
    try {
      await ApiKey.findByIdAndDelete(api_id);
      return res.status(200).json({
        type: "success",
        message: "API Key Deleted Successfully",
      });
    } catch (err) {
      return ErrorHandler(err, res);
    }
  } else {
    return res.status(400).json({
      type: "error",
      message: "Bad request",
    });
  }
};

export default Api_Key;
