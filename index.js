const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

/*(async () => {
  const result = await pool.query("SELECT * FROM pokemon");
  console.log(result);
})();
*/
app.use(cors());
app.use(express.json());

/*app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});*/

app.post("/api/pokemon", (req, res) => {
  console.log({ reqPath: "/api/pokemon", data: req.body.pokemonForm });
  res.status(200).end();
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
