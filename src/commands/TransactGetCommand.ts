import { ItemResponse } from '@aws-sdk/client-dynamodb';
import {
  TransactGetCommand as __TransactGetCommand,
  TransactGetCommandInput as __TransactGetCommandInput,
  TransactGetCommandOutput as __TransactGetCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { ElementTypeOf } from '../internal/ElementTypeOf.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type Get = Omit<
  ElementTypeOf<__TransactGetCommandInput['TransactItems']>,
  'TableName'
>;

export type TransactGetCommandInput = Omit<
  __TransactGetCommandInput,
  'TransactItems'
> & {
  TransactItems: Get[];
};

export type TransactGetCommandOutput<Item = DocumentValue> = Omit<
  __TransactGetCommandOutput,
  'Responses'
> & {
  Responses?: (Omit<ItemResponse, 'Item'> & {
    Item?: Item;
  })[];
};

export class TransactGetCommand<
  Item = DocumentValue,
> extends TableClientCommandBase<
  TransactGetCommandInput,
  TransactGetCommandOutput<Item>,
  __TransactGetCommandInput,
  __TransactGetCommandOutput
> {
  constructor(input: TransactGetCommandInput) {
    super(input, __TransactGetCommand);
  }

  protected override mapInput(
    value: TransactGetCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __TransactGetCommandInput {
    return {
      ...value,
      TransactItems: value.TransactItems.map(({ Get: x }) => ({
        Get: {
          ...x,
          Key: x?.Key,
          TableName: configuration.tableName,
        },
      })),
    };
  }
}
