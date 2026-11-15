# Car Show Registration System — Frontend Dashboard

A modern, responsive, and accessible React dashboard for the **Car Show 2027 Registration Management System** (AutoVista Events at the Sorsogon City Coliseum). Designed with a warm cream and soft periwinkle palette inspired by Canva presentation design principles and connected to a C# / .NET 10 Minimal API backend.

---

## 🎨 Visual Design & Theme Palette

The dashboard UI follows a clean, modern aesthetic inspired by the Canva portfolio presentation design:
- **Canvas / Background:** Warm cream / off-white (`#FAF8F5` / `#F8F7F4`) providing a soft, elevated backdrop.
- **Card Surfaces:** Crisp elevated white (`#FFFFFF`) cards with soft borders (`#EBEAF8`) and subtle multi-layer drop shadows (`shadow-card`).
- **Brand Accent:** Soft periwinkle and lavender-indigo (`#7A78C9` / `#8583D6`) for brand headings, active pagination controls, primary buttons, and hover highlights (`#EBEAF8`).
- **Typography:** Humanist geometric sans-serif font stack (**Plus Jakarta Sans** via Google Fonts) with high-contrast slate headers (`#23232F`), muted cool gray secondary labels (`#6B6B7B`), and right-aligned Philippine Peso formatted currency (`₱X,XXX.XX`).
- **Semantic Badges:**
  - **Payment Status:**
    - `Paid`: Emerald Green (`bg-emerald-50`, `text-emerald-800`, `border-emerald-200`)
    - `Partial`: Amber / Gold (`bg-amber-50`, `text-amber-800`, `border-amber-200`)
    - `Unpaid`: Rose Red (`bg-rose-50`, `text-rose-800`, `border-rose-200`)
  - **Registration Status:**
    - `Pending`: Warm Amber (`bg-amber-50`, `text-amber-800`)
    - `Confirmed`: Soft Periwinkle (`bg-brand-50`, `text-brand-700`)
    - `CheckedIn`: Fresh Teal (`bg-teal-50`, `text-teal-800`)
    - `Cancelled`: Muted Slate (`bg-slate-100`, `text-slate-600`)

---

## 🔌 Switching Between Live C# API and Sample Data

The dashboard supports two data modes:
1. **Live C# .NET Minimal API** (`http://localhost:5205`) — **Default active mode**
2. **Offline Sample Data** (`sample-data.js`) — 25 realistic seeded participants for standalone offline testing without a running backend.

### How to Toggle Data Providers

Open [`src/pages/RegistrationsPage.jsx`](src/pages/RegistrationsPage.jsx) and edit lines 15–16:

#### Option A: Live C# API (Default)
```javascript
// Connected to C# .NET Minimal API (http://localhost:5205)
import { getRegistrations, getSummary } from "../api/registrationsApi";
```

#### Option B: Offline Sample Data
```javascript
// Standalone offline testing using 25 realistic sample registrations
import { getRegistrations, getSummary } from "../api/sample-data";
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24+ recommended)
- **npm**: v9.0.0 or higher
- **.NET SDK**: 10.0+ (if running the backend API)

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Configuration
The application reads the API base URL from `.env.development`:
```ini
VITE_API_BASE_URL=http://localhost:5205
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Running the Backend API (Optional for Live Mode)
In a separate terminal window:
```bash
cd backend/Api
dotnet run
```
The C# Minimal API will start on `http://localhost:5205` with Scalar API documentation available at `http://localhost:5205/scalar/v1`.

### 6. Production Build & Linting
```bash
# Type check and lint code with oxlint
npm run lint

# Compile production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture & Components

```
frontend/
├── .env.development              # Development environment variables (VITE_API_BASE_URL)
├── .env.example                  # Template environment file
├── index.html                    # HTML entry point with Plus Jakarta Sans fonts
├── package.json                  # Dependencies & npm scripts
├── postcss.config.js             # PostCSS plugins (Tailwind CSS, Autoprefixer)
├── tailwind.config.js            # Custom design system colors, shadows & fonts
├── src/
│   ├── main.jsx                  # React DOM root entry
│   ├── App.jsx                   # Application layout, navigation header & footer
│   ├── index.css                 # Base Tailwind styles & custom scrollbars
│   ├── api/
│   │   ├── registrationsApi.js   # Real fetch client for /api/registrations & /api/registrations/summary
│   │   └── sample-data.js        # 25 realistic sample entries with client-side query & summary logic
│   ├── components/
│   │   ├── KpiCard.jsx           # Individual KPI metric card
│   │   ├── KpiCards.jsx          # 5-column responsive KPI metric grid
│   │   ├── RegistrationFilters.jsx # Debounced search, Type & Status dropdowns, clear button
│   │   ├── RegistrationTable.jsx # Responsive table with fee, date, vehicle & participant info
│   │   ├── Pagination.jsx        # Showing X-Y of N, page-size selector, numbered page buttons
│   │   ├── StatusBadge.jsx       # Accessible pill badge for Pending, Confirmed, CheckedIn, Cancelled
│   │   └── PaymentBadge.jsx      # Accessible pill badge for Paid, Partial, Unpaid
│   ├── hooks/
│   │   └── useDebounce.js        # ~400ms debounce hook for participant search
│   ├── pages/
│   │   └── RegistrationsPage.jsx # Root dashboard view with loading, empty, and error states
│   └── utils/
│       └── formatters.js         # Currency (PHP ₱), number, and date formatting utilities
```

---

## 📡 API Contract Parity

The frontend adheres strictly to the C# backend JSON contract without renaming any properties:

### 1. `GET /api/registrations`
**Query Parameters:**
- `participantName` (optional string): Case-insensitive participant name search
- `type` (optional string): `Exhibitor` | `Competitor` | `VIP`
- `status` (optional string): `Pending` | `Confirmed` | `CheckedIn` | `Cancelled`
- `page` (optional integer, default `1`): Current page index
- `pageSize` (optional integer, default `10`): Items per page

**Response:**
```json
{
  "items": [
    {
      "id": "3f2c9a1e-1111-4000-8000-000000000001",
      "registrationNumber": "CS27-0001",
      "registrationDate": "2027-02-10T08:30:00Z",
      "participantName": "Juan Dela Cruz",
      "contactNumber": "09171234567",
      "email": "juan@example.com",
      "address": "123 Rizal St., Naga City",
      "carMakeModel": "Toyota Supra MK4",
      "plateNumber": "ABC 1234",
      "registrationType": "Competitor",
      "status": "Confirmed",
      "registrationFee": 2500.00,
      "amountPaid": 1000.00,
      "paymentStatus": "Partial"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "totalCount": 25,
  "totalPages": 3
}
```

### 2. `GET /api/registrations/summary`
**Response:**
```json
{
  "totalRegistrations": 25,
  "confirmed": 12,
  "checkedIn": 5,
  "pending": 6,
  "cancelled": 2,
  "totalFees": 50000.00,
  "totalPayments": 35000.00,
  "uncollectedPayments": 15000.00
}
```

---

## 👥 Authors & Collaboration
- **Frontend Lead**: `jasarenojoy5-collab` (`jasarenojoy5@gmail.com`)
- **Backend & Core**: `stephaniefaithvergara-cmd`
