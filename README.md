// create root folder
- mkdir MERN-eCommerce

{/* FRONTEND */} create frontend
- npx create-react-app frontend
- cd frontend
- rm -rf .git

// initiate git repository for the root directory
- cd ..
- git init

// install libraries
- npm i react-bootstrap bootstrap react-icons
- npm i react-router-bootstrap
- npm i react-router-dom
- npm i axios


/* BACKEND */ in the root
- npm init + continue
- npm i express
- add "type": "module" in package.json,
- add "start": "node backend/server.js" in the scripts in package.json
- npm start // start the server

- npm i -D nodemon concurrently
// add scripts in the root package.json for development and run concurrently backend and frontend:
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
- npm run server
- npm run client
- npm i -D dotenv

- npm i mongoose
