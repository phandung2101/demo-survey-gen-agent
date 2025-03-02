import { Controller, Post, Body } from '@nestjs/common';
import { QuestionGeneratorService } from './question-generator.service';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

@Controller('api/questions')
export class QuestionGeneratorController {
  constructor(private questionGeneratorService: QuestionGeneratorService) {}

  @Post('generate/single-choice')
  async generateSingleChoiceQuestion(
    @Body() generateQuestionDto: GenerateQuestionDto,
  ): Promise<QuestionResponseDto> {
    return await this.questionGeneratorService.generateSingleChoiceQuestion(
      generateQuestionDto,
    );
  }
}
