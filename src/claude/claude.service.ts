import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClaudeService {
  private readonly logger = new Logger(ClaudeService.name);
  private readonly apiKey: string | undefined;
  private readonly apiUrl = 'https://api.anthropic.com/v1/messages';
  
  private readonly RR_CLAUDE_MODEL = 'claude-3-haiku-20240307';
  private readonly PRO_CLAUDE_MODEL = 'claude-3-haiku-20240307';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('CLAUDE_API_KEY');
    if (!this.apiKey) {
      this.logger.warn('CLAUDE_API_KEY is not defined in environment variables');
    }
  }

  async generateCompletion(prompt: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': this.apiKey,
    };

    const payload = {
      model: this.RR_CLAUDE_MODEL,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: prompt }
      ],
    };

    try {
      const { data } = await lastValueFrom(
        this.httpService.post(this.apiUrl, payload, { headers })
      );
      
      return data;
    } catch (error) {
      this.logger.error(`Failed to generate completion: ${error.message}`);
      throw error;
    }
  }
}