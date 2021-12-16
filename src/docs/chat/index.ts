import getMensajes from './getMensajes';
export default {
  'chat/{email}': {
    ...getMensajes,
  },
};
