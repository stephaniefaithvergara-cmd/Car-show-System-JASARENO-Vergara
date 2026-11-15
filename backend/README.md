# Car Show 2027 Registration System — Backend API

Backend API for the AutoVista Events Car Show 2027 Registration System. This project uses the provided Vertical Slice architecture and exposes registration data to the React dashboard.

## Technology

- C# / .NET 10 Minimal API
- Entity Framework Core 10
- SQLite
- FluentValidation
- Scalar / OpenAPI
- Vertical Slice request handlers and `Result<T>` error handling

## Project structure

```text
backend-FULGAR/
├── Api/
│   ├── Common/                  # Validation filter and ProblemDetails mapping
│   ├── Features/Registrations/  # Minimal API route group
│   ├── Api.http                 # Manual API test requests
│   └── Program.cs               # Dependency injection, CORS, JSON, and startup
├── Application/
│   ├── Abstractions/            # Database and CQRS interfaces
│   └── Features/Registrations/  # Create, list, get-by-ID, and summary slices
├── Domain/
│   ├── Common/
│   ├── Entities/
│   └── Enums/
├── Infrastructure/
│   ├── Migrations/
│   └── Persistence/             # EF Core context and sample data seeder
└── VerticalSlice.slnx
```

## Requirements

- .NET 10 SDK
- An IDE or editor with C# support

## Run the API

Open a terminal in this folder and run:

```bash
dotnet restore
dotnet build
dotnet run --project Api
```

The API is configured for the local development URL `http://localhost:5205` through the launch settings.

- Scalar: <http://localhost:5205/scalar/v1>
- Registrations: <http://localhost:5205/api/registrations>
- Summary: <http://localhost:5205/api/registrations/summary>

The SQLite connection string is configured in `Api/appsettings.json`. On startup, the API applies EF Core migrations and seeds sample registrations only when the table is empty. The seed contains 30 registrations covering all registration types, registration statuses, and payment statuses. The database file is created/used by the API at runtime.

## API endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/registrations` | Create a registration |
| GET | `/api/registrations` | List registrations with filters and pagination |
| GET | `/api/registrations/{id}` | Get one registration by GUID |
| GET | `/api/registrations/summary` | Return dashboard KPI totals |

Supported list query parameters: `participantName`, `type`, `status`, `page`, and `pageSize`. Filters can be combined. The default page is `1` and default page size is `10`.

## Business rules

- Exhibitor fee: ₱1,500; Competitor fee: ₱2,500; VIP fee: ₱5,000.
- Registration number, registration date, fee, and initial `Pending` status are set by the API.
- Duplicate plate numbers return `409 Conflict`.
- Validation errors return `400 Bad Request`; missing IDs return `404 Not Found`.
- Payment status is computed as `Unpaid`, `Partial`, or `Paid` from the amount paid and registration fee.
- Cancelled registrations are excluded from summary money totals.

## Frontend integration

The API allows the Vite development origin `http://localhost:5173` through CORS. Set the frontend environment variable to the API base URL:

```env
VITE_API_BASE_URL=http://localhost:5205
```

The API serializes registration enums as strings and returns the shared JSON contract defined in the course requirements.

## Manual testing

Use `Api/Api.http` with a compatible REST client, or send requests through Scalar. The request file includes create, validation, duplicate plate, filtering, paging, get-by-ID, and summary scenarios.
