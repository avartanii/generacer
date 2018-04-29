(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SHOTS_HEIGHT = 200;
    const SHOTS_WIDTH = SHOTS_HEIGHT;


    // Hold off on drawing
    let readyShots = false;

    // Import and prime images for drawing
    var shots = new Image();
    shots.onload = () => {
        readyShots = true;
    };
    shots.src = "images/shots/shots.svg";

    let drawShots = (ctx) => {
        ctx.save();
        if (readyShots) {
            ctx.drawImage(shots, -SHOTS_WIDTH / 2, -SHOTS_HEIGHT / 2, SHOTS_WIDTH, SHOTS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.shots = (pewPew) => {
        let ctx = pewPew.ctx;

        ctx.save();
        drawShots(ctx);
        ctx.restore();
    };
})();