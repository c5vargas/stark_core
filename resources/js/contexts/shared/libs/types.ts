export interface ValidationErrorResponse {
  status: number;
  message: string;
  errors?: {
    [field: string]: string[];
  };
}

export interface HTTPResultsResponse<T> {
  results: { data: T[]};
  status: number;
}

export interface HTTPMessageResponse {
  message: string;
  status: number;
}

