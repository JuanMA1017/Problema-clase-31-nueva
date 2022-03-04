class Cannon{
    constructor(x, y, w, h, a){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.a=a;
        this.cannonimg=loadImage("assets/canon.png");
        this.cbaseimg=loadImage("assets/cannonBase.png");
    }
    display(){
        if(keyIsDown(LEFT_ARROW) && this.a>-30){
            this.a-=2;
        }
        if(keyIsDown(RIGHT_ARROW) && this.a<50){
            this.a+=2;
        }
        push();
        translate(this.x, this.y);
        rotate(this.a);
        imageMode(CENTER);
        image(this.cannonimg, 0, 0, this.w, this.h);
        pop();
        image(this.cbaseimg, width/10, height-750, width/9, height/7);
    }
}