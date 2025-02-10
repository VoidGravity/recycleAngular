import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private pointsPerKg: any = {
    'plastique': 2,
    'verre': 1,
    'papier': 1,
    'metal': 5
  };

  constructor() {}
  public getCollectionRequests(): any[] {
    const storedData = localStorage.getItem('storeData');
    const storeData = storedData ? JSON.parse(storedData) : {};
    return storeData.collectionRequests || []; // Return collectionRequests if found
  }
  public  getStoreData(): any {
    const storedData = localStorage.getItem('storeData');
    return storedData ? JSON.parse(storedData) : { collectionRequests: [], userPoints: {} };
  }


  // Save the state to localStorage
  public saveStoreData(data: any): void {
    localStorage.setItem('storeData', JSON.stringify(data));
  }

  // Calculate points based on the collection
  public calculatePoints(collection: any): number {
    let totalPoints = 0;
    collection.wasteItems.forEach((item: any) => {
      const pointsForItem = this.pointsPerKg[item.type] || 0;
      totalPoints += pointsForItem * item.weight;
    });
    return totalPoints;
  }

  // In CollectionService
  public addPointsAfterValidation(collection: any): void {
    const storeData = this.getStoreData();
    const pointsToAdd = this.calculatePoints(collection);

    // Initialize userPoints if it doesn't exist
    if (!storeData.userPoints) {
      storeData.userPoints = {};
    }

    // Add points to user's existing points or initialize with new points
    if (storeData.userPoints[collection.userId]) {
      storeData.userPoints[collection.userId] += pointsToAdd;
    } else {
      storeData.userPoints[collection.userId] = pointsToAdd;
    }

    // Save the updated state back to localStorage
    this.saveStoreData(storeData);
  }

  // Convert points to a voucher
  public convertPointsToVoucher(userId: string): void {
    const storeData = this.getStoreData();
    // Access the points directly since userPoints is an object mapping user IDs to points.
    const points = storeData.userPoints[userId] || 0;
    let voucherValue = 0;
  
    if (points >= 500) {
      voucherValue = 350;
    } else if (points >= 200) {
      voucherValue = 120;
    } else if (points >= 100) {
      voucherValue = 50;
    }
  
    if (voucherValue > 0) {
      console.log(`You have converted ${points} points into a voucher worth ${voucherValue} Dh.`);
      // Deduct points based on the conversion scheme:
      if (points >= 500) {
        storeData.userPoints[userId] -= 500;
      } else if (points >= 200) {
        storeData.userPoints[userId] -= 200;
      } else if (points >= 100) {
        storeData.userPoints[userId] -= 100;
      }
      this.saveStoreData(storeData);
    } else {
      console.log('Not enough points to convert into a voucher.');
    }
  }
  

}
