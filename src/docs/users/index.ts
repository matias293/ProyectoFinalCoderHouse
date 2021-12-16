import signup from './signup';
import login from './login';
export default {
  'api/user/login': {
    ...login,
  },
  'api/user/signup': {
    ...signup,
  },
};
