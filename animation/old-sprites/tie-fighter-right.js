(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterRight = false;

    // Import and prime images for drawing
    var tieFighterRight = new Image();
    tieFighterRight.onload = () => {
        readyTieFighterRight = true;
    };
    tieFighterRight.src = "images/tie-fighters/tie-fighter-right.svg";

    let drawTieFighterRight = (ctx) => {
        ctx.save();
        if (readyTieFighterRight) {
            ctx.drawImage(tieFighterRight,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighterRight = (flightPlan) => {
        let ctx = flightPlan.ctx;

        ctx.save();
        drawTieFighterRight(ctx);
        ctx.restore();
    };
})();
