import { Body, Controller, Post } from '@nestjs/common';
import { ErrorResponse } from 'src/common/error-response';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';
import { QuestionGeneratorService } from './question-generator.service';

@Controller('api/questions')
export class QuestionGeneratorController {
  constructor(private questionGeneratorService: QuestionGeneratorService) {}

  @Post('generate/single-choice')
  async generateSingleChoiceQuestion(
    @Body() generateQuestionDto: GenerateQuestionDto,
  ): Promise<QuestionResponseDto | ErrorResponse> {
    return await this.questionGeneratorService.generateSingleChoiceQuestion(
      generateQuestionDto,
    );
  }
}
