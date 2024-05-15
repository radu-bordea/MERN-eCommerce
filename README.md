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


/* BACKEND */ in the root
- npm init + continue
- npm i express
- add "type": "module" in package.json,
- add "start": "node backend/server.js" in the scripts in package.json
- npm start // start the server
