import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Client as __Client } from '@aws-sdk/smithy-client';
import { HttpHandlerOptions as __HttpHandlerOptions } from '@aws-sdk/types';
import { DynamoDBTableClientConfig } from './DynamoDBTableClientConfig.js';
import { DynamoDBTableClientResolvedConfig } from './DynamoDBTableClientResolvedConfig.js';
import {
  DynamoDBTableClientServiceInputTypes,
  DynamoDBTableClientServiceOutputTypes,
} from './types.js';

// implentation of this is based on the AWS DynamoDBDocumentClient implementation
// see https://github.com/aws/aws-sdk-js-v3/blob/ec03fa0ca88e7ed08e9a01d4e77176b91fb46328/lib/lib-dynamodb/src/DynamoDBDocumentClient.ts#L114

export class DynamoDBTableClient extends __Client<
  __HttpHandlerOptions,
  DynamoDBTableClientServiceInputTypes,
  DynamoDBTableClientServiceOutputTypes,
  DynamoDBTableClientResolvedConfig
> {
  override readonly config: DynamoDBTableClientResolvedConfig;

  protected constructor(
    client: DynamoDBClient,
    { tableName, ...translateConfig }: DynamoDBTableClientConfig,
  ) {
    super(client.config as DynamoDBTableClientResolvedConfig);
    this.config = client.config as DynamoDBTableClientResolvedConfig;
    this.config.tableName = tableName;
    this.config.translateConfig = translateConfig;
    this.middlewareStack = client.middlewareStack;
  }

  static from(
    client: DynamoDBClient,
    config: DynamoDBTableClientConfig,
  ): DynamoDBTableClient {
    return new DynamoDBTableClient(client, config);
  }

  override destroy(): void {
    // A no-op, since client is passed in constructor
  }
}
