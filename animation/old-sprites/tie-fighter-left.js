(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterLeft = false;

    // Import and prime images for drawing
    var tieFighterLeft = new Image();
    tieFighterLeft.onload = () => {
        readyTieFighterLeft = true;
    };
    tieFighterLeft.src = "images/tie-fighters/tie-fighter-left.svg";

    let drawTieFighterLeft = (ctx) => {
        ctx.save();
        if (readyTieFighterLeft) {
            ctx.drawImage(tieFighterLeft,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighterLeft = (flightPlan) => {
        let ctx = flightPlan.ctx;

        ctx.save();
        drawTieFighterLeft(ctx);
        ctx.restore();
    };
})();
