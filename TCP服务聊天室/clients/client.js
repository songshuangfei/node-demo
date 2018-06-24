var net = require("net");
const cout = process.stdout;
const cin = process.stdin;

var client = null;
var userInfo = {
    name: null,
    uid: null
}


cout.write(`请输入昵称：`);
//监听命令行输入
cin.on('data',(chunk)=>{
    let temp = chunk.toString();
    var input = (chunk+'').replace(/[\r\n]/ig,"");//替换输入的无效内容
    if(input.length!=0){//输入内容不为空
        if(client === null){
            userInfo.name = input;
            createClient();
        }else{
            client.write(JSON.stringify({
                state: 'chat',
                content: input,
                uid: userInfo.uid
            }));
            //如果输入是exit或quit则断开连接并退出
            if(input == 'OUT'){
                client.write(JSON.stringify({
                    state: "logout",
                    uid: userInfo.uid
                }))
                client.end();
                // cin.end();
                return;
            }
            cout.write(`自己：${input}\n\r`);
        }
    }
});


function createClient(){
    client = new net.Socket();

    client.on("data",(data)=>{
        var smsg = data.toString();
        analysisMsg(smsg);
    });

    client.on('end', () => {
        cout.write(`与服务器断开连接.\n`);
    });

    client.connect(3003,"127.0.0.1",()=>{
        let msg = {
            state: "init",
            name: userInfo.name
        }
        client.write(JSON.stringify(msg));
        cout.write(`${userInfo.name}进入聊天室\n`);
        cout.write(`可以输入聊天信息，回车发送，输入大写的"OUT"退出\n`);
    });
}

function analysisMsg(smsg){
    var msg = JSON.parse(smsg);
    switch(msg.state){
    case "init":
        userInfo.uid = msg.uid;
        console.log(`总共有${msg.uNum}人在线`)
        break;
    case "log":
        cout.write(`[系统]${msg.name}进入聊天室\n`);
        break;
    case "chat":
        cout.write(`${msg.name}说：${msg.content}\n`);
        break;
    case "logout":
        cout.write(`[系统]${msg.name}离开聊天室\n`);
        break;
    default:
        break;
    }
}



