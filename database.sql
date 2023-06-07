CREATE TABLE IF NOT EXISTS pokemon (
    id int PRIMARY KEY,
    name text,
    img text
);

INSERT INTO pokemon (id, name, img)
VALUES (133, 'Eevee', '/pokemonImg/eevee.png');