import {
  ServiceInputTypes as __ServiceInputTypes,
  ServiceOutputTypes as __ServiceOutputTypes,
} from '@aws-sdk/client-dynamodb';
import {
  BatchGetCommandInput,
  BatchGetCommandOutput,
} from './commands/BatchGetCommand.js';
import {
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
} from './commands/BatchWriteCommand.js';
import {
  DeleteCommandInput,
  DeleteCommandOutput,
} from './commands/DeleteCommand.js';
import { GetCommandInput, GetCommandOutput } from './commands/GetCommand.js';
import { PutCommandInput, PutCommandOutput } from './commands/PutCommand.js';
import {
  QueryCommandInput,
  QueryCommandOutput,
} from './commands/QueryCommand.js';
import { ScanCommandInput, ScanCommandOutput } from './commands/ScanCommand.js';
import {
  TransactGetCommandInput,
  TransactGetCommandOutput,
} from './commands/TransactGetCommand.js';
import {
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
} from './commands/TransactWriteCommand.js';
import {
  UpdateCommandInput,
  UpdateCommandOutput,
} from './commands/UpdateCommand.js';

export type DynamoDBTableClientServiceInputTypes =
  | __ServiceInputTypes
  | BatchGetCommandInput
  | BatchWriteCommandInput
  | DeleteCommandInput
  | GetCommandInput
  | PutCommandInput
  | QueryCommandInput
  | ScanCommandInput
  | TransactGetCommandInput
  | TransactWriteCommandInput
  | UpdateCommandInput;

export type DynamoDBTableClientServiceOutputTypes =
  | __ServiceOutputTypes
  | BatchGetCommandOutput
  | BatchWriteCommandOutput
  | DeleteCommandOutput
  | GetCommandOutput
  | PutCommandOutput
  | QueryCommandOutput
  | ScanCommandOutput
  | TransactGetCommandOutput
  | TransactWriteCommandOutput
  | UpdateCommandOutput;
