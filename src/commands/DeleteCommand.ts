import {
  DeleteCommand as __DeleteCommand,
  DeleteCommandInput as __DeleteCommandInput,
  DeleteCommandOutput as __DeleteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type DeleteCommandInput<Key = DocumentValue> = Omit<
  __DeleteCommandInput,
  'Key' | 'TableName'
> & { Key: Key };

export type DeleteCommandOutput<Attributes = DocumentValue> = Omit<
  __DeleteCommandOutput,
  'Attributes'
> & { Attributes?: Attributes };

export class DeleteCommand<
  Attributes = DocumentValue,
  Key = DocumentValue,
> extends TableClientCommandBase<
  DeleteCommandInput<Key>,
  DeleteCommandOutput<Attributes>,
  __DeleteCommandInput,
  __DeleteCommandOutput
> {
  constructor(input: DeleteCommandInput<Key>) {
    super(input, __DeleteCommand);
  }

  protected override mapInput(
    value: DeleteCommandInput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __DeleteCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
