const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
require('dotenv').config();
const API_URI = process.env.URI;

app.get('/', async (req, res) => {
  const request = await fetch(API_URI);
  const response = await request.json();
  let rn = Math.floor(Math.random() * response.results.length);
  const opts = response.results[rn].incorrect_answers.push(response.results[rn].correct_answer)
  res.render("quiz", {rndm: response.results[rn], inca: response.results[rn].incorrect_answers.toString().replace(",", ", "), ca: response.results[rn].correct_answer, opts});
});

app.listen(8080, () => {
  console.log("Listening...");
});