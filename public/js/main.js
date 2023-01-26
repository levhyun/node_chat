const socket = io();
const btnSend = document.getElementById("send-message");
const message = document.getElementById("message-area");
const boxMessages = document.getElementById("chat-box");

btnSend.addEventListener("click", () => {
  if (message.value == "") {
    message.focus();
  } 
  else {
    boxMessages.innerHTML += `
  <div class="chat from-message">
    <div class="detalles">
      <p>${message.value}</p>
    </div>
  </div>
      `;
    scrollBottom();
    socket.emit("message", { msg: message.value });
    message.value = null;
  }
});

function enterkey() {
  keyenter = event.keyCode;
  if (keyenter == 13) {
    btnSend.click();
    scrollBottom();
  }
}
window.onkeydown = enterkey;

function scrollBottom() {
  boxMessages.scrollTop = boxMessages.scrollHeight;
}

socket.on("message", (data) => {
  boxMessages.innerHTML += `
  <div class="chat to-message">
    <div class="detalles">
      <p>${data.msg}</p>
    </div>
  </div>
  `;
  scrollBottom()
});
