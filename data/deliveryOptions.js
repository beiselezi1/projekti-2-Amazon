import { formatCurrency } from "../scripts/utils/money.js";

export function getDeliveryOption(deliveryOptionId) {
  const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
  return deliveryOption || deliveryOptions[0];
}

class DeliveryOption {
  id;
  deliveryDays;
  priceCents;

  constructor(deliveryOptionDetails) {
    this.id = deliveryOptionDetails.id;
    this.deliveryDays = deliveryOptionDetails.deliveryDays;
    this.priceCents = deliveryOptionDetails.priceCents;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499,
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999,
}].map(deliveryOptionDetails => {
  return new DeliveryOption(deliveryOptionDetails);
});