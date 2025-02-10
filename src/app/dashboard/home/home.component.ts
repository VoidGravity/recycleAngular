
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { CollectionRequest } from '../../model/collection-request.model';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../store/collection.selectors';
import { CommonModule } from '@angular/common';
import { CollectionActions } from '../../store/collection.actions';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs/operators';
import { PointsActions } from '../../store/points.actions';
import { CollectionService } from '../../services/collection.service';
import { cloneDeep } from 'lodash'; // if using lodash

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  collection$: Observable<CollectionRequest[]>;
  // Remove any duplicate local property if you're using store observable:
  // But if you want a local copy for initial load:
  collectionRequests: CollectionRequest[] = [];
  
  role: string = '';
  currentUserId: string = '';
  
  editModalVisible: boolean = false;
  collectionToEdit: CollectionRequest | null = null;
  updateStatusModalVisible: boolean = false;
  collectionToUpdate: CollectionRequest | null = null;
  convertedAmount: number = 0;
  userAddress: string = ''; 

  points$: BehaviorSubject<number>;
  selectedVoucher: string = '';

  constructor(private store: Store, private collectionService: CollectionService, private auth: AuthService) {
    this.collection$ = store.select(selectAllCollections);
    this.points$ = new BehaviorSubject<number>(0);
  }

  // ngOnInit(): void {
  //   const userString = localStorage.getItem('current_user');
  //   if (userString) {
  //     const user = JSON.parse(userString);
  //     this.role = user.role;
  //     this.currentUserId = user.id;
  //   }

  //   // Load collections from localStorage
  //   const storedCollections: CollectionRequest[] = JSON.parse(localStorage.getItem('collections') || '[]');
  //   if (storedCollections.length > 0) {
  //     // Dispatch action to load these into the store
  //     this.store.dispatch(CollectionActions.loadCollectionsFromStorage({ collections: storedCollections }));
  //   }

  //   // Also update points from localStorage using your service
  //   const storeData = this.collectionService.getStoreData();
  //   const userPoints = storeData.userPoints ? storeData.userPoints[this.currentUserId] : 0;
  //   this.points$.next(userPoints || 0);
  // }
  ngOnInit(): void {
    const userString = localStorage.getItem('current_user');
    if (userString) {
      const user = JSON.parse(userString);
      this.role = user.role;
      this.currentUserId = user.id;
      this.userAddress = user.address; // Assuming 'address' is stored in user data
    }
  
    // Select collections from the store and filter by user's address
    this.collection$ = this.store.select(selectAllCollections).pipe(
      map((collections: CollectionRequest[]) => collections.filter(c => c.collectionAddress === this.userAddress))
    );
  
    // Update points from localStorage
    const storeData = this.collectionService.getStoreData();
    const userPoints = storeData.userPoints ? storeData.userPoints[this.currentUserId] : 0;
    this.points$.next(userPoints || 0);
  }
  

  editCollection(collection: CollectionRequest): void {
    if (this.role === 'collector' && collection.status !== 'en attente') {
      alert('Collectors can only edit pending requests.');
      return;
    }
    // Deep clone the collection so nested objects are mutable
    this.collectionToEdit = cloneDeep(collection); // or use JSON.parse(JSON.stringify(collection))
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
    // Deep clone to allow changes in the nested objects
    this.collectionToUpdate = cloneDeep(collection);
    this.updateStatusModalVisible = true;
  }

  closeStatusModal(): void {
    this.updateStatusModalVisible = false;
    this.collectionToUpdate = null;
  }

  submitStatusUpdate(): void {
    if (this.collectionToUpdate) {
      if (this.collectionToUpdate.status === 'validee') {
        this.collectionService.addPointsAfterValidation(this.collectionToUpdate);
        const updatedPoints = this.collectionService.getStoreData().userPoints[this.currentUserId] || 0;
        this.points$.next(updatedPoints);
      }
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
    this.auth.logout();
    console.log('logout');
  }

  convertPoints(): void {
    if (!this.selectedVoucher) {
      alert('Please select a voucher value');
      return;
    }
  
    const pointsToDeduct = parseInt(this.selectedVoucher, 10);
    const currentPoints = this.points$.value;
    const voucherValue = this.getVoucherValue(pointsToDeduct);

    if (currentPoints >= pointsToDeduct && voucherValue > 0) {
      // Deduct points manually
      const newPoints = currentPoints - pointsToDeduct;
      this.points$.next(newPoints);

      // Update localStorage for persistence
      let storeData = this.collectionService.getStoreData();
      if (!storeData.userPoints) storeData.userPoints = {};
      storeData.userPoints[this.currentUserId] = newPoints;
      localStorage.setItem('storeData', JSON.stringify(storeData));

      // Accumulate converted amount instead of replacing
      this.convertedAmount += voucherValue;

      alert(`Successfully converted ${pointsToDeduct} points to a ${voucherValue} Dh voucher!`);
    } else {
      alert('Insufficient points for this conversion or invalid voucher.');
    }
  }

  private getVoucherValue(points: number): number {
    switch (points) {
      case 100: return 50;
      case 200: return 120;
      case 500: return 350;
      default: return 0; // Prevent invalid conversions
    }
  }
}
