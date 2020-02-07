import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';

import { PageEvent, throwToolbarMixedModesError, TransitionCheckState } from '@angular/material';




@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: any[] = [];
  bookdel: string;
  isLoading = false;
  number = 0;
  totalPosts = 0;
  postsPerPage = 10;
  available: number[];
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
  private booksub: Subscription;
  constructor(private app: All) {
   }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findallbookAcc(form.value.accession_no);
  } else {
    if ( form.value.title ) {
      this.app.findbookTitle(this.postsPerPage , this.currentPage, form.value.title);
    } else {
      this.app.findbookAuthor(this.postsPerPage , this.currentPage, form.value.author);
    }

  }
}
  ngOnInit() {

    this.app.getBooks(this.postsPerPage, this.currentPage);
    this.isLoading = true;
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {

      this.books = bookData.BOOKS;
      this.totalPosts = bookData.count;
      this.isLoading = false;

      if ( this.totalPosts > 0) {
        this.getAvailable();
      }

    });
  }

  ngOnDestroy() {
    this.booksub.unsubscribe();
  }

  onClear(form: NgForm) {
  form.reset();
  this.isLoading = true;
  this.app.getBooks(this.postsPerPage, this.currentPage);

  }




onChange(PageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  this.app.getBooks(this.postsPerPage , this.currentPage);
  if (this.currentPage > 1 ) {
this.number = this.postsPerPage * PageData.pageIndex;
  } else {
    this.number = 0;
  }
  }

getAvailable() {

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.books.length; i++) {

    this.app.getAvailable(this.books[i].isbn).subscribe(result => {
      this.books[i].available = result.count[0].count;

      });
    this.isLoading = false;
  }

}

}
