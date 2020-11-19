
class Game{

    players = [];
    background = ""
    ball = {
        x : 0,
        y : 0,
        radius : 10,
        velocityX : 5,
        velocityY : 5,
        speed : 12,
        color : "WHITE"
    }

    constructor(id,width,x1,y1){
        this.id = id;
        this.width = width;
        this.ball.x = x1;
        this.ball.y = y1;
    }

    

    addPlayer(player){
        players.push(player)
    }
    

}



class Player{
    constructor(x,y,height,width,score,color,first = false){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.score = score
        this.color = color
        this.first = first
    }
}

module.exports = {
    Game,
    Player
}