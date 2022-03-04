class Boat{
    constructor(x, y, w, h, p){
        //this.x=x;
        //this.y=y;
        this.w=w;
        this.h=h;
        this.p=p;
        this.boatimg=loadImage("assets/boat.png");
        this.body=Bodies.rectangle(x, y, w, h);
        World.add(world, this.body);
    }
    remove(index){
        setTimeout(()=>{
            Matter.World.remove(world, mboats[index].body)
            delete mboats[index]
        }, 200)
    }
    display(){
        push();
            translate(this.body.position.x, this.body.position.y);
            rotate(this.body.angle)
            imageMode(CENTER);
            image(this.boatimg, 0, this.p, this.w, this.h);
        pop();
    }
}