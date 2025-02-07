import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
  

})
export class HomeComponent {
  

}
