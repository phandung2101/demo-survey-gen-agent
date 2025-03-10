export class QuestionPrompts {
  static getSingleChoicePrompt(userContext: string = ''): string {
    return `
Please create a Single Choice quiz question.
${userContext ? `User context: ${userContext}` : ''}

Requirements:
1. Create a clear, concise question
2. Create between 2-7 answer choices (around 4 is ideal)
3. Choices must be clear, not ambiguous
4. If the user context indicates a specific language (e.g., Korean), create the question in that language or in English

Return the result in JSON format with the following structure:
{
  "question": "Question content",
  "choices": ["Choice 1", "Choice 2", ...]
}

Return only the JSON, without any additional text.
`;
  }

  static getMultipleChoicePrompt(userContext: string = ''): string {
    return `
Please create a Multiple Choice quiz question.
${userContext ? `User context: ${userContext}` : ''}

Requirements:
1. Create a clear, concise question
2. Create several answer choices
3. Choices must be clear, not ambiguous
4. If the user context indicates a specific language (e.g., Korean), create the question in that language or in English

Return the result in JSON format with the following structure:
{
  "question": "Question content",
  "choices": ["Choice 1", "Choice 2", ..."]
}

Return only the JSON, without any additional text.
`;
  }
}
