// setup in client

const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container');
var audio = new Audio('sound.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    } 
        
}
let name;
do {
    
    name = prompt("Enter your name to join");
} while (!name);
 
// send to server
socket.emit('new-user-joined',name);

// send to client
socket.on('user-joined',name =>{
    append(name+ ' joined the Chat','right');
});

socket.on('receive',data =>{
    append(data.name +':'+data.message,'left')
})


socket.on('left',name=>{
    append(name+' left the chat','left')
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append('You:'+message,'right');
    socket.emit('send',message);
    messageInput.value='';
    

});