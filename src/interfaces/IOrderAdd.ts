interface IOrderAdd {
  user: string;
  payment: string;
  shipment: string | null;
  orderDetails: OrderDetailsItem[];
}

interface OrderDetailsItem {
  product: string;
  quantity: number;
  price: number;
}
