interface IOrdersInterface {
  content: IOrder[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

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

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
