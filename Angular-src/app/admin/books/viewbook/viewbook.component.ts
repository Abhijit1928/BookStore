import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/book';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {

  @Input()
  book !: Book;
  @Output()
  bookDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }
  
    ngOnInit() {
    }
  
    deleteBook() {
      this.httpClientService.deleteBook(this.book.id).subscribe(
        (book) => {
          this.bookDeletedEvent.emit();
          this.router.navigate(['admin', 'books']);
        }
      );
    }
    editBook() {
      this.router.navigate(['admin', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
    }
}
