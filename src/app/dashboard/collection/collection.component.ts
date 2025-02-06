import { encapsulateStyle } from '@angular/compiler';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
  encapsulation : ViewEncapsulation.None
})
export class CollectionComponent {

}
