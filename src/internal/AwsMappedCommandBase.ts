/* eslint-disable @typescript-eslint/no-unused-vars */
import { Command as SmithyCommand } from '@aws-sdk/smithy-client';
import { Handler, MiddlewareStack } from '@aws-sdk/types';
import { AwsCommandConstructor } from './AwsCommandConstructor.js';

export class AwsMappedCommandBase<
  Input extends object,
  Output extends object,
  ResolvedClientConfiguration,
  InternalInput extends object = Input,
  InternalOutput extends object = Output,
> extends SmithyCommand<Input, Output, ResolvedClientConfiguration> {
  constructor(
    public readonly input: Input,
    private readonly command: AwsCommandConstructor<
      InternalInput,
      InternalOutput,
      ResolvedClientConfiguration
    >,
  ) {
    super();
  }

  override resolveMiddleware(
    stack: MiddlewareStack<any, any>,
    configuration: ResolvedClientConfiguration,
    options: any,
  ): Handler<Input, Output> {
    const command = new this.command(
      this.mapInput(this.input, stack, configuration, options),
    );
    const handler = command.resolveMiddleware(stack, configuration, options);

    return async () => {
      const result = await handler(command);
      return {
        ...result,
        output: this.mapOutput(result.output, stack, configuration, options),
      };
    };
  }

  protected mapInput(
    value: Input,
    stack: MiddlewareStack<any, any>,
    configuration: ResolvedClientConfiguration,
    options: any,
  ): InternalInput {
    return value as any;
  }

  protected mapOutput(
    value: InternalOutput,
    stack: MiddlewareStack<any, any>,
    configuration: ResolvedClientConfiguration,
    options: any,
  ): Output {
    return value as any;
  }
}
