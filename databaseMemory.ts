import { randomUUID } from 'node:crypto';

export interface Video {
  title: string;
  description: string;
  duration: number;
}

export class databaseMemory {
  #videos = new Map();

  list(search?: string) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const info = videoArray[1];

        return {
          id,
          ...info,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  create(video: Video): void {
    const videoId = randomUUID();
    this.#videos.set(videoId, video);
  }

  update(id: number, video: Video): void {
    this.#videos.set(id, video);
  }

  delete(id: number): void {
    this.#videos.delete(id);
  }
}
