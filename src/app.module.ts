import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [AuthModule, BranchModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
