const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOOT_ORIGIN = new Vector2(950,11);
class Stick {
    constructor (position,onShoot) {
        this.position = position;
        this.rotation = 0;
        this.origin = STICK_ORIGIN.copy();
        this.power = 0;
        this.onShoot = onShoot;
        this.shot = false;
    }

    // update method is called every frame (see detailed description in the dock) 
    update(delta) {
        if (Mouse.left.down) {
            this.increasePower();
        } else if (this.power > 0) {
            this.shoot();
        }
        this.updateRotation();
    }

    // draws sprite every frame
    draw() {
       
        Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    }

    updateRotation() {
        let oppasite = Mouse.position.y - this.position.y;
        let adjacent = Mouse.position.x - this.position.x;

        this.rotation = Math.atan2(oppasite, adjacent);
    }
    increasePower() {
        this.power += 120;
        this.origin.x += 5;
    }
    shoot() {
        this.onShoot(this.power, this.rotation);
        this.power = 0;
        this.origin = STICK_SHOOT_ORIGIN.copy();
        this.shot = true;
    }
    reposition(position) {
        this.position = position.copy();
        this.origin = STICK_ORIGIN.copy();
        this.shot = false;
    }
}
