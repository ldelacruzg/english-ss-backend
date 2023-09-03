import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [UserModule, ClassModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
