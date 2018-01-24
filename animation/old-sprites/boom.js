(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const BOOM_HEIGHT = 200;
    const BOOM_WIDTH = BOOM_HEIGHT;


    // Hold off on drawing
    let readyBoom = false;

    // Import and prime images for drawing
    var boom = new Image();
    boom.onload = () => {
        readyBoom = true;
    };
    boom.src = "images/boom/boom.svg";

    let drawBoom = (ctx) => {
        ctx.save();
        if (readyBoom) {
            ctx.drawImage(boom, -BOOM_WIDTH / 2, -BOOM_HEIGHT / 2, BOOM_WIDTH, BOOM_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.boom = (kaBoom) => {
        let ctx = kaBoom.ctx;

        ctx.save();
        drawBoom(ctx);
        ctx.restore();
    };
})();
