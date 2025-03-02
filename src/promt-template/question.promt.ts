export class QuestionPrompts {
  static getSingleChoicePrompt(
    topic: string,
    audience: string = 'general',
    context: string = '',
    choiceCount: number = 4,
  ): string {
    return `
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
  }

  static getMultipleChoicePrompt(
    topic: string,
    audience: string = 'general',
    context: string = '',
    choiceCount: number = 4,
  ): string {
    return `
Hãy tạo một câu hỏi trắc nghiệm dạng Multiple Choice (có thể chọn nhiều đáp án đúng) về chủ đề: "${topic}".
${context ? `Bối cảnh thêm: ${context}` : ''}
${audience ? `Đối tượng người dùng: ${audience}` : ''}

Yêu cầu:
1. Tạo một câu hỏi rõ ràng, ngắn gọn
2. Tạo chính xác ${choiceCount} lựa chọn trả lời
3. Các lựa chọn phải rõ ràng, không mơ hồ
4. Ít nhất 2 lựa chọn phải là đáp án đúng

Trả về kết quả dưới định dạng JSON với cấu trúc như sau:
{
  "question": "Nội dung câu hỏi",
  "choices": ["Lựa chọn 1", "Lựa chọn 2", ...],
  "correctAnswers": [0, 2]
}

Chỉ trả về duy nhất đoạn JSON, không kèm theo bất kỳ text nào khác.
`;
  }
}
