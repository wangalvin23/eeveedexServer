CREATE TABLE IF NOT EXISTS pokemon (
    id int PRIMARY KEY,
    name text,
    img text
);

INSERT INTO pokemon (id, name, img)
VALUES (133, 'Eevee', '/pokemonImg/eevee.png'),
(134, 'Vaporeon', '/pokemonImg/vaporeon.png'),
(135, 'Jolteon', '/pokemonImg/jolteon.png'),
(136, 'Flareon', '/pokemonImg/flareon.png'),
(196, 'Espeon', '/pokemonImg/espeon.png'),
(197, 'Umbreon', '/pokemonImg/umbreon.png'),
(470, 'Leafeon', '/pokemonImg/leafeon.png'),
(471, 'Glaceon', '/pokemonImg/glaceon.png'),
(700, 'Sylveon', '/pokemonImg/sylveon.png');
