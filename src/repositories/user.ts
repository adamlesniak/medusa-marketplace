import { User } from "../models/user"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import {
  UserRepository as MedusaUserRepository,
} from "@medusajs/medusa/dist/repositories/user"

export const UserRepository = dataSource
  .getRepository(User)
  .extend(MedusaUserRepository)

export default UserRepository