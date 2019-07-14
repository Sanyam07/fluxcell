import User from './models/User';
import Space from './models/Space';
import Message from './models/Message';
import Channel from './models/Channel';

export async function createUser({ username, email, spaceId }) {
  const user = await User.query().insertGraph({
    username,
    email,
    space_id: spaceId,
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

export async function getSpace({ name }) {
  const res = await Space.query().where('name', '=', name);
  return res;
}

export async function getSpaces() {
  const res = await Space.query();
  return res;
}

export async function createSpace({ name }) {
  const res = await Space.query().insert({
    name,
  });

  return res;
}

export async function updateSpace({ id, name }) {
  const res = await Space.query()
    .findById(id)
    .patch({
      name,
    });
  return res;
}

export async function createChannel({ space_id, title, topic }) {
  const res = await Channel.query().insert({
    space_id,
    title,
    topic,
  });

  return res;
}
