import jwt from "jsonwebtoken";

const Verify = async (req, res) => {
  const { method } = req;
  if (method !== "GET") {
    return res.status(400).send("Bad request");
  }
  const { temp_session } = req.cookies;
  if (!temp_session) {
    return res.status(401).send("Unauthorized");
  }
  const decoded = jwt.verify(temp_session, process.env.JWT_SECRET);
  if (
    decoded.step !== "verification_code" &&
    decoded.step !== "reset_password"
  ) {
    return res.status(401).send("Unauthorized");
  }
  res.status(200).send("Authorized");
};

export default Verify;
