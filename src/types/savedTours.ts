import type { Tour } from './tour';

export interface SavedTour {
  savedId: string;
  savedAt: string;
  tour: Tour;
}

export interface SavedToursData {
  savedTours: SavedTour[];
}

export interface SaveTourResponse {
  savedId: string;
  tourId: string;
  savedAt: string;
}
