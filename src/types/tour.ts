export interface TourBaseInput {
  title: string;
  description?: string;
  region: string;
  types: string[];
  season: string;
  durationDays: number;
  durationNights: number;
  photoUrl: string;
  isCustom?: boolean;
}

export interface Tour extends TourBaseInput {
  id: string;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ToursListData {
  tours: Tour[];
  pagination: Pagination;
}

export interface TourResponseData {
  tour: Tour;
}

export interface TourDetails {
  id: string;
  tourId: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationDescription: string | null;
  accommodationMediaUrl: string | null;
  featureDescription: string | null;
  featureMediaUrl: string | null;
  featureIsVideo: boolean;
  routeDescription: string | null;
  routePhotoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  id: string;
  tourId: string;
  dayNumber: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TourDetailsResponseData {
  tourDetails: TourDetails;
}

export interface ItineraryResponseData {
  itinerary: ItineraryDay[];
}

export interface ItineraryDayResponseData {
  day: ItineraryDay;
}

export type CreateTourDetailsInput = {
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationDescription?: string | null;
  accommodationMediaUrl?: string | null;
  featureDescription?: string | null;
  featureMediaUrl?: string | null;
  featureIsVideo?: boolean;
  routeDescription?: string | null;
  routePhotoUrl?: string | null;
};

export type UpdateTourDetailsInput = Partial<CreateTourDetailsInput>;

export type CreateItineraryDayInput = {
  dayNumber: number;
  description: string;
  imageUrl: string;
};

export type UpdateItineraryDayInput = {
  description?: string;
  imageUrl?: string;
};
