import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import {
  Cart as MedusaCart,
} from "@medusajs/medusa"
import { Store } from "./store";

@Entity()
export class Cart extends MedusaCart {
  @Index("CartStoreId")
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store;
}