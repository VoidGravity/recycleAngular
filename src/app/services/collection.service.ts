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
  private getStoreData(): any {
    const storedData = localStorage.getItem('storeData');
    return storedData ? JSON.parse(storedData) : { collectionRequests: [], userPoints: {} };
  }


  // Save the state to localStorage
  private saveStoreData(data: any): void {
    localStorage.setItem('storeData', JSON.stringify(data));
  }

  // Calculate points based on the collection
  calculatePoints(collection: any): number {
    let totalPoints = 0;
    collection.wasteItems.forEach((item: any) => {
      const pointsForItem = this.pointsPerKg[item.type] || 0;
      totalPoints += pointsForItem * item.weight;
    });
    return totalPoints;
  }

  // Add points after collection validation
  addPointsAfterValidation(collection: any): void {
    const storeData = this.getStoreData();
    const userPoints = storeData.userPoints;

    const pointsToAdd = this.calculatePoints(collection);

    // Find the user and update points or add a new user if not found
    const user = userPoints.find((user: any) => user.userId === collection.userId);
    if (user) {
      user.points += pointsToAdd;
    } else {
      userPoints.push({ userId: collection.userId, points: pointsToAdd });
    }

    // Save the updated state back to localStorage
    this.saveStoreData(storeData);
  }

  // Convert points to a voucher
  convertPointsToVoucher(userId: string): void {
    const storeData = this.getStoreData();
    const user = storeData.userPoints.find((user: any) => user.userId === userId);

    if (!user) {
      console.log('User not found');
      return;
    }

    const points = user.points;
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
      user.points -= (points >= 500 ? 500 : points >= 200 ? 200 : 100);  // Deduct points after conversion
      this.saveStoreData(storeData);
    } else {
      console.log('Not enough points to convert into a voucher.');
    }
  }

}
