const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const path = require('path')

const namespaces = []
const games = []

const Namespace  = require('./models/namespace')
const Player = require('./models/data').Player
const Game = require('./models/data').Game


const PORT = process.env.PORT || 5000

const app = express();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())

app.get('/data',(req,res,next) => {
    const token = req.query.token;

    let currentGame = null

    for(let i = 0; i < games.length;i++){
        if(games[i].id == token){
            currentGame = games[i];
            break;
        }
    }

    return res.json({data : currentGame.players})
})

app.post('/check-token',(req,res) => {
    const token = req.body.token;

    for(let i=0;i<namespaces.length;i++){
        if(namespaces[i].name == token) return res.json("true")
    }

    return res.json("false");
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const server = app.listen(PORT,() => {
    console.log("server started on " + PORT)
})


setInterval(() => {
    namespaces.forEach(namespace => {
       
        let id = namespace.name;
        let currentGame = null;
        for(let i = 0; i <games.length;i++){
           
            if(games[i].id == id){
                currentGame = games[i];
            }
        }

        io.of(`/${id}`).emit('playersLength',{length : currentGame.players.length})
    })
},250)

const io = socket(server)

app.post('/add',(req,res,next) => {
    let token = req.body.token
    let width = req.body.width
    let x1 = req.body.x;
    let y1 = req.body.y;

    namespaces.push(new Namespace(token))

    //let playerAdded = true
    const newGame = new Game(token,width,x1,y1);
    games.push(newGame)

   
    io.of(`/${token}`).on('connection',(socket) => {
        let currentGame = null;

        for(let i = 0; i < games.length;i++){
            if(games[i].id == token){
                currentGame = games[i];
                break;
            }
        }
    

        let len = currentGame.players.length;

        if(len == 0){
            currentGame.players.push(new Player(0,100,100,10,0,"RED",true));
        }else{
            currentGame.players.push(new Player(currentGame.width-10,100,100,10,0,"BLUE",false));
        }
      

        socket.on('setSpeed',(data) => {
            socket.broadcast.emit('setSpeed',{data : data})
        })

        socket.on('startGame',(d) => {
            console.log(d.gameMode)
            socket.emit('startGameSignal',{gameMode : d.gameMode});
            socket.broadcast.emit('startGameSignal',{data: d})
        })


        socket.on('disconnect',() => {
            console.log("player has disconnected")
            socket.broadcast.emit('dis',{data : "players has disconnceted"})
        })


        socket.on('getPlayerData',(data) => {
            
            let token = data.token;

            let currentGame = null;

            for(let i = 0; i < games.length;i++){
                if(games[i].id == token){
                    currentGame = games[i];
                    break;
                }
            }

            //console.log(data.ball)
            
            if(data.firstPlayer){
                currentGame.players[0] = data.player
                currentGame.ball = data.ball
                currentGame.background = data.background
            }else{
                currentGame.players[1] = data.player
                currentGame.ball = data.ball
                currentGame.background = data.background
            }

            currentGame.players[0].score = data.score0;
            currentGame.players[1].score = data.score1;
            

            socket.emit('playersFromServer',{players : currentGame.players,ball:currentGame.ball,background : currentGame.background,score0:currentGame.players[0].score,score1:currentGame.players[1].score})
            socket.broadcast.emit('playersFromServer',{players : currentGame.players,ball:currentGame.ball,background : currentGame.background,score0:currentGame.players[0].score,score1:currentGame.players[1].score })
        })
        

       socket.on('tick',(data) => {

            let token = data.token;

            let currentGame = null;

            for(let i = 0; i < games.length;i++){
                if(games[i].id == token){
                    currentGame = games[i];
                    break;
                }
            }

            if(data.firstPlayer){
                currentGame.players[0] = data.players[0];
            }else{
                currentGame.players[1] = data.players[1];
            }
          
           
       })
    
        io.of(`/${token}`).emit("hey","well done")
    })

    

    

    return res.json("dobe")

})






io.of('/').on('connect',(socket) => {
    console.log("id is" , socket.id)
    socket.emit('dataFromServer',{text:"Hello there"})
    socket.on('dataToServer',(data) => {
        console.log(data)
    })
})
