# 📇 Mini CRM

A minimal **Customer Relationship Management (CRM)** system designed for entrepreneurs and small teams to manage their contacts, tasks, and interactions all in one place.

---

## 🚀 Main Features (MVP)

- User authentication with JWT
- Contact (client) management
- Assign and track tasks per contact
- Manual interaction logging
- Dashboard with visual metrics
- Light and dark mode support
- Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend
- HTML
- Modular CSS (per page)
- Vanilla JavaScript (no frameworks)
- Google Fonts
- Responsive design
- Dark mode / Light mode

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Dotenv for configuration

---

## 📁 Project Structure

```
mini-crm/
├── client/
│   ├── css/                # Archivos CSS separados por página (modular)
│   │   ├── login.css
│   │   ├── dashboard.css
│   │   ├── contacts.css
│   │   └── tasks.css
│   ├── js/                 # Scripts JS por página / módulo
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   ├── contacts.js
│   │   └── tasks.js
│   ├── assets/             # Imágenes, íconos, fuentes, etc.
│   │   ├── logo.png
│   │   └── ...
│   ├── index.html          # Landing o redirect
│   ├── login.html
│   ├── dashboard.html
│   ├── contacts.html
│   └── tasks.html
│
├── api/
│   ├── config/             # Configuración general (DB, JWT, etc.)
│   │   └── db.js
│   ├── controllers/        # Lógica que responde a los endpoints
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── taskController.js
│   │   └── interactionController.js
│   ├── services/           # Capa de servicios con lógica de negocio
│   │   ├── authService.js
│   │   ├── contactService.js
│   │   └── taskService.js
│   ├── models/             # Modelos de Mongoose (MongoDB)
│   │   ├── User.js
│   │   ├── Contact.js
│   │   ├── Task.js
│   │   └── Interaction.js
│   ├── routes/             # Rutas (API endpoints)
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── taskRoutes.js
│   │   └── interactionRoutes.js
│   ├── middleware/         # Middlewares (auth, error handler, etc.)
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── server.js           # Entry point del backend
│   ├── .env                # Variables de entorno
│   └── package.json        # Configuración y dependencias del backend
│
└── README.md               # Documentación del proyecto
```

---

## ⚙️ Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `api` folder with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/mini-crm
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CORS_ORIGIN=http://localhost:5500
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to the client folder:**
   ```bash
   cd client
   ```

2. **Serve the frontend:**
   You can use any static file server. For example:
   ```bash
   # Using Python (if installed)
   python -m http.server 5500
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 5500
   
   # Using Live Server extension in VS Code
   # Right-click on index.html and select "Open with Live Server"
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:5500`

---

## 📚 Backend API Documentation

_This section will include all available backend API endpoints: routes, HTTP methods, sample request/response, etc._

---

## 🎨 Visual Design Guidelines

_This section will document the color palette, chosen font, UI/UX design per page, and dark/light mode behavior._

---

## 🧑‍💻 Author

Developed by [Emanuel Saucedo](https://github.com/emanuelSaucedo)