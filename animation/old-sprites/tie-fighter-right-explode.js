(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterRightExplode = false;

    // Import and prime images for drawing
    var tieFighterRightExplode = new Image();
    tieFighterRightExplode.onload = () => {
        readyTieFighterRightExplode = true;
    };
    tieFighterRightExplode.src = "images/tie-fighters/tie-fighter-right-explode.svg";

    let drawTieFighterRightExplode = (ctx) => {
        ctx.save();
        if (readyTieFighterRightExplode) {
            ctx.drawImage(tieFighterRightExplode,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighterRightExplode = (flightPlan) => {
        let ctx = flightPlan.ctx;

        ctx.save();
        drawTieFighterRightExplode(ctx);
        ctx.restore();
    };
})();
