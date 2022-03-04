class Bullets{
    constructor(x, y){
        var options={
            isStatic:true
        }
        //this.x=x;
        //this.y=y;
        this.r=30;
        this.cannonballimg=loadImage("assets/cannonball.png");
        this.trayectoria=[];
        this.body=Bodies.circle(x, y, this.r, options);
        World.add(world, this.body);
    }
    remove(index){
        Matter.Body.setVelocity(this.body, {x:0, y:0})
        setTimeout(()=>{
            Matter.World.remove(world, mbalas[index].body)
            delete mbalas[index]
        }, 200)
    }
    shoot(){
        var newangle=cannonobj.a-25;
        newangle=newangle*(3.14/180);
        var velocity=p5.Vector.fromAngle(newangle);
        console.log("antes de la multiplicación", velocity)
        velocity.mult(0.3);
        console.log("después de la multiplicación", velocity)
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x:velocity.x*(180/3.14), y:velocity.y*(180/3.14)})
        
    }
    display(){
        push();
        imageMode(CENTER);
        image(this.cannonballimg, this.body.position.x, this.body.position.y, this.r, this.r);
        pop();
        if(this.body.velocity.x>0 && this.body.position.x>10){
            var track=[this.body.position.x, this.body.position.y];
        this.trayectoria.push(track);
        }

        
        for(var mat=0; mat<this.trayectoria.length; mat++){
            image(this.cannonballimg, this.trayectoria[mat][0], this.trayectoria[mat][1], 5, 5);
        }
        //console.log("trayectoria-before:", this.trayectoria.length);
    }
}