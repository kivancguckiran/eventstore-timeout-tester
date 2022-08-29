const { EventStoreDBClient, jsonEvent } = require('@eventstore/db-client');
const { v4: uuid } = require('uuid');
const { sleep } = require('./util');

module.exports = async function () {
  const client = EventStoreDBClient.connectionString(process.env.CONNECTION_STRING);

  while (true) {
    const count = Math.floor(Math.random() * 100);
    const taskId = uuid();

    for (let i = 0; i < count; i++) {
      const event = jsonEvent({
        type: 'DummyEvent',
        data: {
          taskId,
          value: i,
          runtime: 'NodeJS',
        },
      });

      await client.appendToStream(`Task-${taskId}`, [event]);

      await sleep(10);
    }
  }
}
