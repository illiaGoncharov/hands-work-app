// Типы данных для приложения
export interface Shift {
  id?: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: string;
  priceWorker: number;
  customerFeedbacksCount: number;
  customerRating: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ApiResponse {
  shifts?: Shift[];
  success: boolean;
  error?: string;
}
