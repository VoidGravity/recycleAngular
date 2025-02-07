import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CollectionComponent {
  newCollection: CollectionRequest = {
    id: '',
    wasteItems: [{ type: '', weight: 0 }],
    totalWeight: 0,
    collectionAddress: '',
    collectionDate: new Date().toISOString().split('T')[0],
    collectionTime: '',
    additionalNotes: '',
    status: 'en attente'
  };

  today: string = new Date().toISOString().split('T')[0];
  collection$: Observable<CollectionRequest[]>;

  constructor(private store: Store) {
    this.collection$ = store.select(selectAllCollections);
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addWasteItem(): void {
    this.newCollection.wasteItems.push({ type: '', weight: 0 });
    this.updateTotalWeight();
  }

  removeWasteItem(index: number): void {
    if (this.newCollection.wasteItems.length > 1) {
      this.newCollection.wasteItems.splice(index, 1);
      this.updateTotalWeight();
    }
  }

  updateTotalWeight(): void {
    this.newCollection.totalWeight = this.newCollection.wasteItems.reduce(
      (total, item) => total + (item.weight || 0),
      0
    );
  }

  createCollection(): void {
    this.newCollection.id = this.generateId();
    console.log(this.newCollection);
    // this.store.dispatch(CollectionActions.createCollection({collection: this.newCollection}));
  }
}