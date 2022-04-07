import { KeysAndAttributes } from '@aws-sdk/client-dynamodb';
import {
  BatchGetCommand as __BatchGetCommand,
  BatchGetCommandInput as __BatchGetCommandInput,
  BatchGetCommandOutput as __BatchGetCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { MiddlewareStack } from '@aws-sdk/types';
import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { DocumentValue } from '../util/DocumentValue.js';
import { TableClientCommandBase } from '../util/TableClientCommandBase.js';

export type BatchGetCommandRequestItem<Key = DocumentValue> = Omit<
  KeysAndAttributes,
  'Keys'
> & {
  Keys: Key[];
};

export type BatchGetCommandInput<Key = DocumentValue> = Omit<
  __BatchGetCommandInput,
  'RequestItems'
> & { RequestItems: BatchGetCommandRequestItem<Key> };

export type BatchGetCommandOutput<
  Response = DocumentValue,
  Key = DocumentValue,
> = Omit<__BatchGetCommandOutput, 'Responses' | 'UnprocessedKeys'> & {
  Responses?: Response[];
  UnprocessedKeys?: BatchGetCommandRequestItem<Key>;
};

export class BatchGetCommand<
  Response = DocumentValue,
  Key = DocumentValue,
> extends TableClientCommandBase<
  BatchGetCommandInput<Key>,
  BatchGetCommandOutput<Response, Key>,
  __BatchGetCommandInput,
  __BatchGetCommandOutput
> {
  constructor(input: BatchGetCommandInput<Key>) {
    super(input, __BatchGetCommand);
  }

  protected override mapInput(
    value: BatchGetCommandInput<Key>,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): __BatchGetCommandInput {
    return {
      ...value,
      RequestItems: { [configuration.tableName]: this.input.RequestItems },
    };
  }

  protected override mapOutput(
    value: __BatchGetCommandOutput,
    stack: MiddlewareStack<any, any>,
    configuration: DynamoDBTableClientResolvedConfig,
  ): BatchGetCommandOutput<Response, Key> {
    return {
      ...value,
      Responses:
        value.Responses &&
        (value.Responses[configuration.tableName] as Response[]),
      UnprocessedKeys:
        value.UnprocessedKeys &&
        (value.UnprocessedKeys[
          configuration.tableName
        ] as BatchGetCommandRequestItem<Key>),
    };
  }
}
