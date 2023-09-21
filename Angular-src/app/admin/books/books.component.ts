import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  booksRecieved !: Array<Book>;
  books !: Array<Book>;
  action: any;
  selectedBook !: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  handleSuccessfulResponse(response : any) {
    this.books = response;
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {
    
      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      //populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte=book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.refreshData();
    this.books = new Array<Book>();

    const book1 = new Book();
    book1.id = 1;
    book1.name = 'book1';
    book1.author = 'author1';
    book1.price = 5;

    const book2 = new Book();
    book2.id = 2;
    book2.name = 'book2';
    book2.author = 'author2';
    book2.price = 15;

    this.books.push(book1);
    this.books.push(book2);

    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    );
  }
  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }
  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }

  
  
  refreshData() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
	// get the parameter id. this will be the id of the book whose details 
	// are to be displayed when action is view.
	const id = params['id'];
	// if id exists, convert it to integer and then retrive the book from
	// the books array
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }
}
