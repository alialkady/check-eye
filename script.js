const socket = io("http://localhost:3000")
const messageContainer = document.getElementById("message-container")
const messageform = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")
const name = prompt("what's your name")
appendMessage("you joined")
socket.emit("new-user", name)
socket.on("chat-message", data => {
appendMessage(`${data.name}: ${data.message}`)
})
socket.on("user-connected", name => {
appendMessage(`${name} connected`)
})
socket.on("user-disconnected", name => {
appendMessage(`${name} disconnected `)
})
messageform.addEventListener("submit", e => {
e.preventDefault()
const message = messageInput.value
appendMessage(`You: ${message}`)
socket.emit("send-chat-message", message)
messageInput.value= ""
})
function appendMessage(message){
const messageElement = document.createElement("div")
messageElement.innerText = message
messageContainer.append(messageElement)
}
