import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';
import { CommonModule } from '@angular/common';
import { CollectionActions } from '../../store/collection.actions';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService)




  constructor(private store: Store) {
    this.collection$ = store.select(selectAllCollections);
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('current_user');
    if (userString) {
      const user = JSON.parse(userString);
      this.role = user.role;
    }
  }
  // editCollection(collection: CollectionRequest): void {
  //   this.collectionToEdit = { ...collection };
  //   this.editModalVisible = true;
  // }
  editCollection(collection: CollectionRequest): void {
    if (this.role === 'collector' && collection.status !== 'en attente') {
      alert('Collectors can only edit pending requests.');
      return;
    }
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
    if (this.role !== 'collector') {
      alert('Only collectors can update the status.');
      return;
    }
    if (collection.status === 'validee') {
      alert('This request is validated and cannot be updated.');
      return;
    }
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
  // removeCollection(collectionId: string): void {
  //   if (confirm("Are you sure you want to remove this collection?")) {
  //     this.store.dispatch(CollectionActions.removeCollection({ collectionid: collectionId }));
  //   }
  // }
  removeCollection(collectionId: string, collectionStatus: string): void {
    if (this.role === 'collector' && collectionStatus !== 'en attente') {
      alert('Collectors can only remove pending requests.');
      return;
    }
    if (confirm('Are you sure you want to remove this collection?')) {
      this.store.dispatch(CollectionActions.removeCollection({ collectionid: collectionId }));
    }
  }
  logout(): void {
    this.authService.logout();
    console.log('logout');
  }

}
