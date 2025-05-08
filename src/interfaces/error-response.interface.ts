export interface ErrorResponse {
  message?: string;
  path: string;
  method: string;
  statusCode?: number;
  timestamp: string;
}
