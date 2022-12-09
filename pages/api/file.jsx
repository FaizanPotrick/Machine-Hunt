import fs from "fs";

const File = async (req, res) => {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json("Bad Request");
  }
  const { file } = req.body;
  try {
    const code = fs.readFileSync(process.cwd() + `/machine/${file}`, {
      encoding: "utf8",
    });
    res.status(200).json(code);
  } catch (err) {
    res.status(404).json("File not Found");
  }
};

export default File;
