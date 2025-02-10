import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';
import { CommonModule } from '@angular/common';
import { CollectionActions } from '../../store/collection.actions';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';
import { PointsActions } from '../../store/points.actions';
import { CollectionService } from '../../services/collection.service'; // Import CollectionService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  collection$: Observable<CollectionRequest[]>; // For state management (ngrx)
  collectionRequests: CollectionRequest[] = [];  // To hold data from localStorage (initial data)
  role: string = '';
  editModalVisible: boolean = false;
  collectionToEdit: CollectionRequest | null = null;
  updateStatusModalVisible: boolean = false;
  collectionToUpdate: CollectionRequest | null = null;
  authService = inject(AuthService);
  currentUserId: string = '';
  
  points$: BehaviorSubject<number>; 
  selectedVoucher: string = '';

  private pointSystem: { [key: string]: number } = {
    'Plastique': 2,
    'Verre': 1,
    'Papier': 1,
    'Métal': 5
  };

  constructor(private store: Store, private collectionService: CollectionService) {
    this.collection$ = store.select(selectAllCollections); // Data from ngRx store
    this.points$ = new BehaviorSubject<number>(0); 
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('current_user');
    if (userString) {
      const user = JSON.parse(userString);
      this.role = user.role;
      this.currentUserId = user.id; // Set current user ID
    }

    // Fetch collection data from localStorage only when the component initializes
    const storeData = JSON.parse(localStorage.getItem('storeData') || '{}');
    
    // Load data from localStorage if available
    if (storeData && storeData.collectionRequests) {
      this.collectionRequests = storeData.collectionRequests; // Load collection data from localStorage
    }

    // Check if points for the current user exist in localStorage
    const userPoints = storeData.userPoints ? storeData.userPoints[this.currentUserId] : 0;
    this.points$.next(userPoints || 0); // Update points observable with data from localStorage

    // Optionally, dispatch an action to load the data into the store (if you need to update the state)
    if (this.collectionRequests.length > 0) {
      this.store.dispatch(CollectionActions.loadCollectionsFromStorage({ collections: this.collectionRequests }));

    }
  }

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

  convertPoints(): void {
    if (!this.selectedVoucher) {
      alert('Please select a voucher value');
      return;
    }

    const points = parseInt(this.selectedVoucher, 10);
    const voucherValue = this.getVoucherValue(points);

    this.points$.pipe(take(1)).subscribe(currentPoints => {
      if (currentPoints >= points) {
        this.store.dispatch(PointsActions.convertPoints({
          userId: this.currentUserId,
          points: points,
          voucherValue: voucherValue
        }));
        alert(`Successfully converted ${points} points to a ${voucherValue} Dh voucher!`);
      } else {
        alert('Insufficient points for this conversion');
      }
    });
  }

  private getVoucherValue(points: number): number {
    switch (points) {
      case 100: return 50;
      case 200: return 120;
      case 500: return 350;
      default: return 0;
    }
  }
}
