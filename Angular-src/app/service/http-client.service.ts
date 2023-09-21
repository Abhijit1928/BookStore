import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Book } from '../book';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private h1: HttpClient) { }

  getUsers()
  {
    return this.h1.get<User[]>('http://localhost:9001/users/get');
  }
  addUser(newUser: User) {
    return this.h1.post<User>('http://localhost:9001/users/add', newUser);   
  }
  deleteUser(id : any) {
    return this.h1.delete<User>('http://localhost:9001/users/' + id);
  }

  getBooks() {
    return this.h1.get<Book[]>('http://localhost:9001/books/get');
  }
  addBook(newBook: Book) {
    return this.h1.post<Book>('http://localhost:9001/books/add', newBook);
  }

  deleteBook(id: any) {
    return this.h1.delete<Book>('http://localhost:9001/books/' + id);
  }
  
  updateBook(updatedBook: Book) {
    return this.h1.put<Book>('http://localhost:9001/books/update', updatedBook);
  }
}
