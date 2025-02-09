# Restaurant App

This project is a full-stack application for restaurants, designed to allow customers to browse menus, make reservations, and manage their profiles, while also providing tools for administrators to manage restaurant operations.

---

## ✨ Features

### Frontend

- **Dynamic Menu**: Displays categorized menu items.
- **Reservation Form**: Allows users to book tables online.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Admin Panel**: For managing reservations and menu.

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
- [React](https://reactjs.org/) (v19.0.0)
- [Tailwind CSS](https://tailwindcss.com/) (v3.4.17)
- [TypeScript](https://www.typescriptlang.org/) (v5)
- [Framer Motion](https://www.framer.com/motion/) (v11.15.0) - Animations
- [Zod](https://zod.dev/) (v3.24.1) - Schema validation
- [React Query](https://tanstack.com/query/latest) (v5.62.11) - Data fetching and caching
- [NextAuth.js](https://next-auth.js.org/) (v4.24.11) - Authentication
- [Radix UI](https://www.radix-ui.com/) - UI components (Select, Toast, Popover, etc.)
- [Lucide Icons](https://lucide.dev/) (v0.469.0) - Icon library
- [Sonner](https://sonner.dev/) (v1.7.1) - Toast notifications
- [Class Variance Authority](https://cva.style/) (v0.7.1) - Variant-based styling

### Backend

- [Express.js](https://expressjs.com/) (v4.21.2)
- [PostgreSQL](https://www.postgresql.org/) with [Sequelize](https://sequelize.org/) ORM (v6.37.1)
- [JWT](https://jwt.io/) (v9.0.2) - Authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (v5.1.1) - Password hashing
- [Dotenv](https://github.com/motdotla/dotenv) (v16.4.7) - Environment configuration
- [Node-Cache](https://github.com/node-cache/node-cache) (v5.1.2) - Caching
- [Nodemailer](https://nodemailer.com/) (v6.10.0) - Email handling
- [Zod](https://zod.dev/) (v3.24.1) - Schema validation
- [CORS](https://github.com/expressjs/cors) (v2.8.5) - Cross-origin resource sharing

### Development & Tooling

- [ESLint](https://eslint.org/) (v9.17.0) - Code linting
- [Prettier](https://prettier.io/) (v3.4.2) - Code formatting
- [Jest](https://jestjs.io/) (v29.7.0) - Testing framework
- [Supertest](https://github.com/ladjs/supertest) (v7.0.0) - HTTP testing
- [TS-Node](https://typestrong.org/ts-node/) (v10.9.2) - Run TypeScript directly
- [Nodemon](https://nodemon.io/) (v3.1.0) - Auto-reloading for development
- [Sequelize CLI](https://sequelize.org/docs/v6/other-topics/migrations/) (v6.6.2) - Database migrations
- [Docker](https://www.docker.com/) - Containerization

### Dockerized Setup

- **Frontend**: Runs Next.js with Tailwind CSS in an isolated container.
- **Backend**: Node.js with PostgreSQL for data handling and APIs.
- **PostgreSQL Database**: Pre-configured using Docker Compose.

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

2. Create the `.env` files in the different directories for environment variables;

# ==============================
# 🌐 Frontend Environment Variables
# Path: /frontend/.env
# ==============================

NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Google Maps API Key
GOOGLE_MAPS_API_KEY=https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.347345280471!2d-4.43984538795598!3d36.71421837215608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f79dc085d749%3A0x9bebfdf2d91da2b5!2sMes%C3%B3n%20Astorga!5e0!3m2!1ses!2ses!4v1735598117900!5m2!1ses!2ses

# ==============================
# 🛠️ Backend Environment Variables
# Path: /backend/.env
# ==============================

NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=restaurant_admin
DB_PASSWORD=A!dminP@ss123
DB_NAME=restaurant

# Authentication
JWT_SECRET=OXT3in&u&+B9P.K%4ti!>1Ot*£F_<Z~n1SO60X*nh6U8pqD&
ADMIN_PASSWORD=v4vhyZ2ybBKp*yL*2%F22nrq40c^BKE!HNkkLkgyNq5VKVVy

# Email Configuration
EMAIL_USER=guillermoastorgacalvo@gmail.com
EMAIL_PASSWORD=pqee kfsy ydcd eglj
EMAIL_SERVICE=gmail

# ==============================
# 🐳 Root Environment Variables (Docker Compose)
# Path: /.env
# ==============================

NODE_ENV=development

# PostgreSQL Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=restaurant_admin
DB_PASSWORD=A!dminP@ss123
DB_NAME=restaurant

# Docker Switch
BACKEND_COMMAND=npm run dev
FRONTEND_COMMAND=npm run dev


3. Build and run the containers:

   ```bash
   docker:dev
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
