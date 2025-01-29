import { fastify, FastifyReply, FastifyRequest } from 'fastify';
import { databaseMemory, Video } from './databaseMemory';
import { databasePostgres } from './databasePostgres';

const server = fastify();
//const database = new databaseMemory();
const database = new databasePostgres();

server.get(
  '/videos',
  async (request: FastifyRequest<{ Querystring: { search?: string } }>) => {
    const search = request.query.search;
    const videos = await database.list(search);
    return videos;
  },
);

server.post(
  '/videos',
  async (request: FastifyRequest<{ Body: Video }>, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
      title,
      description,
      duration,
    });
    console.log(`video criado com sucesso!`, JSON.stringify(database.list()));

    return reply.status(201).send();
  },
);

server.put(
  '/videos/:id',
  (request: FastifyRequest<{ Body: Video; Params: { id: number } }>, reply) => {
    const { title, description, duration } = request.body;

    const videoId = request.params.id;

    database.update(videoId, {
      title,
      description,
      duration,
    });
    return reply.status(204).send();
  },
);

server.delete(
  '/videos/:id',
  (request: FastifyRequest<{ Body: Video; Params: { id: number } }>, reply) => {
    const videoID = request.params.id;
    database.delete(videoID);

    return reply.status(204).send();
  },
);

server.listen({
  port: 3333,
});
