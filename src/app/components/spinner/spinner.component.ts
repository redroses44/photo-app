import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getIsLoading } from 'src/app/store/selectors/loading.selector';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  loading: boolean = true;

  constructor(private store: Store<AppState>) {
    this.store
      .select(getIsLoading)
      .subscribe((isLoading) => (this.loading = isLoading));
  }

  ngOnInit(): void {}
}
