import components from './components';
import tags from './tags';
import products from './productos/index';
import users from './users';
import orders from './orders/index';
import carts from './carts/index';
import images from './images/index';
import chat from './chat/index';

export default {
  // definition: {
  openapi: '3.0.3',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    description: `An ecommerce that simulate a simple shop builded with Express and MongoDB`,
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'matias',
      email: 'matiasmarin45@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080/',
      description: 'Development server',
    },
  ],
  ...tags,
  ...components,
  paths: {
    ...products,
    ...users,
    ...orders,
    ...carts,
    ...images,
    ...chat,
  },
};
// };
