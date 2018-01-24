(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const EXHAUST_HEIGHT = 768;
    const EXHAUST_WIDTH = 1024;


    // Hold off on drawing
    let readyExhaust = false;

    // Import and prime images for drawing
    var exhaust = new Image();
    exhaust.onload = () => {
        readyExhaust = true;
    };
    exhaust.src = "images/backgrounds/exhaust.svg";

    let drawExhaust = (ctx) => {
        ctx.save();
        if (readyExhaust) {
            ctx.drawImage(exhaust, -EXHAUST_WIDTH / 2, -EXHAUST_HEIGHT / 2, EXHAUST_WIDTH, EXHAUST_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.exhaust = (uhOh) => {
        let ctx = uhOh.ctx;

        ctx.save();
        drawExhaust(ctx);
        ctx.restore();
    };
})();
