const express = require("express");
const cors = require("cors");
const pool = require("./db");
const fspromises = require("node:fs/promises");
const { writeFile } = require("node:fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.raw({ limit: "5mb", type: "image/png" }));
app.use("/api/pokemonImg", express.static("pokemonImg"));

/*(async () => {
  const result = await pool.query("SELECT DISTINCT * FROM pokemon");
  console.log(result);
})();*/
/*app.post("/api/pokemon", (req, res) => {
  const checkID = req.body.pokemonForm.id;
  console.log({ reqPath: "/api/pokemon", data: checkID });
  (async () => {
    const result = await pool.query(
      `SELECT * FROM pokemon WHERE id = ${checkID}`
    );
    console.log(result.rows[0]);
    if (result.rows[0] !== null)
      res.json({
        data: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          img: result.rows[0].img,
        },
      });
  })();
  res.status(200);
});*/

app.get("/api/database", (req, res) => {
  (async () => {
    const result = await pool.query("SELECT * FROM pokemon ORDER BY id ASC");
    console.log(result.rows);
    res.status(200).json({ pokemon: result.rows });
  })();
});

app.post("/api/editingName/:id", (req, res) => {
  console.log("hello world from api editing");
  console.log(req.params.id);
  console.log(req.body);
  const newName = req.body.newName;
  console.log(newName);
  (async () => {
    const result = await pool.query(
      `UPDATE pokemon SET name = '${newName}' WHERE id = ${req.params.id} RETURNING id, name, img`
    );
    console.log(result.rows);
    if (result.rows[0] !== null) {
      res.json({
        data: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          img: result.rows[0].img,
        },
      });
    } else {
      res.status(404).end();
    }
  })();
  //res.status(200).end();
});

app.post("/api/editingImg/:id", async (req, res) => {
  console.log("hello world from api test");
  console.log(req.params.id);
  console.log(req.body);
  await fspromises.writeFile(`pokemonImg/${req.params.id}.png`, req.body);
  res.status(200).end();
});

app.get("/api/reset", (req, res) => {
  (async () => {
    await pool.query(
      "UPDATE pokemon SET (name, img) = ('Eevee', '/pokemonImg/eevee.png') WHERE id = 133;" +
        "UPDATE pokemon SET (name, img) = ('Vaporeon', '/pokemonImg/vaporeon.png') WHERE id = 134;" +
        "UPDATE pokemon SET (name, img) = ('Jolteon', '/pokemonImg/jolteon.png') WHERE id = 135;" +
        "UPDATE pokemon SET (name, img) = ('Flareon', '/pokemonImg/flareon.png') WHERE id = 136;" +
        "UPDATE pokemon SET (name, img) = ('Espeon', '/pokemonImg/espeon.png') WHERE id = 196;" +
        "UPDATE pokemon SET (name, img) = ('Umbreon', '/pokemonImg/umbreon.png') WHERE id = 197;" +
        "UPDATE pokemon SET (name, img) = ('Leafeon', '/pokemonImg/leafeon.png') WHERE id = 470;" +
        "UPDATE pokemon SET (name, img) = ('Glaceon', '/pokemonImg/glaceon.png') WHERE id = 471;" +
        "UPDATE pokemon SET (name, img) = ('Sylveon', '/pokemonImg/sylveon.png') WHERE id = 700"
    );
    const result = await pool.query("SELECT * FROM pokemon ORDER BY id ASC");
    console.log(result.rows);
    res.json({ pokemon: result.rows });
  })();
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
