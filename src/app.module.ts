import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { User } from './user/entities/user.entity';
import { UserData } from './database/entities/user-data.entity';
import { Image } from './database/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, UserData, Image],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, UserData, Image]),
    FirebaseAdminModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
