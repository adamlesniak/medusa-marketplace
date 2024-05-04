import { Lifetime } from "awilix";
import {
  CartService as MedusaCartService,
  Cart,
  FindConfig,
} from "@medusajs/medusa";
import { User } from "@medusajs/medusa";
import {
  CartCreateProps as MedusaCreateCartProps,
  FilterableCartProps as MedusaFilterableCartProps,
} from "@medusajs/medusa/dist/types/cart";

type FilterableCartProps = {
  store_id?: string;
} & MedusaFilterableCartProps;

type CartCreateProps = {
  store_id?: string;
} & MedusaCreateCartProps;

type TotalsConfig = {
  force_taxes?: boolean;
};

class CartService extends MedusaCartService {
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
    selector: FilterableCartProps,
    config?: FindConfig<Cart>
  ): Promise<Cart[]> {
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id;
    }

    config.select?.push("store_id");

    config.relations?.push("store");

    return await super.list(selector, config);
  }

  async retrieve(
    cartId: string,
    options: FindConfig<Cart>,
    totalsConfig: TotalsConfig = {}
  ): Promise<Cart> {
    options.relations = [...(options.relations || []), "store"];

    const cart = await super.retrieve(cartId, options, totalsConfig);

    if (
      cart.store?.id &&
      this.loggedInUser_?.store_id &&
      cart.store.id !== this.loggedInUser_.store_id
    ) {
      // Throw error if you don't want a cart to be accessible to other stores
      throw new Error("Cart does not exist in store.");
    }

    return cart;
  }

  async create(data: CartCreateProps): Promise<Cart> {
    if (!data.store_id && this.loggedInUser_?.store_id) {
      data.store_id = this.loggedInUser_.store_id;
    }

    return await super.create(data);
  }
}

export default CartService;
