import { Cart } from "../models/cart";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CartRepository as MedusaCartRepository } from "@medusajs/medusa/dist/repositories/cart";

export const CartRepository = dataSource
  .getRepository(Cart)
  .extend(MedusaCartRepository);

export default CartRepository;
