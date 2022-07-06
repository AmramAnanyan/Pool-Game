const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const HOLE_RADIUS = 46;

class Ball {
    constructor (position, color) {
        this.position = position;
        this.velocity = new Vector2();
        this.moving = false;

        // get ball sprite by its color
        this.sprite = getBallSpriteByColor(color);
    }

    // update method is called every frame (see detailed description in the dock) 
    update(delta) {
        this.position.addTo(this.velocity.mult(delta));
        this.velocity = this.velocity.mult(0.98);
        
        if (this.velocity.length() < 5) {
            this.velocity = new Vector2();
            this.moving = false;
        }
        
    }

    // draws sprite every frame
    draw () {
        Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    }
    shoot(power,rotation) {
        this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
        this.moving = true;
    }
    collideWith(object) {
        if (object instanceof Ball) {
            this.collideWithBall(object)
        } else {
            this.collideWithTabel(object)
        }
    }
    collideWithBall(ball) {
         //find a normal vector
     const n = this.position.substract(ball.position);

     //find distance
     const dist = n.length();
 
     if (dist > BALL_DIAMETER) {
         return;
     }
     // find minimum distance
     const mtd = n.mult((BALL_DIAMETER - dist) / dist);
 
     //push and pull bals distance
     this.position = this.position.add(mtd.mult(1 / 2));
     ball.position = ball.position.substract(mtd.mult(1 / 2));
     // find unit normal vector
     const un = n.mult(1 / n.length());
 
     //find unit tanget vector
     const ut = new Vector2(-un.y, un.x);
 
     //Project velocitiies anto unit norml and unit tanget vectors
     const v1n = un.dot(this.velocity);
     const v1t = ut.dot(this.velocity);
     const v2n = un.dot(ball.velocity);
     const v2t = ut.dot(ball.velocity);
     
     //find new normal velocity
     let v1nTag = v2n;
     let v2nTag = v1n;
 
     //convert the scalar normal and tangential velocityes into vectors
 
     v1nTag = un.mult(v1nTag);
     const v1tTag = ut.mult(v1t);
     v2nTag = un.mult(v2nTag);
     const v2tTag = ut.mult(v2t);
     
     // update velocityies
     this.velocity = v1nTag.add(v1tTag);
     ball.velocity = v2nTag.add(v2tTag);
 
     this.moving = true;
     ball.moving = true;
    }
    collideWithTabel(table) {
        if (!this.moving) {
            return;
        }
        let collided = false;
    
        if (this.position.y <= table.TopY + BALL_RADIUS) {
            this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
            collided = true;
        }
        if (this.position.x >= table.RightX - BALL_RADIUS) {
            this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
            collided = true;
        };
        if (this.position.y >= table.BottomY - BALL_RADIUS) {
            this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
            collided = true;
        };
        if (this.position.x <= table.LeftX + BALL_RADIUS) {
            this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
            collided = true;
        }
        if (collided) {
            this.velocity=this.velocity.mult(0.98)
        }
    }
}
