import { Entity, OneToMany } from "typeorm";
import { Store as MedusaStore } from "@medusajs/medusa";
import { Product } from "./product";
import { Cart } from "./cart";
import { Discount } from "./discount";
import { Order } from "./order";
import { GiftCard } from "./gift-card";

@Entity()
export class Store extends MedusaStore {
  @OneToMany(() => Cart, (cart) => cart?.store)
  carts?: Cart[];

  @OneToMany(() => Discount, (discount) => discount?.store)
  discounts?: Discount[];

  @OneToMany(() => GiftCard, (gift_card) => gift_card?.store)
  gift_cards?: GiftCard[];

  @OneToMany(() => Order, (order) => order?.store)
  orders?: Order[];

  @OneToMany(() => Product, (product) => product?.store)
  products?: Product[];
}
