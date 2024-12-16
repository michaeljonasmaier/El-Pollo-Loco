class World {

    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        //draw wird so oft aufgerufen, wie es die Grafikkarte hergibt
        let self = this; //this funktioniert in der kommenden Methode nicht mehr, daher wird es hier in eine Variable gespeichert
        requestAnimationFrame(function () {
            self.draw();
        });


    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(this.ctx);
        }
       mo.draw(this.ctx);
       mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
           mo.flipImageBack(this.ctx);
        }  
    }
    
    checkCollisions(){
        setInterval(()=>{
            this.level.enemies.forEach((enemy)=>{
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                }
            })
        }, 200)
    }
}