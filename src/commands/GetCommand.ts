import {
  GetCommand as __GetCommand,
  GetCommandInput as __GetCommandInput,
  GetCommandOutput as __GetCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type GetCommandInput<Key = DocumentValue> = Omit<
  __GetCommandInput,
  'TableName' | 'Key'
> & {
  Key: Key;
};

export type GetCommandOutput<Item = DocumentValue> = Omit<
  __GetCommandOutput,
  'Item'
> & {
  Item?: Item;
};

export class GetCommand<
  Item = DocumentValue,
  Key = DocumentValue,
> extends TableClientCommandBase<
  GetCommandInput<Key>,
  GetCommandOutput<Item>,
  __GetCommandInput,
  __GetCommandOutput
> {
  constructor(input: GetCommandInput<Key>) {
    super(input, __GetCommand);
  }

  protected override mapInput(
    value: GetCommandInput<Key>,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __GetCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
