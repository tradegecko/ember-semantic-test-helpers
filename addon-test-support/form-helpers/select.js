import baseFiller from './utils/base-filler';

export default async function fillIn(label, value) {
  await baseFiller(label, value, 'select');
}
