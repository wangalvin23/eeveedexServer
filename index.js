const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

(async () => {
  const result = await pool.query("SELECT * FROM pokemon");
  console.log(result);
})();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server started on port 5000");
});
