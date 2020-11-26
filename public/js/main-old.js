const chatForm      = document.getElementById('chat-form');
const chatMessages  = document.querySelector('.chat-messages');
const roomName      = document.getElementById('room-name');
const roomUsers     = document.getElementById('users');

/**
 * Output new message
 * @param string message 
 * 
 * @return void
 */
function outputMessage(message) 
{  
  var div   = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                    <p class="text">${message.text}</p>
                  `
  chatMessages.append(div);
}

/**
 * Output Room Name
 * @param string room
 * 
 * @return void
 */
function outputRoomName(room) 
{  
  roomName.innerText  = room;
}

/**
 * Output Room users
 * @param array users 
 * 
 * @return void
 */
function outputRoomUsers(users) 
{
  console.log(users);
  roomUsers.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}



const socket = io();

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit('joinRoom', {username, room});


// get message form server
socket.on('message', message => {
  // console.log(message);
  outputMessage(message);
});

// get room info
socket.on('roomInfo', info => {
  outputRoomName(info.roomName);
  outputRoomUsers(info.roomUsers);
  // console.log(info);  
});



// submit message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get message txt
  var message = e.target.elements. msg.value;
  
  // send the message to the server
  socket.emit('chatMessage', message);
  
  // focus on the last message
  chatMessages.scrollTop  = chatMessages.scrollHeight + 150;

  // delete input value
  e.target.elements. msg.value  = '';
  e.target.elements. msg.focus();

  // console.log(msg);
});