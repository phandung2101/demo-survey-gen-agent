export class QuestionPrompts {
  static getSingleChoicePrompt(userContext: string = ''): string {
    return `
ADVANCED QUIZ QUESTION GENERATION INSTRUCTIONS

Core Objective:
Generate a precise quiz question based on strict requirements and system specifications.

Global Rules:
1. ALWAYS return a valid JSON structure
2. MUST match the exact JSON schema for the specific question type
3. Validate ALL outputs against the predefined schema
4. Handle edge cases gracefully

User Context Processing:
- Analyze <user-context>${userContext}</user-context>
- Determine appropriate question language and domain
- If context is invalid or unusable, return a structured error response

Question Type Detection:
Automatically determine the most appropriate question type based on context:
- SINGLE_CHOICE: Select 1 answer from 2-8 choices
- MULTIPLE_CHOICE: Select multiple answers from 2-8 choices
- RANKING: Order choices from lowest to highest
- MATRIX: Multiple questions with same choice set
- NPS: Net Promoter Score (1-10 scale)
- SHORT_ANSWER: Open text response

JSON Schema Validation Checklist:
✅ Correct question type enumeration
✅ Proper field names
✅ Correct number of choices (2-8)
✅ Appropriate choice content
✅ Matching example structures from system specifications

Detailed Generation Guidelines:
1. SINGLE_CHOICE
   - Exactly one correct answer
   - 2-8 choices (4 recommended)
   - Clear, unambiguous wording
   JSON Example:
   {
     "questionType": "SINGLE_CHOICE",
     "question": "Precise question text",
     "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
   }

2. MULTIPLE_CHOICE
   - Multiple correct answers possible
   - 2-8 choices (4 recommended)
   - Clearly indicate correct choices
   JSON Example:
   {
     "questionType": "MULTIPLE_CHOICE", 
     "question": "Precise question text",
     "choices": [
       {"text": "Choice 1", "isCorrect": true},
       {"text": "Choice 2", "isCorrect": false},
       {"text": "Choice 3", "isCorrect": true}
     ]
   }

3. RANKING
   - Order matters from lowest to highest
   - 2-8 choices
   JSON Example:
   {
     "questionType": "RANKING",
     "question": "Rank these items",
     "choices": ["Lowest", "Medium", "High", "Highest"]
   }

4. MATRIX
   - Multiple related questions
   - Shared choice set
   JSON Example:
   {
     "questionType": "MATRIX",
     "questions": [
       "Question 1", 
       "Question 2"
     ],
     "choices": ["Bad", "Normal", "Good", "Very Good"]
   }

5. NPS
   - 1-10 scale
   - Low and high descriptors
   JSON Example:
   {
     "questionType": "NPS",
     "question": "How likely are you to recommend?",
     "lowText": "Not likely",
     "highText": "Extremely likely"
   }

6. SHORT_ANSWER
   - Simple open text question
   JSON Example:
   {
     "questionType": "SHORT_ANSWER",
     "question": "Describe your experience"
   }

Error Handling:
If unable to generate a question:
{
  "error": "Question generation failed",
  "reason": "Specific failure description"
}

CRITICAL: Return ONLY the generated JSON. No additional text or explanation.
`;
  }
}