import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClaudeService } from './claude.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [ClaudeService],
  exports: [ClaudeService],
})
export class ClaudeModule {}