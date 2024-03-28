import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { LoggingService } from './logger.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
