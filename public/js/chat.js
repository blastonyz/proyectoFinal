const socket = io();

const formChat = document.getElementById('chat-form');
formChat.addEventListener('submit', (even) =>{
    even.preventDefault();
    const inputUser = document.getElementById('user-input');
    const user = inputUser.value;
    const inputMessage = document.getElementById('input-message');
    const body = inputMessage.value;

    const message = {
        user,
        body,
    }

    socket.emit('clientMessage', message);
});
//no se renderizan los msj
socket.on('DBmessages', (messages)=>{
    console.log(messages);

    const logMessages = document.getElementById('log-messages');
    messages.forEach(msg => {
        console.log('Processing message:', msg);
        const mssg = document.createElement('p');
        mssg.innerText = `
        ${this.user}
        ${this.body}
        `;
        logMessages.appendChild(mssg);
    });
})
