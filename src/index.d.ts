export declare module "@medusajs/medusa/dist/models/store" {
  declare interface Store {
    carts?: Cart[];
    discounts?: Discount[];
    giftCards?: GiftCard[];
    orders?: Order[];
    products?: Product[];
  }
}

export declare module "@medusajs/medusa/dist/models/user" {
  declare interface User {
    store_id?: string;
    store?: Store;
  }
}

export declare module "@medusajs/medusa/dist/models/product" {
  declare interface Product {
    store_id?: string;
    store?: Store;
  }
}

export declare module "@medusajs/medusa/dist/models/order" {
  declare interface Order {
    store_id?: string;
    store?: Store;
  }
}

export declare module "@medusajs/medusa/dist/models/cart" {
  declare interface Cart {
    store_id?: string;
    store?: Store;
  }
}

export declare module "@medusajs/medusa/dist/models/discount" {
  declare interface Discount {
    store_id?: string;
    store?: Store;
  }
}

export declare module "@medusajs/medusa/dist/models/gift-card" {
  declare interface GiftCard {
    store_id?: string;
    store?: Store;
  }
}

