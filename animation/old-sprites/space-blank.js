(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const SPACE_HEIGHT = 768;
    const SPACE_WIDTH = 1024;


    // Hold off on drawing
    let readySpaceBlank = false;

    // Import and prime images for drawing
    var spaceBlank = new Image();
    spaceBlank.onload = () => {
        readySpaceBlank = true;
    };
    spaceBlank.src = "images/backgrounds/space-blank.svg";

    let drawSpaceBlank = (ctx) => {
        ctx.save();
        if (readySpaceBlank) {
            ctx.drawImage(spaceBlank, -SPACE_WIDTH / 2, -SPACE_HEIGHT / 2, SPACE_WIDTH, SPACE_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.spaceBlank = (frontier) => {
        let ctx = frontier.ctx;

        ctx.save();
        drawSpaceBlank(ctx);
        ctx.restore();
    };
})();
