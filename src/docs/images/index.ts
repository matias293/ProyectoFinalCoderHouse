import getImage from './getImage';
import postImage from './postImage';
import deleteImages from './deleteImages';

export default {
  'api/image/upload': {
    ...postImage,
  },
  'api/image/{id}': {
    ...getImage,
    ...deleteImages,
  },
};
