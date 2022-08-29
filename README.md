# EventStore Timeout Test

## Generator

- Generates streams with event count between 0-100.

## Subscriber

- Subscribes to `$ce-Task` stream and sleeps to fire timout.

### HOW TO RUN

```bash
mkdir eventstore

docker build -t eventstore-timeout-tester:0.0.0 .
docker-compose up -d
```

### Result

- Eventstore does not respond `/subscriptions` endpoint on the interface. All connections hang.
