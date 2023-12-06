import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode, code2message, code2status } from './error-codes';

export class ServerException extends HttpException {
  constructor(code: ErrorCode) {
    super(
      code2message.get(code) || 'Server Error',
      code2status.get(code) || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
