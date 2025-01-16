interface IProductsInterface {
  content: IProduct[];
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

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  createdAt: string;
  lastUpdate: string;
  imgUrl: string;
  discountStatus: boolean;
  category: ICategory;
  discountList: DiscountListItem[];
  reviewList: IReview[];
}

interface DiscountListItem {
  id: string;
  description: string;
  percentage: number;
  startDate: string;
  endDate: string;
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
