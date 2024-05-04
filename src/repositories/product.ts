import { Product } from "../models/product"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import {
  ProductRepository as MedusaProductRepository,
} from "@medusajs/medusa/dist/repositories/product"

export const ProductRepository = dataSource
  .getRepository(Product)
  .extend(MedusaProductRepository)

export default ProductRepository