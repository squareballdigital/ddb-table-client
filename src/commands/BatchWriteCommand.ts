import { ConsumedCapacity } from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand as __BatchWriteCommand,
  BatchWriteCommandInput as __BatchWriteCommandInput,
  BatchWriteCommandOutput as __BatchWriteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { ElementTypeOf } from '../internal/ElementTypeOf.js';
import { ValueTypeOf } from '../internal/ValueTypeOf.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type BatchWriteCommandRequestItems = ValueTypeOf<
  __BatchWriteCommandInput['RequestItems']
>;

export type BatchWriteCommandRequestItem =
  ElementTypeOf<BatchWriteCommandRequestItems>;

export type BatchWriteCommandInput = Omit<
  __BatchWriteCommandInput,
  'RequestItems'
> & { RequestItems: BatchWriteCommandRequestItems };

export type BatchWriteCommandOutput = Omit<
  __BatchWriteCommandOutput,
  'ConsumedCapacity' | 'ItemCollectionMetrics' | 'UnprocessedItems'
> & {
  ConsumedCapacity?: Omit<ConsumedCapacity, 'TableName'>;
  ItemCollectionMetrics?: ValueTypeOf<
    __BatchWriteCommandOutput['ItemCollectionMetrics']
  >;
  UnprocessedItems?: ValueTypeOf<__BatchWriteCommandOutput['UnprocessedItems']>;
};

export class BatchWriteCommand extends TableClientCommandBase<
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
  __BatchWriteCommandInput,
  __BatchWriteCommandOutput
> {
  constructor(input: BatchWriteCommandInput) {
    super(input, __BatchWriteCommand);
  }

  protected override mapInput(
    value: BatchWriteCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __BatchWriteCommandInput {
    return {
      ...value,
      RequestItems: {
        [configuration.tableName]: value.RequestItems,
      },
    };
  }

  protected override mapOutput(
    value: __BatchWriteCommandOutput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): BatchWriteCommandOutput {
    return {
      ...value,
      ConsumedCapacity: value.ConsumedCapacity && value.ConsumedCapacity[0],
      ItemCollectionMetrics:
        value.ItemCollectionMetrics &&
        value.ItemCollectionMetrics[configuration.tableName],
      UnprocessedItems:
        value.UnprocessedItems &&
        value.UnprocessedItems[configuration.tableName],
    };
  }
}
