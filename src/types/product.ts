export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

export interface ICreateProductDto {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}
export interface ICartItem {
  product: IProduct;
  quantity: number;
}