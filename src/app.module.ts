import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { EnvModule } from './env/env.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { RequestMethod } from '@nestjs/common';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: '@ar116210622003',
      username: 'postgres',
      entities: [User, Task],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    TaskModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(CurrentUserMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
