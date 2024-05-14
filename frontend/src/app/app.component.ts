import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './states/app.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  language$:Observable<string>

  constructor(private store: Store<AppState>, private translate: TranslateService){
    this.language$ = this.store.select(state => state.language);
  }

  ngOnInit(): void {
    this.language$.subscribe(language => {
      this.translate.setDefaultLang("en");
      this.translate.use(language);
    });
  }

}
