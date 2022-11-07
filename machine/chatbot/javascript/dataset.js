const bots = require("../dataset/bots.json");
const college = require("../dataset/college.json");
const depression = require("../dataset/depression.json");
const entertainment = require("../dataset/entertainment.json");
const general = require("../dataset/general.json");
const healthcare = require("../dataset/healthcare.json");
const swears = require("../dataset/swears.json");

const datasets = [
  ...bots,
  ...college,
  ...depression,
  ...entertainment,
  ...general,
  ...healthcare,
  ...swears,
];

module.exports = datasets;
