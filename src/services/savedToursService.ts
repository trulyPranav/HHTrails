import { apiClient } from './apiClient';
import type { SavedToursData, SaveTourResponse } from '../types/savedTours';

const BASE = '/saved-tours';

class SavedToursService {
  /** Fetch all saved tours for the authenticated user. */
  async getSavedTours(): Promise<SavedToursData> {
    const res = await apiClient.get<{ success: boolean; data: SavedToursData }>(BASE);
    return res.data;
  }

  /** Save a tour to the authenticated user's list. */
  async saveTour(tourId: string): Promise<SaveTourResponse> {
    const res = await apiClient.post<{ success: boolean; data: SaveTourResponse }>(`${BASE}/${tourId}`);
    return res.data;
  }

  /** Remove a tour from the authenticated user's saved list. */
  async removeSavedTour(tourId: string): Promise<void> {
    await apiClient.delete<{ success: boolean }>(`${BASE}/${tourId}`);
  }
}

export const savedToursService = new SavedToursService();
