(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FALCON_HEIGHT = 200;
    const FALCON_WIDTH = FALCON_HEIGHT;


    // Hold off on drawing
    let readyFalcon = false;

    // Import and prime images for drawing
    var falcon = new Image();
    falcon.onload = () => {
        readyFalcon = true;
    };
    falcon.src = "images/falcon/millennium-falcon.svg";

    let drawFalcon = (ctx) => {
        ctx.save();
        if (readyFalcon) {
            ctx.drawImage(falcon, -FALCON_WIDTH / 2, -FALCON_HEIGHT / 2, FALCON_WIDTH, FALCON_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.falcon = (smuggler) => {
        let ctx = smuggler.ctx;

        ctx.save();
        drawFalcon(ctx);
        ctx.restore();
    };
})();
