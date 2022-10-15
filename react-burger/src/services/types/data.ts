export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id: string;
  };
  
  
  
  export type TUser = {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
  }
  

  
  export type TOrder = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    status: 'created' | 'pending' | 'done';
    updatedAt: string;
    _id: string;
  };
  

  export type TOrdersStatus = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
    wsConnected: boolean;
  };
  
  export type TType = 'bun' | 'main' | 'sauce';

  export interface ILocationState {
    from: string;
  }