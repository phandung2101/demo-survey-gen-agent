import { Module } from '@nestjs/common';
import { ClaudeModule } from 'src/claude/claude.module';
import { QuestionGeneratorController } from './question-generator.controller';
import { QuestionGeneratorService } from './question-generator.service';

@Module({
  imports: [ClaudeModule],
  providers: [QuestionGeneratorService],
  controllers: [QuestionGeneratorController],
})
export class QuestionGeneratorModule {}
