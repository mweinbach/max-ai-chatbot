import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { deepinfra } from '@ai-sdk/deepinfra';
import { openai } from '@ai-sdk/openai'; 
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': deepinfra('deepseek-ai/DeepSeek-V3-0324'),
        'chat-model-reasoning': wrapLanguageModel({
          model: deepinfra('deepseek-ai/DeepSeek-R1-0528'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai('gpt-4.1-nano'),
        'artifact-model': openai('gpt-4.1'),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
