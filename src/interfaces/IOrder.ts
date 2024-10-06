interface IOrder {
  id: string;
  orderDate: string;
  ordersState: string;
  user: IUser;
  payment: Payment;
  shipment: Shipment;
  orderDetailList: OrderDetailListItem[];
}

interface Payment {
  id: string;
  description: string;
  total: number;
  paymentDate: string;
  payerId: string;
  paymentId: string;
  status: string;
}
interface Shipment {
  id: string;
  address: string;
  number: number;
  city: string;
  zipCode: string;
}
interface OrderDetailListItem {
  id: string;
  quantity: number;
  product: IProduct;
}
