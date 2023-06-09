const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

/*(async () => {
  const result = await pool.query("SELECT DISTINCT * FROM pokemon");
  console.log(result);
})();*/

app.get("/api/pokemon", (req, res) => {
  (async () => {
    const result = await pool.query("SELECT DISTINCT * FROM pokemon");
    console.log(result.rows);
    res.json({ message: result.rows });
  })();
});

app.post("/api/pokemon", (req, res) => {
  console.log({ reqPath: "/api/pokemon", data: req.body.pokemonForm });
  res.status(200).end();
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
