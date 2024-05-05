import { Lifetime } from "awilix";
import {
  GiftCardService as MedusaGiftCardService,
  GiftCard,
  User,
  FindConfig,
  QuerySelector,
} from "@medusajs/medusa";
import { CreateGiftCardInput as MedusaCreateGiftCardInput } from "@medusajs/medusa/dist/types/gift-card";

type CreateGiftCardInput = {
  store_id?: string;
} & MedusaCreateGiftCardInput;

class GiftCardService extends MedusaGiftCardService {
  static LIFE_TIME = Lifetime.SCOPED;
  protected readonly loggedInUser_: User | null;

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments);

    try {
      this.loggedInUser_ = container.loggedInUser;
    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  async list(
    selector: QuerySelector<GiftCard> & { store_id?: string } = {},
    config: FindConfig<GiftCard> = { relations: [], skip: 0, take: 10 }
  ): Promise<GiftCard[]> {
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id;
    }

    config.select?.push("store_id");

    config.relations?.push("store");

    return await super.list(selector, config);
  }

  async listAndCount(
    selector: QuerySelector<GiftCard> & { store_id?: string } = {},
    config: FindConfig<GiftCard> = {
      take: 20,
      skip: 0,
      order: { created_at: "DESC" },
    }
  ): Promise<[GiftCard[], number]> {
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id;
    }

    config.select?.push("store_id");

    config.relations?.push("store");

    return await super.listAndCount(selector, config);
  }

  async retrieve(
    giftCardId: string,
    config: FindConfig<GiftCard> = {}
  ): Promise<GiftCard> {
    config.relations = [...(config.relations || []), "store"];

    const giftCard = await super.retrieve(giftCardId, config);

    if (
      giftCard.store?.id &&
      this.loggedInUser_?.store_id &&
      giftCard.store.id !== this.loggedInUser_.store_id
    ) {
      // Throw error if you don't want a giftCard to be accessible to other stores
      throw new Error("GiftCard does not exist in store.");
    }

    return giftCard;
  }

  async create(giftCard: CreateGiftCardInput): Promise<GiftCard> {
    if (!giftCard.store_id && this.loggedInUser_?.store_id) {
      giftCard.store_id = this.loggedInUser_.store_id;
    }

    return await super.create(giftCard);
  }
}

export default GiftCardService;
