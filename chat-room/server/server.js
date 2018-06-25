var net = require("net");
const server = net.createServer();
var clients = {};//{uid: {client: socket,userName: name}}
var uidCount = 0;

//服务器会根据用户消息返回init,chat,log,logout四种消息

function analysisMsg(client,clientMsg){
    var msg = JSON.parse(clientMsg);
    switch(msg.state){
    case "init":        
        let uid = "id" + uidCount;//新用户id
        initMsg(uid,client,msg);//新加入客户端
        logMsg(uid,msg);//发送新用户上线消息
        uidCount++;
        break;
    case "chat":
        chatMsg(msg);
        break;
    case "logout":
        logoutMsg(msg);
        delete clients[msg.uid];
        break;
    }
}

server.on('connection',(socket)=>{
    socket.on("data",(data)=>{
        var clientMsg = data.toString();
        analysisMsg(socket,clientMsg);
    })

    socket.on("end",()=>{
        console.log("client disconnected");
        socket.destroy();
    })
})

server.on("close",()=>{
    console.log("server closed");
});

server.on("error",(err)=>{
    console.log(err);
})

server.listen(3003,()=>{
    console.log("TCP server port 3003");
});


function initMsg(uid,client,msg){//新加入聊天室
    clients[uid] = {
        client: client,
        userName: msg.name
    }
    server.getConnections((err,counts)=>{//返回在线人数和uid
        if(err) return console.log(err);
        let newClientMsg = {
            state:"init",
            uid: uid,
            uNum:counts
        };
        client.write(JSON.stringify(newClientMsg));//客户端登录成功向客户端返回uid
    });
}

function logMsg(uid,msg){//向其他在线客户端发送新用户上线消息
    let logMsg = {
        state: 'log',
        name: msg.name
    }
    for(var key in clients){
        if(key!=uid){
            clients[key].client.write(JSON.stringify(logMsg));
        }
    }
}

function logoutMsg(msg){//向其他在线客户端发送登出消息
    let logoutMsg = {
        state: "logout",
        name: clients[msg.uid].userName
    }
    for(var key in clients){
        if(key!=msg.uid){
            clients[key].client.write(JSON.stringify(logoutMsg));
        }
    }
}

function chatMsg(msg){//向其他在线客户端发送新聊天消息
    let chatMsg = {
        state: 'chat',
        name: clients[msg.uid].userName,
        content: msg.content 
    }
    for(var key in clients){
        if(key!=msg.uid){
            clients[key].client.write(JSON.stringify(chatMsg));
        }
    }
}

