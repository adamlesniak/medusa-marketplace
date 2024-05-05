import { Order } from "../models/order";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { OrderRepository as MedusaOrderRepository } from "@medusajs/medusa/dist/repositories/order";

export const OrderRepository = dataSource
  .getRepository(Order)
  .extend(MedusaOrderRepository);

export default OrderRepository;
