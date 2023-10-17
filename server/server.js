const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;


// I'm maintaining all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', function(connection) {
    try{
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log(`Recieved a new connection.`);

    // Store the new connection and handle messages
    clients[userId] = connection;

    console.log(`${userId} connected.`);
        // Gérer les messages entrants
        connection.on('message', function (message) {
            // Vous pouvez traiter le message ici et envoyer une réponse si nécessaire
            console.log(`Message reçu de ${userId}: ${message}`);

            // Par exemple, pour renvoyer le message à tous les clients connectés :
            Object.values(clients).forEach(client => {
                client.send(`${userId}: ${message}`);
            });
        });

        // Gérer la fermeture de la connexion
        connection.on('close', function () {
            console.log(`Connexion fermée pour ${userId}`);
            delete clients[userId];
        });
    }
    catch (e) {
        console.log(e)
    }

});


// This is called when the server receives a message from a connected client


server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});