(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SPACE_HEIGHT = 768;
    const SPACE_WIDTH = 1024;


    // Hold off on drawing
    let readySpace = false;

    // Import and prime images for drawing
    var space = new Image();
    space.onload = () => {
        readySpace = true;
    };
    space.src = "images/backgrounds/space.svg";

    let drawSpace = (ctx) => {
        ctx.save();
        if (readySpace) {
            ctx.drawImage(space, -SPACE_WIDTH / 2, -SPACE_HEIGHT / 2, SPACE_WIDTH, SPACE_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.space = (flare) => {
        let ctx = flare.ctx;

        ctx.save();
        drawSpace(ctx);
        ctx.restore();
    };
})();
