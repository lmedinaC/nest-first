import { ExceptionFilter, Catch, ArgumentsHost,HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorException implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.UNPROCESSABLE_ENTITY
    const statusCode = exception['code'];
    var message = (exception as QueryFailedError).message;
    const detail = exception['detail'];
    
    switch (statusCode) {
      case '23505' : message = "The object already exist"; break;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        mesage: message,
        detail: detail,
      });
  }
}