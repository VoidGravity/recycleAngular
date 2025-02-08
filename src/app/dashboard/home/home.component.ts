import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';
import { CommonModule } from '@angular/common';
import { CollectionActions } from '../../store/collection.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
  

})

export class HomeComponent implements OnInit {
  collection$: Observable<CollectionRequest[]>;

  role: string = '';

  editModalVisible: boolean = false;
  collectionToEdit: CollectionRequest | null = null;
  
  updateStatusModalVisible: boolean = false;
  collectionToUpdate: CollectionRequest | null = null;





  constructor(private store: Store) {
    this.collection$ = store.select(selectAllCollections);
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.role = user.role;
    }
  }
  editCollection(collection: CollectionRequest): void {
    this.collectionToEdit = { ...collection };
    this.editModalVisible = true;
  }
  closeEditModal(): void {
    this.editModalVisible = false;
    this.collectionToEdit = null;
  }

  submitEdit(): void {
    if (this.collectionToEdit) {
      this.store.dispatch(CollectionActions.updateCollection({ collection: this.collectionToEdit }));
      this.closeEditModal();
    }
  }

  updateStatus(collection: CollectionRequest): void {
    this.collectionToUpdate = { ...collection };
    this.updateStatusModalVisible = true;
  }

  closeStatusModal(): void {
    this.updateStatusModalVisible = false;
    this.collectionToUpdate = null;
  }
  submitStatusUpdate(): void {
    if (this.collectionToUpdate) {
      this.store.dispatch(CollectionActions.updateCollectionStatus({ collection: this.collectionToUpdate }));
      this.closeStatusModal();
    }
  }
  removeCollection(collectionId: string): void {
    if (confirm("Are you sure you want to remove this collection?")) {
      this.store.dispatch(CollectionActions.removeCollection({ collectionid: collectionId }));
    }
  }


}
