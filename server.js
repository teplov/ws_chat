const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: process.env.PORT || 9000 });

const onConnect = (wsClient) => {
    console.log('Новый пользователь');
    // отправка приветственного сообщения клиенту
    wsClient.send('Привет');
    wsClient.on('message', (message) => {
        try {
            // сообщение пришло текстом, нужно конвертировать в JSON-формат
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'client_send_message':
                    console.log(jsonMessage.data);
                    break;
                default:
                    console.log('Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ошибка', error);
        }
    });
    wsClient.on('close', () => {
        // отправка уведомления в консоль
        console.log('Пользователь отключился');
    });
};

wsServer.on('connection', onConnect);

console.log('Сервер запущен на 9000 порту');