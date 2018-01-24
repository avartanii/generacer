(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const TEXT_HEIGHT = 200;
    const TEXT_WIDTH = TEXT_HEIGHT;


    // Hold off on drawing
    let readyText = false;

    // Import and prime images for drawing
    var text = new Image();
    text.onload = () => {
        readyText = true;
    };
    text.src = "images/text/use-the-force.svg";

    let drawText = (ctx) => {
        ctx.save();
        if (readyText) {
            ctx.drawImage(text, -TEXT_WIDTH / 2, -TEXT_HEIGHT / 2, TEXT_WIDTH, TEXT_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.useTheForce = (master) => {
        let ctx = master.ctx;

        ctx.save();
        drawText(ctx);
        ctx.restore();
    };
})();
