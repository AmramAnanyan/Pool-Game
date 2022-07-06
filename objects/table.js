class Table {
    constructor () {
        this.TopY = 57;
        this.RightX = 1443;
        this.BottomY = 768;
        this.LeftX = 57;
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {
        
    }

    // draws sprite every frame
    draw () {
        Canvas.drawImage(sprites.background, {x: 0, y: 0});
    }
}
