interface IReview {
  id: string;
  rating: number;
  comment: string;
  publishDate: string;
  updatedAt: string;
  user: IUser;
  product: IProduct;
}
