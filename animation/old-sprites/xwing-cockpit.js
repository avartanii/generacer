(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const XW_COCKPIT_HEIGHT = 200;
    const XW_COCKPIT_WIDTH = XW_COCKPIT_HEIGHT;

    // Hold off on drawing
    let readyCockpit = false;

    // Import and prime images for drawing
    var xwingCockpitImage = new Image();
    xwingCockpitImage.onload = () => {
        readyCockpit = true;
    };
    xwingCockpitImage.src = "images/x-wing/x-wing-drawing-cockpit.svg";

    let drawCockpit = (ctx) => {
        ctx.save();
        if (readyCockpit) {
            ctx.drawImage(xwingCockpitImage,
                -XW_COCKPIT_WIDTH / 2, -XW_COCKPIT_HEIGHT / 2, XW_COCKPIT_WIDTH, XW_COCKPIT_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.xwingCockpit = (rebel) => {
        let ctx = rebel.ctx;

        ctx.save();
        drawCockpit(ctx);
        ctx.restore();
    };
})();
