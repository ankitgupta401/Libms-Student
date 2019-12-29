import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { All } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
providers: [ All]

})
export class AppComponent implements OnInit , OnDestroy {
  title = 'Libms';
  isLoading: false;

  onOpen = 1;
  open = false;
  toggle(): void {
    if (this.onOpen === 0) {
       this.onOpen = 1;
       this.open = false;
    } else {
      this.onOpen = 0;
      this.open = true;
    }

  }

constructor() {}
ngOnInit() {

}

ngOnDestroy() {

}
}


