export interface newProductI {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  fotos: Imagen[];
  stock: number;
}
export interface Imagen {
  idImage: string;
}

export interface newProductU {
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  precio?: number;
  fotos?: Imagen[];
  stock?: number;
}

export interface ProductI {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  fotos: Imagen[];
  stock: number;
}
export interface OptionsQuery {
  categoria?: string;
  minStock?: number;
}
export interface ProductQuery {
  categoria?: string;
  stock?: number;
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductI[] | ProductI>;
  add(data: newProductI): Promise<ProductI>;
  update(id: string, newProductData: newProductI): Promise<ProductI>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductI[]>;
}

export interface Error {
  statusCode?: number;
  message?: string;
}

export interface ProductoC {
  productId: string;
  quantity: number;
}
