import { Lifetime } from "awilix";
import {
  DiscountService as MedusaDiscountService,
  Discount,
  User,
  FindConfig,
} from "@medusajs/medusa";
import { FilterableDiscountProps as MedusaFilterableDiscountProps, CreateDiscountInput as MedusaCreateDiscountInput } from "@medusajs/medusa/dist/types/discount";

type FilterableDiscountProps = {
  store_id?: string;
} & MedusaFilterableDiscountProps;

type CreateDiscountInput = {
  store_id?: string;
} & MedusaCreateDiscountInput;

class DiscountService extends MedusaDiscountService {
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
    selector: FilterableDiscountProps = {},
    config: FindConfig<Discount> = { relations: [], skip: 0, take: 10 }
  ): Promise<Discount[]> {
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id;
    }

    config.select?.push("store_id");

    config.relations?.push("store");

    return await super.list(selector, config);
  }

  async listAndCount(
    selector: FilterableDiscountProps = {},
    config: FindConfig<Discount> = {
      take: 20,
      skip: 0,
      order: { created_at: "DESC" },
    }
  ): Promise<[Discount[], number]> {
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id;
    }

    config.select?.push("store_id");

    config.relations?.push("store");

    return await super.listAndCount(selector, config);
  }

  async retrieve(
    discountId: string,
    config: FindConfig<Discount> = {}
  ): Promise<Discount> {
    config.relations = [...(config.relations || []), "store"];

    const discount = await super.retrieve(discountId, config);

    if (
      discount.store?.id &&
      this.loggedInUser_?.store_id &&
      discount.store.id !== this.loggedInUser_.store_id
    ) {
      // Throw error if you don't want a discount to be accessible to other stores
      throw new Error("Discount does not exist in store.");
    }

    return discount;
  }

  async create(discount: CreateDiscountInput): Promise<Discount> {
    if (!discount.store_id && this.loggedInUser_?.store_id) {
      discount.store_id = this.loggedInUser_.store_id;
    }

    return await super.create(discount);
  }
}

export default DiscountService;
