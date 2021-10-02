
document.addEventListener("DOMContentLoaded", init);


var id = null;

function init() {
    const myWs = new WebSocket('ws://localhost:9000');
    console.log("Loaded")

    document.getElementById('input').addEventListener("keypress", (e) => {
        if (e.code == 'Enter') {
            let val = e.target.value;
            e.target.value = null;
            console.log(val);
            const data = {
                client_id: id,
                client_message: val
            };
            myWs.send(JSON.stringify({action: 'client_send_message', data}));    
        }
    });

    window.addEventListener("message", (e) => e.data ? id = e.data : id = null);
}