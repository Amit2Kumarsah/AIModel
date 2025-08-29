const express = require("express");
const {GeminiResponse} = require("../Controllers/AIController")

const AIRoute = express.Router();

AIRoute.post("/response", GeminiResponse);

module.exports = AIRoute;