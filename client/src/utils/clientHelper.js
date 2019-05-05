import restClient from './restClient';

export function createUser({ email, userName, spaceId }) {
  return restClient
    .post('createUser', { email, userName, spaceId })
    .then(res => console.log(res))
    .catch(err => console.log('err', err));
}

export function getSpace({ name }) {
  return restClient
    .post('getSpace', { name })
    .then(res => console.log(res))
    .catch(err => console.log('err', err));
}
