import {
  QueryCommand as __QueryCommand,
  QueryCommandInput as __QueryCommandInput,
  QueryCommandOutput as __QueryCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type QueryCommandInput = Omit<__QueryCommandInput, 'TableName'>;

export type QueryCommandOutput<Item = DocumentValue> = Omit<
  __QueryCommandOutput,
  'Items'
> & {
  Items?: Item[];
};

export class QueryCommand<Item = DocumentValue> extends TableClientCommandBase<
  QueryCommandInput,
  QueryCommandOutput<Item>,
  __QueryCommandInput,
  __QueryCommandOutput
> {
  constructor(input: QueryCommandInput) {
    super(input, __QueryCommand);
  }

  protected override mapInput(
    value: QueryCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __QueryCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
