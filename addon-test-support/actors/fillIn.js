import baseFiller from './utils/base-filler';

export default async function fillIn(label, value) {
  return await baseFiller(label, value, 'text');
}
