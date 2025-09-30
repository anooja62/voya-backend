interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export function sendSuccess<T>(
  res: any,
  message: string,
  data?: T,
  statusCode = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
}

export function sendError(res: any, error: string, statusCode = 400) {
  const response: ApiResponse<null> = {
    success: false,
    message: "Request failed",
    error,
  };
  return res.status(statusCode).json(response);
}
