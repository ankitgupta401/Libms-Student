import { NgModule } from '@angular/core';
import { LayDashboardComponent } from './dashboard/lay-dashboard/lay-dashboard.component';

import { LayBooklistComponent } from './book-list/lay-booklist/lay-booklist.component';
import { Routes , RouterModule } from '@angular/router';

import { NewCardLayComponent } from './new-lib-card/new-card-lay/new-card-lay.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AboutComponent } from './about/about.component';





const appRoutes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: LayDashboardComponent  },

  { path: 'book-list', component: LayBooklistComponent  },

  { path: 'new-lib-card', component: NewCardLayComponent  },
  { path: 'about' , component: AboutComponent},
 { path: 'page-not-found', component: PageNotFoundComponent  },
 { path: '**', redirectTo: '/page-not-found' },
];
@NgModule({
imports: [
  RouterModule.forRoot(appRoutes , {useHash: true})],
exports: [RouterModule]
  })
  export class AppRoutingModule {

  }
