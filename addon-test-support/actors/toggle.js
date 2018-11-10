import baseFiller from './utils/base-filler';

export default async function(label) {
  return await baseFiller(label, null, 'toggle');
}
