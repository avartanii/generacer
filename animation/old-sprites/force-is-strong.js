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
    text.src = "images/text/force-is-strong.svg";

    let drawText = (ctx) => {
        ctx.save();
        if (readyText) {
            ctx.drawImage(text, -TEXT_WIDTH / 2, -TEXT_HEIGHT / 2, TEXT_WIDTH, TEXT_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.forceIsStrong = (father) => {
        let ctx = father.ctx;

        ctx.save();
        drawText(ctx);
        ctx.restore();
    };
})();
