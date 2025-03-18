import { Author } from "./Author";
import { Category } from "./Category";

export class Book{

    code:number = 0;
    title:string = "";
    author: Author = new Author();
    year:number = 0;
    price:number = 0;
    pages:number = 0;
    language:string = "";
    bookCover:string = "";
    image: string | ArrayBuffer | null = null;
    quantity: number = 0;
    description: string = "";
    category: Category = new Category();

}