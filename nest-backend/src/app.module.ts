import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PartsModule } from './parts/parts.module';
import { KnexModule } from 'nest-knexjs';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public_html'),
      exclude: ['/api/(.*)'],
    }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'rootprod' ? 'nest-backend/.env' : '.env',
    }),
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: process.env.DB_TYPE,
          connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: process.env.SCHEMA,
          },
        },
      }),
    }),
    PartsModule,
    VendorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
