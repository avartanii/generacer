(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const FIGHTERS_HEIGHT = 200;
    const FIGHTERS_WIDTH = FIGHTERS_HEIGHT;


    // Hold off on drawing
    let readyTieFighters = false;

    // Import and prime images for drawing
    var tieFighters = new Image();
    tieFighters.onload = () => {
        readyTieFighters = true;
    };
    tieFighters.src = "images/tie-fighters/tie-fighters.svg";

    let drawTieFighters = (ctx) => {
        ctx.save();
        if (readyTieFighters) {
            ctx.drawImage(tieFighters, -FIGHTERS_WIDTH / 2, -FIGHTERS_HEIGHT / 2, FIGHTERS_WIDTH, FIGHTERS_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighters = (empireReppin) => {
        let ctx = empireReppin.ctx;

        ctx.save();
        drawTieFighters(ctx);
        ctx.restore();
    };
})();
