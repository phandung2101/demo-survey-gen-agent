import { Injectable, Logger } from '@nestjs/common';
import { ClaudeService } from '../claude/claude.service';
import { GenerateQuestionDto } from './dto/generate-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';

@Injectable()
export class QuestionGeneratorService {
  private readonly logger = new Logger(QuestionGeneratorService.name);

  constructor(private claudeService: ClaudeService) {}

  async generateSingleChoiceQuestion(
    dto: GenerateQuestionDto,
  ): Promise<QuestionResponseDto> {
    const { topic, audience = 'general', context = '', choiceCount = 4 } = dto;

    // Tạo prompt để gửi đến Claude API
    const prompt = `
Hãy tạo một câu hỏi trắc nghiệm dạng Single Choice (chọn một đáp án đúng) về chủ đề: "${topic}".
${context ? `Bối cảnh thêm: ${context}` : ''}
${audience ? `Đối tượng người dùng: ${audience}` : ''}

Yêu cầu:
1. Tạo một câu hỏi rõ ràng, ngắn gọn
2. Tạo chính xác ${choiceCount} lựa chọn trả lời
3. Các lựa chọn phải rõ ràng, không mơ hồ
4. Một trong các lựa chọn phải là đáp án đúng

Trả về kết quả dưới định dạng JSON với cấu trúc như sau:
{
  "question": "Nội dung câu hỏi",
  "choices": ["Lựa chọn 1", "Lựa chọn 2", ...]
}

Chỉ trả về duy nhất đoạn JSON, không kèm theo bất kỳ text nào khác.
`;

    try {
      const response = await this.claudeService.generateCompletion(prompt);
      const content = response.content[0].text;

      // Trích xuất JSON từ phản hồi
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return {
          question: 'Không thể tạo câu hỏi. Vui lòng thử lại.',
          choices: ['Lựa chọn 1', 'Lựa chọn 2', 'Lựa chọn 3', 'Lựa chọn 4'],
        };
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
        return {
          question: 'Lỗi khi xử lý dữ liệu từ AI',
          choices: ['Lựa chọn 1', 'Lựa chọn 2', 'Lựa chọn 3', 'Lựa chọn 4'],
        };
      }
    } catch (error) {
      this.logger.error(`Error generating question: ${error.message}`);
      return {
        question: 'Lỗi khi gọi API Claude',
        choices: ['Lựa chọn 1', 'Lựa chọn 2', 'Lựa chọn 3', 'Lựa chọn 4'],
      };
    }
  }
}
