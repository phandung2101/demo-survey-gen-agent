import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionGeneratorModule } from './question-generator/question-generator.module';

@Module({
  imports: [
    QuestionGeneratorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
