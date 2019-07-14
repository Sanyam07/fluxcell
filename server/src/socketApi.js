import { log } from './utils/logger';
import { getUser, createMessage } from './db/helper';

const io = require('socket.io')();
const uuid = require('uuid/v1');

module.exports = function createSocketApi({ httpServer }) {
  io.on('connection', (socket) => {
    socket.on('chatTestListener', (msg) => {
      log('socket is subscribing to chatTestListener ');

      // emit only for who started it
      // socket.emit(emitName, `Hello ${interval}, now is ${new Date().toString()}`);

      // emit for all except who started it
      // socket.broadcast.emit('users_count', clients);

      // emit for all
      io.sockets.emit('chatTestEmit', `Hello ${msg}, now is ${new Date().toString()}`);
    });

    socket.on('chatListener', async ({ channelId, username, body }) => {
      log('saving messages to space');
      try {
        // TODO: getUserByUserName()
        await createMessage({ channelId, userId: 1, body });
      } catch (err) {
        log(err);
      }
      const user = await getUser(1);

      io.sockets.emit('chatServer', { id: uuid(), user, body });
    });
  });

  io.listen(httpServer);
};
