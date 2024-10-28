interface IUsersInterface {
  content: IUser[];
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

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  role: string;
  avatar: string;
  isVerified: boolean;
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
