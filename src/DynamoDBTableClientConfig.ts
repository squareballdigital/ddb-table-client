import { TranslateConfig } from '@aws-sdk/lib-dynamodb';

export interface DynamoDBTableClientConfig extends TranslateConfig {
  tableName: string;
}
