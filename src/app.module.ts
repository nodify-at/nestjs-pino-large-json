import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController }                          from './app.controller';
import { AppService }                             from './app.service';
import { APP_FILTER }                             from '@nestjs/core';
import { ErrorFilter }                            from './error.filter';
import { ValidatorMiddleware }                    from './validator.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    AppService,
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidatorMiddleware).forRoutes(AppController);
  }
}
