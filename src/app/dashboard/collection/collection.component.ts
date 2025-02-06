import { CommonModule } from '@angular/common';
import { encapsulateStyle } from '@angular/compiler';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
  encapsulation : ViewEncapsulation.None
})
export class CollectionComponent {
  today: string = new Date().toISOString().split('T')[0];
  wasteItems: any[] = [{}];
  addWasteItem(): void {
    this.wasteItems.push({});
  }
  removeWasteItem(index: number): void {
    this.wasteItems.splice(index, 1);
  }
  

}
