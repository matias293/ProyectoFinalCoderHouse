export interface NewUserI {
  nombre: string;
  telefono: string;
  email: string;
  password: string;
  admin: boolean;
  direccion: Direccion;
}

export interface Direccion {
  calle: string;
  altura: string;
  cp: string;
  piso?: number;
  departamento?: string;
}

export interface UserI {
  _id: string;
  nombre: string;
  telefono: string;
  email: string;
  password: string;
  admin: boolean;
  direccion: Direccion;
}

export interface UserQuery {
  username?: string;
  email?: string;
}

export interface UserBaseClass {
  get(id: string): Promise<UserI>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}

export interface Error {
  statusCode?: number;
  message?: string;
}
