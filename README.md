This project consists of a React JS frontend and a Node JS backend, with the Node JS server-side application stored in the server folder and the React frontend application stored in the client folder. The server serves data in JSON format, stored in the data folder, while the client fetches and displays this data.

Project Structure
bash
Copy code
/project-root
│
├── /client                 # React JS frontend code
│   ├── /public             # Public assets (index.html, etc.)
│   ├── /src
│   │   ├── /components     # Reusable components 
│   │   ├── /contexts       # React context API for state management
│   │   ├── /hooks          # Custom hooks
│   │   ├── /pages          # Different pages for the app 
│   │   └── /styles         # CSS and styling files
│   └── package.json        # React app dependencies and scripts
│
├── /server                 # Node JS backend code
│   ├── /controllers        # Handles requests and responses (business logic)
│   ├── /data               # User data stored in JSON format
│   ├── /middlewares        # Middleware functions (authentication, etc.)
│   ├── /routes             # API routes and endpoints
│   ├── /utils              # Utility functions (helpers, constants, etc.)
│   ├── server.js           # Entry point for the server (starts the app)
│   └── package.json        # Backend app dependencies and scripts
└── README.md               # Project documentation
Installation
To run this project locally, follow these steps:

1. Clone the repository
bash
git clone https://github.com/jessica-jr206/auth-system.git
cd auth-system

2. Install dependencies for both frontend and backend
a. Install dependencies for the server (Node JS)
Navigate to the server folder:

bash
cd server
Install the required dependencies:

bash
npm install
b. Install dependencies for the client (React JS)
Navigate to the client folder:

bash
cd ../client
Install the required dependencies:

bash
npm install
3. Start the server
Go back to the server folder:

bash
Copy code
cd ../server
Start the server:

bash
npm start
The backend should now be running on http://localhost:5000 (or another port defined in server.js).

4. Start the React frontend
Navigate to the client folder if you are not there already:

bash
cd ../client
Start the React development server:

bash
npm start
The frontend should now be running on http://localhost:3000.

Folder Structure Overview
Server Folder
/controllers: Contains the logic for handling incoming requests and responses. Each controller typically handles a specific resource (e.g., users, products).

/data: Contains JSON files that store user data. These files are accessed by the backend to simulate data storage.

/middlewares: Includes middleware functions, such as authentication or logging, to handle requests before they reach the route handlers.

/routes: Defines API endpoints and routes. Each route points to a controller function that handles the corresponding request.

/utils: A utility folder for reusable helper functions or constants used throughout the backend.

Client Folder
/components: Contains reusable React components (e.g., Buttons, Form Inputs).

/contexts: Includes React Context API providers and consumers for global state management.

/hooks: Custom React hooks to encapsulate logic that can be reused across components.

/pages: Contains different pages in the React app (e.g., Home, About).

/styles: Global and page-specific styles (CSS/SCSS files).

API Endpoints
GET /api/users
Fetches all users from the backend.

POST /api/users
Adds a new user to the server.

Notes
The frontend (React) uses fetch or axios to send requests to the backend server.
The backend (Node JS) reads and writes user data from/to the JSON files in the /data folder, simulating a database.
You can modify the contents of the data folder to simulate different states of the application.