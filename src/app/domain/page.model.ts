export class Page<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;

  constructor(data?: Partial<Page<T>>) {
    this.content = data?.content || [];
    this.totalElements = data?.totalElements;
    this.totalPages = data?.totalPages;
    this.size = data?.size;
    this.number = data?.number;
  }
}
