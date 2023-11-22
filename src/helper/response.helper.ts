export interface ResponseDto {
  success: boolean;
  message: string;
  data?: any;
}

export class ResponseHelper {
  static successResponse = (message: string, data?: any): ResponseDto => {
    return {
      success: true,
      message,
      data,
    };
  };

  static errorResponse = (message: string, data?: any): ResponseDto => {
    return {
      success: false,
      message,
      data,
    };
  };
}
