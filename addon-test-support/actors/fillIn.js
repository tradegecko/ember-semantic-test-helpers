import baseFiller from './utils/base-filler';

export default async function(label, value) {
  return await baseFiller(label, value, 'text');
}
