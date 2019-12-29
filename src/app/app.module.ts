import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule ,
   MatPaginatorModule,
  MatInputModule,
  MatCardModule,
   MatButtonModule,
    MatToolbarModule,
     MatExpansionModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { NgxBarcodeModule } from 'ngx-barcode';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayDashboardComponent } from './dashboard/lay-dashboard/lay-dashboard.component';
import { AboutComponent } from './about/about.component';
import { BookListComponent } from './book-list/book-list.component';
import { LayBooklistComponent } from './book-list/lay-booklist/lay-booklist.component';

import { NewLibCardComponent } from './new-lib-card/new-lib-card.component';
import { NewCardLayComponent } from './new-lib-card/new-card-lay/new-card-lay.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    DashboardComponent,
    LayDashboardComponent,
    BookListComponent,
    LayBooklistComponent,
    NewLibCardComponent,
    NewCardLayComponent,
    PageNotFoundComponent,
    AboutComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxBarcodeModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
