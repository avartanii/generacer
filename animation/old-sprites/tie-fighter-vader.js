(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighterVader = false;

    // Import and prime images for drawing
    var tieFighterVader = new Image();
    tieFighterVader.onload = () => {
        readyTieFighterVader = true;
    };
    tieFighterVader.src = "images/tie-fighters/tie-fighter-vader.svg";

    let drawTieFighterVader = (ctx) => {
        ctx.save();
        if (readyTieFighterVader) {
            ctx.drawImage(tieFighterVader,
                -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighterVader = (commander) => {
        let ctx = commander.ctx;

        ctx.save();
        drawTieFighterVader(ctx);
        ctx.restore();
    };
})();
