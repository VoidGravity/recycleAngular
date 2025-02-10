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
    return storeData.collectionRequests || []; 
  }
  public  getStoreData(): any {
    const storedData = localStorage.getItem('storeData');
    return storedData ? JSON.parse(storedData) : { collectionRequests: [], userPoints: {} };
  }


  public saveStoreData(data: any): void {
    localStorage.setItem('storeData', JSON.stringify(data));
  }

  public calculatePoints(collection: any): number {
    let totalPoints = 0;
    collection.wasteItems.forEach((item: any) => {
      const pointsForItem = this.pointsPerKg[item.type] || 0;
      totalPoints += pointsForItem * item.weight;
    });
    return totalPoints;
  }

  public addPointsAfterValidation(collection: any): void {
    const storeData = this.getStoreData();
    const pointsToAdd = this.calculatePoints(collection);

    if (!storeData.userPoints) {
      storeData.userPoints = {};
    }

    if (storeData.userPoints[collection.userId]) {
      storeData.userPoints[collection.userId] += pointsToAdd;
    } else {
      storeData.userPoints[collection.userId] = pointsToAdd;
    }

    this.saveStoreData(storeData);
  }

  public convertPointsToVoucher(userId: string): void {
    const storeData = this.getStoreData();
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
