export interface BookDetailsDTO {
  code: number;
  title: string;
  authorId: number;
  authorName: string;
  year: number;
  price: number;
  pages: number;
  language: string;
  bookCover: string;
  image: string;
  quantity: number;
  description: string;
  categories: string[];
}