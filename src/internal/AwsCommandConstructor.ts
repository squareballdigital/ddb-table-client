import { Command, MetadataBearer } from '@aws-sdk/types';

export interface AwsCommandConstructor<
  Input extends ServiceInputTypes,
  Output extends ServiceOutputTypes,
  ResolvedClientConfiguration,
  ServiceInputTypes extends object = any, // eslint-disable-line @typescript-eslint/ban-types
  ServiceOutputTypes extends MetadataBearer = any,
> {
  new (input: Input): Command<
    ServiceInputTypes,
    Input,
    ServiceOutputTypes,
    Output,
    ResolvedClientConfiguration
  >;
}
