# OTel Sandbox

Learning project for OpenTelemetry with a NestJS gateway and an Express weather microservice.

## Services

| Service | Port | Description |
|---|---|---|
| `gateway-nest` | 3000 | NestJS gateway — proxies requests to the weather service |
| `weather-service` | 3001 | Express app — returns mock weather data |

## Running

```bash
# First time or after changing Dockerfile/package.json
docker compose up --build

# Otherwise
docker compose up
```

> Hot reload is enabled — edit files in `src/` and the service restarts automatically.

## Endpoints

```bash
curl http://localhost:3001/weather           # weather service direct
curl http://localhost:3000/weather           # via gateway
curl http://localhost:3000/weather/london    # city-specific via gateway
```

## OpenTelemetry

Traces and metrics are printed to stdout via `ConsoleSpanExporter`.
Both services load `src/tracing.ts` via the `--import` Node flag before any app code.