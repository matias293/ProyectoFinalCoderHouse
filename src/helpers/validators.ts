import Joi from 'joi';

export const schemaAuth = Joi.object({
  nombre: Joi.string().min(5).required(),
  telefono: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  calle: Joi.string().required(),
  altura: Joi.string().required(),
  cp: Joi.string().required(),
  piso: Joi.string(),
  departamento: Joi.string(),
  admin: Joi.boolean(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

export const schemaAddProduct = Joi.object({
  nombre: Joi.string().trim().required(),
  descripcion: Joi.string().min(2).required(),
  categoria: Joi.string().min(2).required(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
});

export const schemaUpdateProduct = Joi.object({
  nombre: Joi.string().trim(),
  precio: Joi.number(),
  descripcion: Joi.string().min(2),
  categoria: Joi.string().min(2),
  stock: Joi.number(),
});

export const schemaLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().required(),
});
