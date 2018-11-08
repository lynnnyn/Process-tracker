## Nodejs Process Tracker for Python Tasks

### Set up Datebase(Redis)
docker-compose up

### Build

    npm install
    cd Worker
    node worker.js
open a new terminal:

    cd Server
    node server.js
    
the website will run in 0.0.0.0:3000

terminate server: Crtl+C

Start again:

    node worker.js

### Tech Stack
   * Node.js
   * socket.io
   * express
   * Redis
   
