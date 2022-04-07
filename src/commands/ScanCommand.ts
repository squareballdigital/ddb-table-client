import {
  ScanCommand as __ScanCommand,
  ScanCommandInput as __ScanCommandInput,
  ScanCommandOutput as __ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type ScanCommandInput = Omit<__ScanCommandInput, 'TableName'>;

export type ScanCommandOutput<Item = DocumentValue> = Omit<
  __ScanCommandOutput,
  'Items'
> & { Items?: Item[] };

export class ScanCommand<Item = DocumentValue> extends TableClientCommandBase<
  ScanCommandInput,
  ScanCommandOutput<Item>,
  __ScanCommandInput,
  __ScanCommandOutput
> {
  constructor(input: ScanCommandInput) {
    super(input, __ScanCommand);
  }

  protected override mapInput(
    value: ScanCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __ScanCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
