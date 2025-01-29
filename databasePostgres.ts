import sql from './db';

export interface Video {
  title: string;
  description: string;
  duration: number;
}

export class databasePostgres {
  #videos = new Map();

  async list(search: string = '') {
    const videos = await sql`select * from videos;`;
  }

  async create(video: Video) {
    const { title, description, duration } = video;
    await sql`insert into videos (title, description, duration) VALUES (${title}, ${description}, ${duration});`;
  }

  async update(id: number, video: Video) {
    const videos = await sql`select * from videos()`;
  }

  delete(id: number): void {
    const videos = sql`select * from videos`;
  }
}
