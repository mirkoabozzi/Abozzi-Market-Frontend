interface IOrderAdd {
  user: string;
  payment: string;
  shipment: string;
  orderDetails: OrderDetailsItem[];
}
interface OrderDetailsItem {
  product: string;
  quantity: number;
}