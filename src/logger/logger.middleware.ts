import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    let reqLogString = `<- ${req.method} ${req.url}`;
    if (Object.keys(req.query).length > 0)
      reqLogString += `, Query: ${JSON.stringify(req.query)}`;
    if (Object.keys(req.params).length > 0)
      reqLogString += `, Params: ${JSON.stringify(req.params)}`;
    if (Object.keys(req.body).length > 0)
      reqLogString += `, Body: ${JSON.stringify(req.body)}`;

    res.on('close', () => {
      let resLogString = `-> ${res.statusCode} ${res.statusMessage}`;
      this.logger.log(reqLogString);
      this.logger.log(resLogString);
    });
    next();
  }
}
