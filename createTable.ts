import sql from './db';

//sql`DROP TABLE IF EXISTS videos;`.then(() => {
//  console.log('tabela excluida');
//});

sql`CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL
);
`.then(() => {
  console.log('tabela criada');
});
