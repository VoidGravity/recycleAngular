export interface WasteItem {
    type: 'plastique' | 'verre' | 'papier' | 'metal';
    weight: number; 
    photos?: File[]; 
  }
  
  export type RequestStatus = 'en attente' | 'occupee' | 'en cours' | 'validee' | 'rejetee';
  
  export interface CollectionRequest {
    id: string;
    userId: string;
    wasteItems: WasteItem[]; 
    totalWeight: number; 
    collectionAddress: string;
    collectionDate: string;
    collectionTime: string; 
    additionalNotes?: string;
    status: RequestStatus; 
  }
  