const { WebSocketServer } = require('ws');

const clientes = new Map();

const iniciarWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {

        ws.on('message', (message) => {
            try {
                const { tokenApp } = JSON.parse(message);

                if (tokenApp) {
                    clientes.set(tokenApp, ws);
                    console.log(`App conectado: ${tokenApp}`);
                    ws.send(JSON.stringify({ status: 'conectado' }));
                }
            } catch (error) {
                console.error('Erro ao processar mensagem WebSocket:', error);
            }
        });

        ws.on('close', () => {
            
            for (const [token, conexao] of clientes.entries()) {
                if (conexao === ws) {
                    clientes.delete(token);
                    console.log(`App desconectado: ${token}`);
                    break;
                }
            }
        });
    });

    console.log('WebSocket server iniciado');
};


const enviarMensagem = (tokenApp, mensagem) => {
    const ws = clientes.get(tokenApp);

    if (!ws) return false; 
    ws.send(JSON.stringify(mensagem));
    return true;
};

module.exports = { iniciarWebSocket, enviarMensagem };