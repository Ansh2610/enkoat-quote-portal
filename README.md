# EnKoat Quote Portal & Performance Dashboard

A full-stack application that simulates a contractor-facing interface for submitting project quotes and visualizing project performance data for EnKoat's IntelliKoat™ system.

## Project Overview

This application includes:

1. **Contractor Quote Submission Form (Front-End)**
   - A responsive form capturing contractor information and project details
   - Data validation and submission to the backend

2. **REST API + Backend**
   - API endpoints to store and retrieve quote submissions
   - Filtering functionality by state or roof type
   - MongoDB database for data storage

3. **Performance Dashboard**
   - Interactive visualizations of project trends
   - Multiple metrics and charts
   - Filtering capabilities

## Tech Stack

- **Frontend**: React with TypeScript, Material UI, Recharts
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Development Tools**: Vite, Nodemon

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or Atlas connection)
- npm or yarn

### Installation & Setup

1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd enkoat-quote-portal
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Configure environment variables
   - Create a `.env` file in the server directory (see `.env.example`)
   - Create a `.env` file in the client directory (see `.env.example`)

5. Start the development servers

   Backend:
   ```bash
   cd server
   npm run dev
   ```

   Frontend:
   ```bash
   cd client
   npm run dev
   ```

6. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
enkoat-quote-portal/
├── client/                   # Frontend React application
│   ├── public/               # Static files
│   ├── src/                  # Source files
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Entry point
│   ├── package.json          # Dependencies and scripts
│   └── vite.config.ts        # Vite configuration
│
├── server/                   # Backend Node.js application
│   ├── src/                  # Source files
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   └── index.ts          # Entry point
│   ├── package.json          # Dependencies and scripts
│   └── tsconfig.json         # TypeScript configuration
│
└── README.md                 # Project documentation
```

## Features to Implement

1. Contractor Quote Form
   - Form validation
   - Submission to backend
   - Success/error handling

2. REST API
   - CRUD operations for quotes
   - Filtering capabilities
   - Data validation

3. Dashboard
   - Multiple visualization types
   - Interactive filters
   - Summary statistics

## Future Improvements

- User authentication
- PDF report generation
- Email notifications for quote submissions
- Interactive Google Maps integration
- More advanced filtering options

## License

This project is for demonstration purposes as part of the EnKoat job application process.