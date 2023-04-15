import fs from "fs";
import path from "path";

export default function (req, res) {
  const { machine, file } = req.query;
  const filePath = path.resolve(".", `machine/${machine}/react/${file}`);
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}
