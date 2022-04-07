# ddb-table-client

This package is intended as an (almost) drop-in replacement for [@aws-sdk/lib-dynamodb](https://npmjs.com/package/@aws-sdk/lib-dynamodb), with the only difference being that you don't have to specify the table on every command. Instead you specify the table once for the client object.

This makes it easier to implement [single-table design](https://www.alexdebrie.com/posts/dynamodb-single-table/).

## Example

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBTableClient, GetCommand } from 'ddb-table-client';

const client = new DynamoDBClient({});

const tableClient = DynamoDBTableClient.from(client, {
  tableName: 'mytable',
});

const result = await tableClient.send(
  new GetCommand({
    // look, no TableName property!
    Key: { id: '1234' },
  }),
);
```
