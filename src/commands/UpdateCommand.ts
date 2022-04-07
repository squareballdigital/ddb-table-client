import {
  UpdateCommand as __UpdateCommand,
  UpdateCommandInput as __UpdateCommandInput,
  UpdateCommandOutput as __UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type UpdateCommandInput<Key = DocumentValue> = Omit<
  __UpdateCommandInput,
  'Key' | 'TableName'
> & {
  Key: Key;
};

export type UpdateCommandOutput<Attributes = DocumentValue> = Omit<
  __UpdateCommandOutput,
  'Attributes'
> & { Attributes?: Attributes };

export class UpdateCommand<
  Attributes = DocumentValue,
  Key = DocumentValue,
> extends TableClientCommandBase<
  UpdateCommandInput<Key>,
  UpdateCommandOutput<Attributes>,
  __UpdateCommandInput,
  __UpdateCommandOutput
> {
  constructor(input: UpdateCommandInput<Key>) {
    super(input, __UpdateCommand);
  }

  protected override mapInput(
    value: UpdateCommandInput<Key>,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __UpdateCommandInput {
    return {
      ...value,
      TableName: configuration.tableName,
    };
  }
}
