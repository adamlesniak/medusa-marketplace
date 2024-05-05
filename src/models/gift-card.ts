import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import {
  GiftCard as MedusaGiftCard,
} from "@medusajs/medusa"
import { Store } from "./store";

@Entity()
export class GiftCard extends MedusaGiftCard {
  @Index("GiftCardStoreId")
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.giftCards)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store;
}