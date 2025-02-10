import { Injectable } from '@angular/core';
import { CollectionRequest } from '../model/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor() { }
  calculatePoints(collection: CollectionRequest): number {
    let points = 0;
    for (const item of collection.wasteItems) {
      const type = item.type.toLowerCase();
      switch (type) {
        case 'plastic':
        case 'plastique':
          points += item.weight * 2;
          break;
        case 'glass':
        case 'verre':
          points += item.weight * 1;
          break;
        case 'paper':
        case 'papier':
          points += item.weight * 1;
          break;
        case 'metal':
        case 'métal':
          points += item.weight * 5;
          break;
        default:
          break;
      }
    }
    return points;
  }

  
  convertPoints(points: number): { voucherValue: number, pointsUsed: number } {
    if (points >= 500) {
      return { voucherValue: 350, pointsUsed: 500 };
    } else if (points >= 200) {
      return { voucherValue: 120, pointsUsed: 200 };
    } else if (points >= 100) {
      return { voucherValue: 50, pointsUsed: 100 };
    }
    return { voucherValue: 0, pointsUsed: 0 };
  }
}
