import {
  PutCommand as __PutCommand,
  PutCommandInput as __PutCommandInput,
  PutCommandOutput as __PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type PutCommandInput<Item = DocumentValue> = Omit<
  __PutCommandInput,
  'TableName' | 'Item'
> & {
  Item: Item;
};

export type PutCommandOutput<Attributes = DocumentValue> = Omit<
  __PutCommandOutput,
  'Attributes' | 'TableName'
> & {
  Attributes?: Attributes;
};

export class PutCommand<
  Item = DocumentValue,
  Attributes = Item,
> extends TableClientCommandBase<
  PutCommandInput<Item>,
  PutCommandOutput<Attributes>,
  __PutCommandInput,
  __PutCommandOutput
> {
  constructor(input: PutCommandInput<Item>) {
    super(input, __PutCommand);
  }

  protected override mapInput(
    value: PutCommandInput<Item>,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __PutCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
