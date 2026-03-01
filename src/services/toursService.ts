import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/auth';
import type {
  Tour,
  ToursListData,
  TourResponseData,
  TourBaseInput,
  TourDetails,
  TourDetailsResponseData,
  ItineraryDay,
  ItineraryResponseData,
  ItineraryDayResponseData,
  CreateTourDetailsInput,
  UpdateTourDetailsInput,
  CreateItineraryDayInput,
  UpdateItineraryDayInput,
} from '../types/tour';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY as string | undefined;
const ADMIN_HEADER_KEY = 'x-admin-key';

function getAdminHeaders(): Record<string, string> {
  if (!ADMIN_KEY) {
    return {};
  }

  return {
    [ADMIN_HEADER_KEY]: ADMIN_KEY,
  };
}

export interface GetToursParams {
  region?: string;
  season?: string;
  types?: string[];
  isCustom?: boolean;
  page?: number;
  limit?: number;
}

export type CreateTourInput = TourBaseInput;
export type UpdateTourInput = Partial<TourBaseInput>;

class ToursService {
  async getTours(params: GetToursParams = {}): Promise<ToursListData> {
    const searchParams = new URLSearchParams();

    if (params.region) searchParams.set('region', params.region);
    if (params.season) searchParams.set('season', params.season);
    if (params.types && params.types.length > 0) {
      searchParams.set('types', params.types.join(','));
    }
    if (typeof params.isCustom === 'boolean') {
      searchParams.set('isCustom', params.isCustom ? 'true' : 'false');
    }
    if (params.page) searchParams.set('page', String(params.page));
    if (params.limit) searchParams.set('limit', String(params.limit));

    const query = searchParams.toString();
    const endpoint = `/tours${query ? `?${query}` : ''}`;

    const response = await apiClient.get<ApiResponse<ToursListData>>(endpoint);
    return response.data;
  }

  async getTour(id: string): Promise<Tour> {
    const response = await apiClient.get<ApiResponse<TourResponseData>>(
      `/tours/${id}`
    );
    return response.data.tour;
  }

  async createTour(input: CreateTourInput): Promise<Tour> {
    const response = await apiClient.post<ApiResponse<TourResponseData>>(
      '/tours',
      input,
      {
        headers: getAdminHeaders(),
      }
    );

    return response.data.tour;
  }

  async updateTour(id: string, input: UpdateTourInput): Promise<Tour> {
    const response = await apiClient.put<ApiResponse<TourResponseData>>(
      `/tours/${id}`,
      input,
      {
        headers: getAdminHeaders(),
      }
    );

    return response.data.tour;
  }

  async deleteTour(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<{ message: string }>>(`/tours/${id}`, {
      headers: getAdminHeaders(),
    });
  }

  // ── Details ─────────────────────────────────────────

  async getDetails(tourId: string): Promise<TourDetails> {
    const response = await apiClient.get<ApiResponse<TourDetailsResponseData>>(
      `/tours/${tourId}/details`
    );
    return response.data.tourDetails;
  }

  async createDetails(tourId: string, input: CreateTourDetailsInput): Promise<TourDetails> {
    const response = await apiClient.post<ApiResponse<TourDetailsResponseData>>(
      `/tours/${tourId}/details`,
      input,
      { headers: getAdminHeaders() }
    );
    return response.data.tourDetails;
  }

  async updateDetails(tourId: string, input: UpdateTourDetailsInput): Promise<TourDetails> {
    const response = await apiClient.put<ApiResponse<TourDetailsResponseData>>(
      `/tours/${tourId}/details`,
      input,
      { headers: getAdminHeaders() }
    );
    return response.data.tourDetails;
  }

  // ── Itinerary ────────────────────────────────────────

  async getItinerary(tourId: string): Promise<ItineraryDay[]> {
    const response = await apiClient.get<ApiResponse<ItineraryResponseData>>(
      `/tours/${tourId}/itinerary`
    );
    return response.data.itinerary;
  }

  async addItineraryDay(tourId: string, input: CreateItineraryDayInput): Promise<ItineraryDay> {
    const response = await apiClient.post<ApiResponse<ItineraryDayResponseData>>(
      `/tours/${tourId}/itinerary`,
      input,
      { headers: getAdminHeaders() }
    );
    return response.data.day;
  }

  async updateItineraryDay(
    tourId: string,
    dayNumber: number,
    input: UpdateItineraryDayInput
  ): Promise<ItineraryDay> {
    const response = await apiClient.put<ApiResponse<ItineraryDayResponseData>>(
      `/tours/${tourId}/itinerary/${dayNumber}`,
      input,
      { headers: getAdminHeaders() }
    );
    return response.data.day;
  }

  async deleteItineraryDay(tourId: string, dayNumber: number): Promise<void> {
    await apiClient.delete<ApiResponse<{ message: string }>>(
      `/tours/${tourId}/itinerary/${dayNumber}`,
      { headers: getAdminHeaders() }
    );
  }
}

export const toursService = new ToursService();
