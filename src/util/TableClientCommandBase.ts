import { DynamoDBTableClientResolvedConfig } from '../DynamoDBTableClientResolvedConfig.js';
import { AwsMappedCommandBase } from '../internal/AwsMappedCommandBase.js';

export class TableClientCommandBase<
  Input extends object, // eslint-disable-line @typescript-eslint/ban-types
  Output extends object, // eslint-disable-line @typescript-eslint/ban-types
  InternalInput extends object = Input, // eslint-disable-line @typescript-eslint/ban-types
  InternalOutput extends object = Output, // eslint-disable-line @typescript-eslint/ban-types
> extends AwsMappedCommandBase<
  Input,
  Output,
  DynamoDBTableClientResolvedConfig,
  InternalInput,
  InternalOutput
> {}
