export interface Category {
  id: string;
  title: string;
}

export interface ProductMutation {
  title: string;
  type: string;
  description: string;
  picture: string;
  price: number;
}

export interface Product extends ProductMutation {
  id: string;
}

export interface ApiProductsList {
  [id: string]: ProductMutation;
}
