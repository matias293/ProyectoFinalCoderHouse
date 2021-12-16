import getImage from './getImage';
import postImage from './postImage';
import deleteImages from './deleteImages';

export default {
  'api/image/upload': {
    ...getImage,
  },
  'api/image/{id}': {
    ...postImage,
    ...deleteImages,
  },
};
