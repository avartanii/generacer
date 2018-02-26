(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const LASER_HEIGHT = 200;
    const LASER_WIDTH = LASER_HEIGHT;


    // Hold off on drawing
    let readyLaser = false;

    // Import and prime images for drawing
    var laser = new Image();
    laser.onload = () => {
        readyLaser = true;
    };
    laser.src = "images/shots/laser.svg";

    let drawLaser = (ctx) => {
        ctx.save();
        if (readyLaser) {
            ctx.drawImage(laser, -LASER_WIDTH / 2, -LASER_HEIGHT / 2, LASER_WIDTH, LASER_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.laser = (pew) => {
        let ctx = pew.ctx;

        ctx.save();
        drawLaser(ctx);
        ctx.restore();
    };
})();
