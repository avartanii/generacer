(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SHOTS_IN_HEIGHT = 200;
    const SHOTS_IN_WIDTH = SHOTS_IN_HEIGHT;


    // Hold off on drawing
    let readyShotsIn = false;

    // Import and prime images for drawing
    var shotsIn = new Image();
    shotsIn.onload = () => {
        readyShotsIn = true;
    };
    shotsIn.src = "images/shots/shots-in.svg";

    let drawShotsIn = (ctx) => {
        ctx.save();
        if (readyShotsIn) {
            ctx.drawImage(shotsIn, -SHOTS_IN_WIDTH / 2, -SHOTS_IN_HEIGHT / 2, SHOTS_IN_WIDTH, SHOTS_IN_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.shotsIn = (waitForIt) => {
        let ctx = waitForIt.ctx;

        ctx.save();
        drawShotsIn(ctx);
        ctx.restore();
    };
})();
