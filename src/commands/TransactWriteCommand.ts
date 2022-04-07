import {
  TransactWriteCommand as __TransactWriteCommand,
  TransactWriteCommandInput as __TransactWriteCommandInput,
  TransactWriteCommandOutput as __TransactWriteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { ElementTypeOf } from '../internal/ElementTypeOf.js';
import { ValueTypeOf } from '../internal/ValueTypeOf.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

type __TransactWriteItem = ElementTypeOf<
  __TransactWriteCommandInput['TransactItems']
>;

export type ConditionCheck = Omit<
  Required<__TransactWriteItem>['ConditionCheck'],
  'TableName'
>;
export type Delete = Omit<Required<__TransactWriteItem>['Delete'], 'TableName'>;
export type Put = Omit<Required<__TransactWriteItem>['Put'], 'TableName'>;
export type Update = Omit<Required<__TransactWriteItem>['Update'], 'TableName'>;

export type TransactWriteItem = {
  [K in keyof __TransactWriteItem]?: Omit<
    Required<__TransactWriteItem>[K],
    'TableName'
  >;
};

export type TransactWriteCommandInput = Omit<
  __TransactWriteCommandInput,
  'TransactItems'
> & {
  TransactItems: TransactWriteItem[];
};

export type TransactWriteCommandOutput = Omit<
  __TransactWriteCommandOutput,
  'ItemCollectionMetrics'
> & {
  ItemCollectionMetrics?: ValueTypeOf<
    __TransactWriteCommandOutput['ItemCollectionMetrics']
  >;
};

export class TransactWriteCommand extends TableClientCommandBase<
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
  __TransactWriteCommandInput,
  __TransactWriteCommandOutput
> {
  constructor(input: TransactWriteCommandInput) {
    super(input, __TransactWriteCommand);
  }

  protected override mapInput(
    value: TransactWriteCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __TransactWriteCommandInput {
    return {
      ...value,
      TransactItems: this.input.TransactItems.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([k, v]) => [
            k,
            { ...v, TableName: configuration.tableName },
          ]),
        ),
      ),
    };
  }

  protected override mapOutput(
    value: __TransactWriteCommandOutput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): TransactWriteCommandOutput {
    return {
      ...value,
      ItemCollectionMetrics:
        value.ItemCollectionMetrics &&
        value.ItemCollectionMetrics[configuration.tableName],
    };
  }
}
