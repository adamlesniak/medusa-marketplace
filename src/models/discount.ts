import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import {
  Discount as MedusaDiscount,
} from "@medusajs/medusa"
import { Store } from "./store";

@Entity()
export class Discount extends MedusaDiscount {
  @Index("DiscountStoreId")
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store;
}