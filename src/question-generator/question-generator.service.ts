import { Injectable, Logger } from '@nestjs/common';
import { ErrorResponse } from 'src/common/error-response';
import { QuestionPrompts } from 'src/promt-template/question.promt';
import { ClaudeService } from '../claude/claude.service';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

@Injectable()
export class QuestionGeneratorService {
  private readonly logger = new Logger(QuestionGeneratorService.name);

  constructor(private claudeService: ClaudeService) {}

  async generateSingleChoiceQuestion(
    dto: GenerateQuestionDto,
  ): Promise<QuestionResponseDto | ErrorResponse> {
    const { context = '' } = dto;

    const prompt = QuestionPrompts.getSingleChoicePrompt(context);

    try {
      const response = await this.claudeService.generateCompletion(prompt);
      const content = response.content[0].text;

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return new ErrorResponse('Không thể tạo câu hỏi. Vui lòng thử lại.');
      }

      try {
        const jsonData = JSON.parse(jsonMatch[0]);
        return {
          question: jsonData.question || 'Không có nội dung câu hỏi',
          choices: Array.isArray(jsonData.choices)
            ? jsonData.choices
            : ['Không có lựa chọn'],
        };
      } catch (parseError) {
        this.logger.error(
          `Failed to parse Claude response: ${parseError.message}`,
        );
        return new ErrorResponse('Lỗi khi xử lý dữ liệu từ AI');
      }
    } catch (error) {
      this.logger.error(`Error generating question: ${error.message}`);
      return new ErrorResponse('Lỗi khi gọi API Claude');
    }
  }
}
