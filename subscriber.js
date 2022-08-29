const {
  EventStoreDBClient,
  PersistentSubscriptionExistsError,
  persistentSubscriptionToStreamSettingsFromDefaults,
} = require('@eventstore/db-client');
const { sleep } = require("./util");

module.exports = async function () {
  const client = EventStoreDBClient.connectionString(process.env.CONNECTION_STRING);

  try {
    const settings = persistentSubscriptionToStreamSettingsFromDefaults({
      startFrom: 'start',
      messageTimeout: 1000,
      resolveLinkTos: true,
    });

    await client.createPersistentSubscriptionToStream('$ce-Task', 'TestService', settings);
  } catch (err) {
    if (err instanceof PersistentSubscriptionExistsError) {
      console.log('Subscription already exists.');
    } else {
      throw err;
    }
  }

  const subscription = client.subscribeToPersistentSubscriptionToStream('$ce-Task', 'TestService');

  for await (const event of subscription) {
    await sleep(10000);
    await subscription.ack(event);
  }
}
