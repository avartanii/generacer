(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFightersBack = false;

    // Import and prime images for drawing
    var tieFightersBack = new Image();
    tieFightersBack.onload = () => {
        readyTieFightersBack = true;
    };
    tieFightersBack.src = "images/tie-fighters/tie-fighters-back.svg";

    let drawTieFightersBack = (ctx) => {
        ctx.save();
        if (readyTieFightersBack) {
            ctx.drawImage(tieFightersBack,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFightersBack = (badAss) => {
        let ctx = badAss.ctx;

        ctx.save();
        drawTieFightersBack(ctx);
        ctx.restore();
    };
})();
