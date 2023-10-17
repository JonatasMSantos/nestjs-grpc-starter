import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

export interface HttpExceptionResponse {
  statusCode: number;
  message: any;
  error: string;
}

export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    console.log(host);

    console.log('exception', JSON.stringify(exception));
    /*
    
    let response: any;
    try {
      response = getErrorMessage<BadRequestException>(exception);
      console.log('obteve resposta', response);
    } catch (error) {
      return throwError(() => 'error');
    }*/

    const rpcException = new RpcException({
      //@ts-expect-error - message is private
      message: JSON.stringify(exception.getResponse().message),
      code: status.FAILED_PRECONDITION,
    });

    return throwError(() => rpcException.getError());
  }
}

export const getErrorMessage = <T>(exception: T): any => {
  if (exception instanceof HttpException) {
    const errorResponse = exception.getResponse();
    const errorMessage =
      (errorResponse as HttpExceptionResponse).message || exception.message;

    return errorMessage;
  } else {
    return String(exception);
  }
};
