import baseFiller from './utils/base-filler';

export default async function(label, value) {
  await baseFiller(label, value, 'select');
}
