import { HttpClient } from '@angular/common/http';
import { Books } from './books.model';
import { Libcard } from './Libcard.model';
import { Subject } from 'rxjs';



export class All {
 book: Books[] = [];
  libCard: Libcard[] = [];
 toIssue: Books[] = [];
private usersUpdated = new Subject<{LibCard: Libcard[], count: number}>();
private booksUpdated = new Subject<{BOOKS: Books[], count: number}>();
private toIssuebooksUpdated = new Subject<Books[]>();


constructor(private http: HttpClient) {}
count: number;
bookcount: number;
findUserPhoneNo(phoneNo: any) {
  return this.http.get<{ message: string , user: Libcard[] }>('http://localhost:3000/api/users/get/' + phoneNo );

}

findUserEmails(email: string) {
  return this.http.get<{message: string , user: Libcard[], count: number}>('http://localhost:3000/api/users/Email/' + email);
}
findUserCard(cardNo: string) {
  return this.http.get<{message: string, user: Libcard[] }>('http://localhost:3000/api/users/Card/' + cardNo);
}
findallbookAcc( accessionNo: number) {
  this.http.get<{message: string , books: Books[]}>('http://localhost:3000/api/books/all/' + accessionNo)
  .subscribe((result) => {
    this.book = result.books;
    this.booksUpdated.next({BOOKS: [...this.book], count: result.books.length});
  });
  }
findbookTitle(pagesize: number , page: number , title: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&title=${title}`;
  this.http.get<{message: string , books: Books[], count: number}>('http://localhost:3000/api/books/getbytitle' + queryParams)
  .subscribe((result) => {
    this.book = result.books;
    this.booksUpdated.next({BOOKS: [...this.book], count: result.count});

  });
}
findbookAuthor(pagesize: number , page: number , author: string) {
  const queryParams = `?pagesize=${pagesize}&page=${page}&author=${author}`;
  this.http.get<{message: string , books: Books[], count: number}>('http://localhost:3000/api/books/getbyauthor' + queryParams)
  .subscribe((result) => {
    this.book = result.books;
    this.booksUpdated.next({BOOKS: [...this.book], count: result.count});

  });
}
getBooks(pagesize: number , page: number) {
  const queryParams = `?pagesize=${pagesize}&page=${page}`;
  this.http.get<{ message: string, books: Books[] , count: number}>('http://localhost:3000/api/books' + queryParams)
  .subscribe((postData) => {

    this.book = postData.books;
    this.bookcount = postData.count;
    this.booksUpdated.next({BOOKS: [...this.book], count: this.bookcount});

  });
}
getBooksUpdateListener() {
  return this.booksUpdated.asObservable();
}

addLibCard(LibCard: Libcard , image: File) {
  const UserData = new FormData();
  UserData.append('cardNo', LibCard.cardNo);
  UserData.append('fname', LibCard.fname);
  UserData.append('lname', LibCard.lname);
  UserData.append('email', LibCard.email);
  UserData.append('category', LibCard.category);
  UserData.append('Roll', LibCard.Roll.toString());
  UserData.append('dept', LibCard.dept);
  UserData.append('year', LibCard.year);
  UserData.append('sem', LibCard.sem);
  UserData.append('phone_no', LibCard.phone_no.toString());
  UserData.append('address', LibCard.address);
  UserData.append('city', LibCard.city);
  UserData.append('state', LibCard.state);
  UserData.append('zip', LibCard.zip.toString());
  UserData.append('image', image , LibCard.fname);
  this.http.post<{message: string}>('http://localhost:3000/api/users', UserData)
  .subscribe((responseData => {

    console.log(responseData.message);
    this.libCard.push(LibCard);
    this.usersUpdated.next({LibCard: [...this.libCard ], count: this.count });
  }));
}
getUsersUpdateListener() {
  return this.usersUpdated.asObservable();
}
getlastTeacher() {
  return this.http.get<{message: string , count: number}>('http://localhost:3000/api/users/getTeacher');
  }

}

