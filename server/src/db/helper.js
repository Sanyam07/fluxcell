import User from './models/User';
import Station from './models/Station';
import Message from './models/Message';
import Channel from './models/Channel';

export async function createUser({ username, email, stationId }) {
  const user = await User.query().insertGraph({
    username,
    email,
    station_id: stationId,
  });
  return user;
}

export async function updateUser({ id, username, email }) {
  const res = await User.query()
    .findById(id)
    .patch({
      username,
      email,
    });

  return res;
}

export async function getUser({ id = null, email = null, username = null }) {
  if (id) {
    return await User.query().where('id', id);
  } else if (email) {
    return await User.query().where('email', email);
  } else if (username) {
    return await User.query().where('username', username);
  }
  return null;
}

export async function createMessage({ channelId, userId, body }) {
  const res = await Message.query().insert({
    body,
    user_id: userId,
    channel_id: channelId,
  });

  return res;
}

export async function getStation({ name }) {
  const res = await Station.query().where('name', '=', name);
  return res;
}

export async function getStations() {
  const res = await Station.query();
  return res;
}

export async function createStation({ name }) {
  const res = await Station.query().insert({
    name,
  });

  return res;
}

export async function updateStation({ id, name }) {
  const res = await Station.query()
    .findById(id)
    .patch({
      name,
    });
  return res;
}

export async function createChannel({ stationId, title, topic }) {
  const res = await Channel.query().insert({
    station_id: stationId,
    title,
    topic,
  });

  return res;
}
