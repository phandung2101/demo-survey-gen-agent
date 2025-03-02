import { Module } from '@nestjs/common';
import { QuestionGeneratorController } from './question-generator.controller';
import { QuestionGeneratorService } from './question-generator.service';
import { ClaudeService } from 'src/claude/claude.service';
import { ClaudeModule } from 'src/claude/claude.module';

@Module({
  imports: [ClaudeModule],
  providers: [QuestionGeneratorService],
  controllers: [QuestionGeneratorController],
})
export class QuestionGeneratorModule {}
