import httpStatusCodes from 'http-status-codes';
import { MongooseError } from 'mongoose';
export interface APIError {
  message: string;
  code: number;
  codeAsString?: string; //allow to override the default error code as string
  description?: string;
  documentation?: string;
}

export interface APIErrorResponse extends Omit<APIError, 'codeAsString'> {
  error: string;
}

export default class ApiError {
  public static format(error: APIError): APIErrorResponse {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error.codeAsString
          ? error.codeAsString
          : httpStatusCodes.getStatusText(error.code),
      },
      ...(error.documentation && { documentation: error.documentation }),
      ...(error.description && { description: error.description }),
    };
  }
}

export function handleMongoError(err: unknown) {
  if (err instanceof MongooseError) {
    return `'Erro do Mongoose:', ${(err as MongooseError).message}`;
    // Trate o erro do Mongoose conforme necessário
  } else if (err instanceof Error) {
    return `Erro do Mongoose:', ${(err as MongooseError).message}`;
  } else {
    console.error('Erro desconhecido:', err);
  }
}
