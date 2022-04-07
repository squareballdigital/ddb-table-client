import { DynamoDBClientResolvedConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClientResolvedConfig } from '@aws-sdk/lib-dynamodb';

export type DynamoDBTableClientResolvedConfig = DynamoDBClientResolvedConfig &
  DynamoDBDocumentClientResolvedConfig & {
    tableName: string;
  };
