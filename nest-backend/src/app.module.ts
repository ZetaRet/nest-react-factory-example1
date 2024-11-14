import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public_html'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot(),
    PartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
