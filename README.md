# Restaurant App

This project is a full-stack application for restaurants, designed to allow customers to browse menus, make reservations, and manage their profiles, while also providing tools for administrators to manage restaurant operations.

---

## ✨ Features

### Frontend

- **Dynamic Menu**: Displays categorized menu items.
- **Reservation Form**: Allows users to book tables online.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **User Panel**: For managing reservations, orders, and favorites (to be implemented).

### Backend

- **User Authentication**: JWT-based secure authentication.
- **Menu Management**: CRUD operations for menu items.
- **Reservation Management**: APIs for handling reservations.
- **Admin Panel Integration**: APIs support frontend admin features.

### Dockerized Setup

- **Frontend**: Runs Next.js with Tailwind CSS in an isolated container.
- **Backend**: Node.js with PostgreSQL for data handling and APIs.
- **PostgreSQL Database**: Pre-configured using Docker Compose.

---

## 🔧 Technologies Used

### Frontend

- [Next.js](https://nextjs.org/) (v15.1.3)
- [React](https://reactjs.org/) (v19)
- [Tailwind CSS](https://tailwindcss.com/) (v3.4.17)
- [TypeScript](https://www.typescriptlang.org/) (v5)

### Backend

- [Express.js](https://expressjs.com/) (v4.21.2)
- [PostgreSQL](https://www.postgresql.org/) with [Sequelize](https://sequelize.org/) ORM
- [JWT](https://jwt.io/) for authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing
- [Dotenv](https://github.com/motdotla/dotenv) for environment configuration

### Deployment

- Docker and Docker Compose
- [Vercel](https://vercel.com/) for frontend deployment
- [Heroku](https://www.heroku.com/) or AWS for backend

---

## 🐳 Dockerized Setup

### Prerequisites

- Install [Docker](https://www.docker.com/).
- Install [Docker Compose](https://docs.docker.com/compose/).

### Steps to Run the Application

1. Clone the repository:

   ```bash
   git clone https://github.com/GuillermoAstorgaCalvo/restaurant-app.git
   cd restaurant-app
   ```

2. Create a `.env` file in the root directory for environment variables. Example for backend:

   ```env
   # Backend Configuration
   PORT=3001
   DATABASE_URL=postgres://postgres:postgres@db:5432/restaurant_db
   JWT_SECRET=OXT3in&u&+B9P.K%4ti!>1Ot*£F_<Z~n1SO60X*nh6U8pqD&
   ```

3. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

4. Access the services:

   - **Frontend**: `http://localhost:3000`
   - **Backend**: `http://localhost:3001`

---

## 📂 Project Structure

```
/restaurant-app
├── /frontend/
│   ├── /src/
│   │   ├── /components  # Reusable components
│   │   ├── /pages       # Next.js pages
│   │   ├── /styles      # Global styles
│   │   ├── /context     # Global state management
│   │   └── /public      # Static files
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── tsconfig.json

├── /backend/
│   ├── /src/
│   │   ├── /controllers  # Request handlers
│   │   ├── /models       # Sequelize models
│   │   ├── /routes       # API routes
│   │   ├── /middleware   # Custom middleware
│   │   ├── /services     # Business logic
│   │   ├── /config       # Environment configuration
│   │   └── /database     # Database setup
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── tsconfig.json

├── docker-compose.yml
└── README.md
```

---

## 🔧 Local Development

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the app at `http://localhost:3000`.

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables in `.env` file.

4. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the API at `http://localhost:3001`.

---

## 📜 Scripts

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Backend

- `npm run dev`: Start development server
- `npm run build`: Compile TypeScript
- `npm run start`: Start production server
- `npm run test`: Run tests

---

## 🖌️ License

This project is licensed under the MIT License.
