import sql from './db';

export interface Video {
  title: string;
  description: string;
  duration: number;
}

export class databasePostgres {
  #videos = new Map();

  async list(search: string = '') {
    let videos;
    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title = ${search}`;
    } else {
      videos = await sql`select * from videos;`;
    }
    return videos;
  }

  async create(video: Video) {
    const { title, description, duration } = video;
    await sql`insert into videos (title, description, duration) VALUES (${title}, ${description}, ${duration});`;
  }

  async update(id: number, video: Video) {
    const { title, description, duration } = video;
    const result =
      await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id} RETURNING *;`;
    return result.length > 0 ? result[0] : null;
  }

  async delete(id: number) {
    await sql`delete from videos where id = ${id}`;
  }
}
