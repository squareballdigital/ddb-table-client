import { NativeAttributeValue } from '@aws-sdk/util-dynamodb';

export type DocumentValue = {
  [key: string]: NativeAttributeValue;
};
