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
}

interface DiscountListItem {
  id: string;
  description: string;
  percentage: number;
  startDate: string;
  endDate: string;
}
