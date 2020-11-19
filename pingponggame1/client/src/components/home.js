import  React  ,  {Component } from 'react'
import socket from './utils/socket';
import io from 'socket.io-client'
import axios from 'axios'
import Video from '../videos/video_stars.mp4'
import { Slide } from 'react-reveal'
import Fade from 'react-reveal/Fade'
import  Modal from './utils/modal'
import VideoWin from '../videos/video4.mp4'
import Imag1 from '../videos/img4.png'


class Home extends Component{

    state = {
        connected : false,
        socketPersonal : null,
        firstPlayer : false,
        secondPlayer : false,
        val : 50,
        player : {
            x : 0,
            y : 0,
            height : 100,
            width : 10,
            score : 0,
            color : "RED"
        },
        players : [{
            x : 0, 
            y : 0,
            width : 10,
            height : 100,
            score : 0,
            color : "BLUE"
        },
        {
            x : 0, 
            y : 0,
            width : 10,
            height : 100,
            score : 0,
            color : "BLUE"

        }], 
       // players : [],
       // playersToServer : [],
        net : {
            x : 0,
            y : 0,
            height : 10,
            width : 2,
            color : "GREEN"
        },
        ball : {
            x : 0,
            y : 0,
            radius : 10,
            velocityX : 5,
            velocityY : 5,
            speed : 15,
            color : "WHITE"
        },

        score0 : 0,
        score1 : 0,
        ctx : null,
        canvas : null,
        startGame : false,
        token : null,
        playersLength : 0,
        showModal : false,
        canDisplayStartButton : false,
        mode : null,
        ballSpeed : 0,
        background : "",
        endGame : false,
        firstTimeEnd : true
        
    }

    componentDidMount(){

        

        let x = document.getElementsByClassName('video')[0]
        setTimeout(() => {
            x.style.opacity = 0.4
        },1800)
        
        
        socket.on('dataFromServer',(data) => {
            console.log(data)
            socket.emit('dataToServer',{text : 'Happy to be connected'})
        })

   /*     const canvas = document.getElementById("pong");
        const ctx = canvas.getContext1('2d');

     //   document.addEventListener('keypress', this.logKey);

        const newComUser = {...this.state.com}
        newComUser.X =  canvas.width - 10;
        newComUser.y =  (canvas.height - 100)/2;

        const newBall = {...this.state.ball}
        newBall.x = canvas.width/2;
        newBall.y = canvas.height/2;

        const newNet = {...this.state.net}
        newNet.x = (canvas.width - 2)/2;

        this.setState({
            com : newComUser,
            ball : newBall,
            net : newNet,
            ctx : ctx,
            canvas : canvas
        }) */

        const canvas = document.querySelector("#pong");
        console.log(canvas)
        const ctx = canvas.getContext('2d');

        canvas.width = Math.max(window.innerWidth/2+400,600);
        canvas.height = Math.max(window.innerHeight/2 + 200,400);

        const newBall = {...this.state.ball}
        newBall.x = canvas.height/2+240;
        newBall.y = canvas.width/2-300;

        if(window.innerWidth < 900){
            canvas.width = Math.max(window.innerWidth/2+200,0);
            canvas.height = Math.max(window.innerHeight/2,0);
            newBall.x = canvas.width/2;
            newBall.y = canvas.height/2;
        }


        const newNet = {...this.state.net}
        newNet.x = (canvas.width - 2)/2;     
        
  /*      const newPlayers = [...this.state.players]
        const new2ndPlayer = {...this.state.players[1]}
        new2ndPlayer.x = canvas.width - 10;
        new2ndPlayer.y = (canvas.height  -100)/2;

        newPlayers[1] = new2ndPlayer */
        
        const newPlayers = {...this.state.players}


        newPlayers[1].x = canvas.width-10;


        this.setState({
            canvas : canvas,
            ctx : ctx,
            net : newNet,
            ball : newBall,
            players : newPlayers
           // players : newPlayers
        },() => {
            this.render1()
        })

        document.addEventListener('keypress',this.keypress)

      /*  const max_fireworks = 5,
  max_sparks = 50;
    let canvas1 = document.getElementById('myCanvas');
    let context1 = canvas.getContext('2d');
    let fireworks = [];
 
    for (let i = 0; i < max_fireworks; i++) {
        let firework = {
        sparks: []
    };
  for (let n = 0; n < max_sparks; n++) {
    let spark = {
      vx: Math.random() * 5 + .5,
      vy: Math.random() * 5 + .5,
      weight: Math.random() * .3 + .03,
      red: Math.floor(Math.random() * 2),
      green: Math.floor(Math.random() * 2),
      blue: Math.floor(Math.random() * 2)
    };
    if (Math.random() > .5) spark.vx = -spark.vx;
    if (Math.random() > .5) spark.vy = -spark.vy;
    firework.sparks.push(spark);
  }
  fireworks.push(firework);
  resetFirework(firework);
}
window.requestAnimationFrame(explode);
 
function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas1.width);
  firework.y = canvas1.height;
  firework.age = 0;
  firework.phase = 'fly';
}
 
function explode() {
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  fireworks.forEach((firework,index) => {
    if (firework.phase == 'explode') {
        firework.sparks.forEach((spark) => {
        for (let i = 0; i < 10; i++) {
          let trailAge = firework.age + i;
          let x = firework.x + spark.vx * trailAge;
          let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
          let fade = i * 20 - firework.age * 2;
          let r = Math.floor(spark.red * fade);
          let g = Math.floor(spark.green * fade);
          let b = Math.floor(spark.blue * fade);
          context1.beginPath();
          context1.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
          context1.rect(x, y, 4, 4);
          context1.fill();
        }
      });
      firework.age++;
      if (firework.age > 100 && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let spark = 0; spark < 15; spark++) {
        context1.beginPath();
        context1.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
        context1.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
        context1.fill();
      }
      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
    }
  });
  window.requestAnimationFrame(explode); 
    } */
        
      
        
    }

    keypress = (event) => {

        const newPlayer = {...this.state.player}

        if(event.which == 115){
           newPlayer.y += this.state.val
        }
        if(event.which == 119){
            newPlayer.y -= this.state.val;
            
        }

        this.setState({
            player : newPlayer
        })

    

    }

    
    
    


    createNewGame = () => {
        let r = Math.random().toString(36).substring(7);
       

        
        axios.post('http://localhost:5000/add',{
            token : r,
            width : this.state.canvas.width,
            x : this.state.canvas.width/2,
            y : this.state.canvas.height/2
        })
        .then(data => {
            

            const socketPersonal = io.connect(`http://localhost:5000/${r}`)
            this.setState({
                socketPersonal : socketPersonal,
                token : r
            })

            socketPersonal.on('hey',data => {
                this.setState({
                    connected : true,
                })
            })

            socket.on('disconnect',(reasom) => {
               socket.emit('playerDiscoonected')
            })
            

              socket.on('dis',(data) => {
                     alert('Other player has discoonected , you have won !!')
                 })
            

            socketPersonal.on('playersLength',(data) => {

                this.setState({
                   // playersToServer : data.players,
                    //players : data.players,
                    playersLength : data.length
                },() => {
                    if(this.state.playersLength == 1){
                        this.setState({
                            showModal : true,
                            firstPlayer : true
                        })
                    }

                    if(this.state.playersLength == 2){
                        this.setState({
                            showModal : false
                        })
                    }
                })
            })

            socketPersonal.on('playersFromServer',(data) => {

             //   console.log(data)
                this.setState({
                    player : data.players[0],
                    players : data.players,
                    ball : data.ball,
                    background : data.background,
                    score0 : data.score0,
                    score1 : data.score1
                },() => {
              //      console.log(this.state.players)
                    this.render1();
                })
            })

            socketPersonal.on('startGameSignal',(data) => {
                this.setSpeed(data.gameMode)
                console.log("here" + data)
                console.log(data.gameMode)
                this.setState({
                    startGame : true,
                    firstPlayer : true
                })
                setInterval(this.game,40)
            })

        })


    }

    joinGame = () => {
        const token = prompt("Enter the game id")

        axios.post(`http://localhost:5000/check-token`,{
            token  : token
        })
        .then(data => {
            if(data.data == "true"){
                const socketPersonal = io.connect(`http://localhost:5000/${token}`)

                this.setState({
                    socketPersonal : socketPersonal,
                    token : token
                })

                socketPersonal.on('hey',data => {
                this.setState({
                    connected : true
                })

                

                socket.on('disconnect',(reasom) => {
                    socket.emit('playerDiscoonected')
                 })

                 socket.on('dis',(data) => {
                     alert('Other player has discoonected , you have won !!')
                 })

                socketPersonal.on('playersFromServer',(data) => {

                   
                    this.setState({
                        player : data.players[1],
                        players : data.players,
                        ball : data.ball,
                        background : data.background,
                        score0 : data.score0,
                        score1 : data.score1
                    },() => {
                    //    console.log(this.state.players)
                        this.render1()
                    })
                })

                socketPersonal.on('playersLength',(data) => {
                   // console.log(data.players)
                    this.setState({
                        playersLength : data.length
                      //  players : data.players
                    },() => {
                        if(this.state.playersLength == 1){
                            this.setState({
                                showModal : true
                            })
                        }
                        if(this.state.playersLength == 2){
                            this.setState({
                                showModal : false
                            })
                        }
                    })
                })

                socketPersonal.on('setSpeed',(data) => {

                    const newBall = {...this.state.ball}
                    newBall.speed = data.data.sp;
                    newBall.velocityX = data.data.vx;
                    newBall.velocityY = data.data.vy;
                    this.setState({
                        ball : newBall
                    },() => {
                        console.log("done")
                    })
                })

                socketPersonal.on('startGameSignal',(data) => {
                   
                    this.setState({
                        startGame : true,
                        firstPlayer : false
                    },() => {
                        const newPlayer = {...this.state.player}
                        newPlayer.x = (this.state.canvas.width-10);
                        newPlayer.color = "BLUE"
                        this.setState({
                            player : newPlayer
                        },() => {
                            setInterval(this.game,40)
                        })
                    })
                    
                })
            })
            }else{
                console.log("wrong")
                alert('Enter a valid token')
            }
        })
        

    }

    collision = (b,p) => {
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;
        
        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.x + b.radius;
        
        return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
    }

    resetBall = () => {
        let newBall  = {...this.state.ball}
        let canvas = this.state.canvas

        newBall.x = canvas.width/2;
        newBall.y = canvas.height/2;
        newBall.velocityX = -this.state.ball.velocityX;
       
        this.setState({
            ball : newBall
        },() => {
        })
    }

 
    update = () => {

        if(this.state.endGame && !this.state.firstTimeEnd) return

       let ball = this.state.ball
        let canvas = this.state.canvas

        const newPlayer = {...this.state.player}

        let newBackground = this.state.background
    
        if( this.state.ball.x - this.state.ball.radius < 0 ){
          //  if(!this.state.firstPlayer) newPlayer.score++;
            this.state.score1++;
            //this.state.players[1].score++;
            //comScore.play();
            newBackground =  "BLUE"
           // document.body.style.backgroundColor="BLUE";
            this.resetBall();
        }else if(ball.x + ball.radius > canvas.width){
          //  if(this.state.firstPlayer) newPlayer.score++;
            newBackground =  "RED"
            this.state.score0++;
      //      document.body.style.backgroundColor="RED";
            //userScore.play();
            this.resetBall();
        }
        if(this.state.score0>=10 || this.state.score1>=10)
        {
            this.setState({
                endGame : true
            },() => {
                if(this.state.score0 >= 10){
                    if(this.state.firstPlayer){

                        alert('You won :)')
                        /*if(window.confirm('You won :) ! Play again')){
                            window.location.reload()
                        }*/
                        
                       
                    }else{
                        /*if(window.confirm('You Lost :( ! Play again')){
                            window.location.reload()
                        }*/
                        alert('You Lost :(')
                    }
                }else{
                    if(!this.state.firstPlayer){
                        alert('You won :) ')
                        /*if(window.confirm('You won :) ! Play again')){
                            window.location.reload()
                        }*/
                    }else{
                        alert('You Lost :( ')
                        /*if(window.confirm('You Lost :( ! Play again')){
                            window.location.reload()
                        }*/
                    }
    
                    
                }
    
            })
            
           return
        }
        
        
        const newBall = {...this.state.ball}

        newBall.x += newBall.velocityX;
        newBall.y += newBall.velocityY;
        
        
        if(newBall.y - newBall.radius < 0 || newBall.y + newBall.radius > this.state.canvas.height){
            
            newBall.velocityY = -newBall.velocityY;
           
        }
        
        let player = null

        if(this.state.players && this.state.players.length == 2)
        player = (newBall.x + newBall.radius < this.state.canvas.width/2) ? this.state.players[0] : this.state.players[1];
        
    
        if(this.state.players  && this.state.players.length == 2 && this.collision(newBall,player)){
    
            //hit.play();
            
            let collidePoint = (newBall.y - (player.y + player.height/2));
      
            collidePoint = collidePoint / (player.height/2);
    
            let angleRad = (Math.PI/4) * collidePoint;
            
    
            let direction = (newBall.x + newBall.radius < this.state.canvas.width/2) ? 1 : -1;

         //   newBall.velocityX = direction * newBall.speed * Math.cos(angleRad);
         //   newBall.velocityY = newBall.speed * Math.sin(angleRad);

            newBall.velocityX = direction * this.state.ball.speed * Math.cos(angleRad);
             newBall.velocityY = this.state.ball.speed * Math.sin(angleRad);
    
        } 

      /*  const ballTosend = {}
        ballTosend.x = newBall.x;
        ballTosend.y = newBall.y;
        ballTosend.velocityX = newBall.velocityX;
        ballTosend.velocityY = newBall.velocityY;
        ballTosend.radius = newBall.radius
        ballTosend.speed = newBall.speed;
        ballTosend.color = newBall.color */


        this.state.socketPersonal.emit('getPlayerData',{player : newPlayer,firstPlayer : this.state.firstPlayer , token : this.state.token,ball : newBall,background:newBackground,score0:this.state.score0,score1:this.state.score1});
        
        if(this.state.endGame){
            this.setState({
                firstTimeEnd : true
            })
        }

    }

    drawRect = (x, y, w, h, color) => {
        this.state.ctx.fillStyle = color;
        this.state.ctx.fillRect(x, y, w, h);
     }

     drawNet = () => {
        for(let i = 0; i <= this.state.canvas.height; i+=15){
            this.drawRect(this.state.net.x, this.state.net.y + i, this.state.net.width, this.state.net.height, this.state.net.color);
        }
    }

    drawText = (text,x,y,col) => {
        this.state.ctx.fillStyle = col;
        this.state.ctx.font = "75px fantasy";
        this.state.ctx.fillText(text, x, y);
    }

    drawArc = (x, y, r, color) => {
        this.state.ctx.fillStyle = color;
        this.state.ctx.beginPath();
        this.state.ctx.arc(x,y,r,0,Math.PI*2,true);
        this.state.ctx.closePath();
        this.state.ctx.fill();
    }

    render1 = () => {
        this.drawRect(0, 0, this.state.canvas.width, this.state.canvas.height, "#000");

        this.drawNet()

        this.drawRect(this.state.players[0].x, this.state.players[0].y, this.state.players[0].width, this.state.players[0].height, this.state.players[0].color);

        this.drawRect(this.state.players[1].x, this.state.players[1].y, this.state.players[1].width, this.state.players[1].height, this.state.players[1].color);
        
        this.drawArc(this.state.ball.x, this.state.ball.y, this.state.ball.radius, this.state.ball.color);
        
        this.drawText(this.state.score0,this.state.canvas.width/4,this.state.canvas.height/5,"RED");
    
        this.drawText(this.state.score1,3*this.state.canvas.width/4,this.state.canvas.height/5,"BLUE");
    }

    game = () => {
    
         this.update();
      //  this.render1()
    }

    startGame = () => {

        this.state.socketPersonal.emit('startGame',{
            gameMode : this.state.mode
        })
       
        
    }

    setSpeed = (sp) => {

        
        let s = 10;
        let vx = 8;
        let vy = 8;
    

        if(sp === "medium"){
            console.log("hihih")
            s = 15;
            vx = 13;
            vy = 13;
        }
        if(sp === "fast"){
            s = 22;
            vx = 20;
            vy = 20;
        }

        const newBall = {...this.state.ball};

       newBall.speed = s;
       newBall.velocityX = vx;
       newBall.velocityY = vy;

       this.state.socketPersonal.emit('setSpeed',{sp : newBall.speed,vx : newBall.velocityX,vy : newBall.velocityY})

        this.setState({
            ball : newBall,
            mode : sp
        },() => {
            this.setState({
                canDisplayStartButton : true
            })
        }) 
    }

    closeModal = () => {
        this.setState({
            showModal : false
        })
    }

   
    render(){


     //   console.log(this.state.ball)

        if(this.state.background){
            document.body.style.backgroundColor = this.state.background
        }

    
          

        let modalBody = (
            <h1>Waiting for other players to join</h1>
        )
       


        let contentToRender = (
            <div className="container pt-5">
                <div  style={{ height:"100%",width:"100%", position: "absolute" , height: "100% ", top: "0",left: "0" , zIndex: "-1"}}>
                     <video className="video"  ref="video" style={{  opacity: "1",height: "100%",width: "100%",objectFit: "cover"}} autoPlay muted loop>
                        <source src={VideoWin} type="video/mp4" />
                    </video>
                    <Fade right delay={1400}>
                    <h1 className="display-1" style={{fontWeight:"600",color : "red",transform:"translate(-50%,-50%)",position:"absolute",top:"30%",left:"30%"}}>PING &nbsp; &nbsp; &nbsp;PONG</h1>
                    </Fade>

                    <Fade bottom delay={1600}>
                    <img className="display-1" style={{transform:"translate(-50%,-50%)",position:"absolute",top:"28%",left:"43%"}} src={Imag1} />
                    </Fade>
        </div>  
               {/*  <div  style={{  position: "absolute" , height: "100% ", top: "0",left: "0" , zIndex: "-1"}}>
                    <img src={Milky} />
    </div> */}
                
                <div className="row" style={{position:"absolute",left:"50%",width:"60%",zIndex:"100",top:"50%",transform:"translate(-50%,-50%)"}}>
                    <Fade left delay={3200}>
                    <div className="col-6 text-center mt-5">
                    
                        <button className="btn btn-success p-3" style={{borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} onClick={this.createNewGame}>
                            Create a New Game
                        </button>
                   
                    </div>
                    </Fade>
                    <Fade right delay={3400}>
                    <div className="col-6 text-center mt-5">
                        <button className="btn btn-primary p-3" style={{borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} onClick={this.joinGame}>
                            Join a New Game
                        </button>
                    </div>
                    </Fade>
                </div>
            </div>
        )

        
         if(this.state.playersLength == 2){
      //       this.render1()
            contentToRender = (
                <div className="container pt-5">
                <div  style={{  position: "absolute" , height: "100% ",width:"100%", top: "0",left: "0" , zIndex: "-1"}}>
                <video className="video"  ref="video" style={{opacity:"0.4", height: "100%",width: "100%",objectFit: "cover"}} autoPlay muted loop>
                        <source src={VideoWin} type="video/mp4" />
                    </video>
            </div> 
                
                <div className="row" style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",zIndex:"100"}}>
                    <Slide left >
                    <div className="col-4 text-center mt-5" style={{width:"80%"}}>
                    
                        <button  style={{display:"block",width:"100%",borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} className="btn btn-primary" onClick={() => this.setSpeed('slow')}>
                            Slow
                        </button>
                   
                    </div>
                    </Slide>
                    <Fade>
                    <div className="col-4 text-center mt-5" style={{width:"80%"}}>
                    
                        <button className="btn btn-secondary" style={{display:"block",width:"100%",borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} onClick={() => this.setSpeed('medium')}>
                            Medium
                        </button>
                   
                    </div>
                    </Fade>
                    <Slide right>
                    <div className="col-4 text-center mt-5" style={{width:"80%"}}>
                    
                        <button className="btn btn-danger"  style={{display:"block",width:"100%",borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} onClick={() => this.setSpeed('fast')}>
                            Fast
                        </button>
                   
                    </div>
                    <div className="col-12 text-center mt-5">
                        <button className="btn btn-success" style={{display:"block",width:"100%",borderRadius:"10px",fontSize:"20px",textTransform:"uppercase",fontWeight:"400"}} disabled={!this.state.canDisplayStartButton} onClick={this.startGame}>Start Game</button>
                    </div> 
                    </Slide>
                </div>
            </div>
                
              /*  <>
                <button className="btn btn-success" onClick={this.startGame}>Start Game</button>
                <button className="btn btn-success" onClick={() => this.setSpeed(7)}>SLow</button>
                <button className="btn btn-primary"  onClick={() => this.setSpeed(15)}>Medium</button>
                <button className="btn btn-gander"  onClick={() => this.setSpeed(25)}>Danger</button>
                </> */

            )

            if(!this.state.firstPlayer){
                contentToRender = (
                    <div className="container pt-5">
            <div  style={{  position: "absolute" , height: "100% ",width:"100%", top: "0",left: "0" , zIndex: "-1"}}>
                     <video  ref="video" style={{  opacity: ".4",height: "100%",width: "100%",objectFit: "cover"}} autoPlay muted loop>
                        <source src={Video} type="video/mp4" />
                    </video>
            </div> 
                
                <div className="row mt-2" style={{position:"absolute",left:"50%",width:"60%",bottom:"20%",transform:"translateX(-50%)"}}>
                   <div className="col-12 text-center">
                        <h1>Waiting for the game to be started</h1>
                   </div>
                </div>
            </div>
                )
            }


           
        }

        if(this.state.showModal){
            contentToRender = (
                    <div className="container pt-5">
                <div  style={{  position: "absolute" , height: "100% ",width:"100%", top: "0",left: "0" , zIndex: "-1"}}>
                     <video  ref="video" style={{  opacity: ".4",height: "100%",width: "100%",objectFit: "cover"}} autoPlay muted loop>
                        <source src={Video} type="video/mp4" />
                    </video>
            </div> 
                </div>
            )
        }

        if(this.state.startGame){
            contentToRender = null
        }

       /* if(this.state.connected){
            contentToRender = (
                <canvas id="pong" width="600" height="400"></canvas>
            )
        } */

       


        console.log(this.state.ball.speed , this.state.ball.velocityY , this.state.ball.velocityX)
        return(
            <>
            {contentToRender}
            <div className="container">
                <div className="row" style={{width:"100%"}}>
                    <div className="col-12 text-center mt-5">
                    <Fade delay={4000}>
                    <canvas id="pong" width="900" height="500"></canvas>
                    </Fade>
                    </div>
                    
                </div>
            </div>
            {this.state.showModal ? <Modal code={this.state.token}/> : null}
          
           {/* <canvas style={{zIndex:"-1000"}} id='myCanvas' width='800' height='800'></canvas> */ }
           </>
        )
    }
}

export default Home

