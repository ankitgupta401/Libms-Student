import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit , OnDestroy {
Admin = 'S.G.P Admin';

  constructor() { }
private isAuthSub: Subscription;
  ngOnInit() {

  }

onLogout() {

}

ngOnDestroy() {
this.isAuthSub.unsubscribe();
}

}
