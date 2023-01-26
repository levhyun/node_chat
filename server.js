const path = require('path')
const express = require('express')
const app = express()
const SocketIO = require('socket.io')
var os = require('os');

app.use((express.static(path.join(__dirname, "public"))))


app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () =>{
    console.log("server address:", "http://" + getIp() + ":" + app.get("port"));
})

const io = SocketIO(server);

// root
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"));
})

io.on('connection', (socket)=>{
    socket.on("message", (data)=>{
        socket.broadcast.emit("message", data)
    })
})

function getIp() {
    var ifaces = os.networkInterfaces();
    var ip = '';
    for (var dev in ifaces) {
        var alias = 0;
        ifaces[dev].forEach(function(details) {
            if (details.family == 'IPv4' && details.internal === false) {
                ip = details.address;
                ++alias;
            }
        });
    }
    return ip;
}