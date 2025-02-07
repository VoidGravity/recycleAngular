import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
  

})

export class HomeComponent {
  collection$: Observable<CollectionRequest[]>;

  constructor(private store: Store) {
    this.collection$ = store.select(selectAllCollections);
  }


}
