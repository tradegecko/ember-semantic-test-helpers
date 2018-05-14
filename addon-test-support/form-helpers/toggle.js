import baseFiller from './utils/base-filler';

export default async function toggle(label) {
  return await baseFiller(label, null, 'toggle');
}
