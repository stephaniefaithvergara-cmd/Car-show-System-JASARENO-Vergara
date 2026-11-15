# Car Show 2027 Registration Management System

Test Project for Integrative Programming 2 / API Backend Development  
Computer Communication Development Institute (CCDI) – Sorsogon Campus  
Host: AutoVista Events — "Car Show 2027" at Sorsogon City Coliseum  

---

## 👥 Project Team & Roles

| Member | Role | Responsibilities |
|---|---|---|
| **Stephanie Faith Vergara** (`stephaniefaithvergara-cmd`) | **Backend Developer** | C# .NET 10 Minimal API, Vertical Slice Architecture, EF Core, SQLite persistence, data validation, seeding, business rules & API tests |
| **Joy Jasareno** (`jasarenojoy5-collab`) | **Frontend Developer** | React + Vite + Tailwind CSS dashboard, API integration, KPI cards, registration table, filters, pagination, badges & error states |

---

## 📁 Repository Layout

```text
Car-show-System-JASARENO-Vergara/
├── backend/                  # C# .NET 10 Vertical Slice Architecture Solution
│   ├── Api/                  # Minimal API endpoints, Scalar OpenAPI, filters, Program.cs, Api.http
│   ├── Application/          # Feature slices (Commands, Queries, Handlers, FluentValidation)
│   ├── Domain/               # Registration entity, enums, Result pattern, Domain models
│   ├── Infrastructure/       # EF Core SQLite AppDbContext, Migrations, DbSeeder (25 registrations)
│   ├── VerticalSlice.slnx    # .NET Solution file
│   └── README.md             # Backend-specific architecture & developer documentation
├── frontend/                 # React 18 + Vite + Tailwind CSS Single-Page Application
│   ├── src/                  # React components, pages, hooks, API client
│   └── package.json          # Frontend dependencies & scripts
├── docs/                     # Project documentation & guidelines
├── screenshots/              # System execution, API tests, and UI screenshots
├── .gitignore                # Root gitignore (excludes bin/, obj/, .vs/, node_modules/, dist/, *.db)
└── README.md                 # Root documentation (team, roles, setup instructions)
```

---

## 🚗 Domain & Business Rules

The system manages participant registrations across three categories:
1. **Exhibitor** — Registration fee: **₱1,500.00**
2. **Competitor** — Registration fee: **₱2,500.00**
3. **VIP** — Registration fee: **₱5,000.00**

### Registration Entity (12 Fields):
1. `RegistrationNumber`: Auto-generated sequential format (`CS27-0001`, `CS27-0002`, ...)
2. `RegistrationDate`: Automatically assigned by server in UTC upon creation
3. `ParticipantName`: Required, max 150 characters
4. `ContactNumber`: Required, Philippine mobile number format `09XXXXXXXXX` (11 digits)
5. `Email`: Required, valid email format, max 200 characters
6. `Address`: Required, max 300 characters
7. `CarMakeModel`: Required, max 100 characters (e.g. *Toyota Supra MK4*)
8. `PlateNumber`: Required, max 15 characters, unique (one car = one registration)
9. `RegistrationType`: Enum (`Exhibitor`, `Competitor`, `VIP`)
10. `Status`: Enum (`Pending`, `Confirmed`, `CheckedIn`, `Cancelled`), default: `Pending`
11. `RegistrationFee`: Automatically set by the server from the chosen type
12. `AmountPaid`: Amount between `0.00` and the registration fee

### Computed Payment Status:
- `Unpaid`: `AmountPaid == 0`
- `Partial`: `0 < AmountPaid < RegistrationFee`
- `Paid`: `AmountPaid == RegistrationFee`

---

## 🛠️ Technology Stack

- **Backend:** C# .NET 10 Minimal APIs, Entity Framework Core 10, SQLite
- **Validation:** FluentValidation 11
- **API Documentation:** OpenAPI with Scalar interactive UI (`/scalar/v1`)
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React icons
- **Architecture:** Vertical Slice Architecture (Feature-driven commands & queries)

---

## 🚀 Getting Started & How to Run

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher) & npm

### 1. Running the Backend API
```bash
# Navigate to the backend directory
cd backend

# Restore and build the solution
dotnet restore
dotnet build

# Run the API application
dotnet run --project Api
```
- The backend API runs at: `http://localhost:5205`
- Interactive API Documentation (Scalar): `http://localhost:5205/scalar/v1`
- OpenAPI Specification: `http://localhost:5205/openapi/v1.json`
- SQLite database (`carshow.db`) automatically migrates and seeds 25 registrations on startup.

### 2. Running the Frontend Dashboard
```bash
# In a separate terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
- The frontend UI runs at: `http://localhost:5173`
- Pre-configured to communicate with backend at `http://localhost:5205/api/registrations`.

---

## 📡 API Endpoints Specification

All endpoints are grouped under `/api/registrations`:

| Method | Endpoint | Description | Success | Error Codes |
|---|---|---|---|---|
| `POST` | `/api/registrations` | Create a new registration | `201 Created` | `400 Bad Request`, `409 Conflict` |
| `GET` | `/api/registrations` | List registrations (supports pagination & filters) | `200 OK` | `400 Bad Request` |
| `GET` | `/api/registrations/{id:guid}` | Retrieve registration by GUID ID | `200 OK` | `404 Not Found` |
| `GET` | `/api/registrations/summary` | Dashboard KPI summary totals | `200 OK` | — |

### Query Parameters for `GET /api/registrations`:
- `participantName` (optional): Case-insensitive contains search (max 150 chars)
- `type` (optional): `Exhibitor`, `Competitor`, or `VIP`
- `status` (optional): `Pending`, `Confirmed`, `CheckedIn`, or `Cancelled`
- `page` (optional): Page number, default `1` (minimum `1`)
- `pageSize` (optional): Page size, default `10` (range `1` to `50`)
- **Sorting:** Always sorted by `RegistrationDate` descending (newest first).

### Dashboard KPI Summary (`GET /api/registrations/summary`):
Excludes `Cancelled` registrations from all financial totals:
```json
{
  "totalRegistrations": 25,
  "confirmed": 10,
  "checkedIn": 6,
  "pending": 6,
  "cancelled": 3,
  "totalFees": 61500.00,
  "totalPayments": 42000.00,
  "uncollectedPayments": 19500.00
}
```

---

## 🧪 Testing with `Api.http`

All test scenarios from Section 3G of the course specification (Cases 01 through 33/40) are documented in [`backend/Api/Api.http`](file:///D:/ABC-ABFILES-SCHOOL/FinalEXam-SIA_and_IP2/1/vergra/4/Car-show-System-JASARENO-Vergara/backend/Api/Api.http) for instant execution in VS Code REST Client or Visual Studio.
