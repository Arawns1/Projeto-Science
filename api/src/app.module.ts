import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controller.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [ControllersModule, DatabaseModule],
  providers: [PrismaService],
})
export class AppModule {}
