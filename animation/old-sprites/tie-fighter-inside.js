(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const INSIDE_HEIGHT = 768;
    const INSIDE_WIDTH = 1024;


    // Hold off on drawing
    let readyTieFighterInside = false;

    // Import and prime images for drawing
    var tieFighterInside = new Image();
    tieFighterInside.onload = () => {
        readyTieFighterInside = true;
    };
    tieFighterInside.src = "images/tie-fighters/tie-fighter-inside.svg";

    let drawTieFightersInside = (ctx) => {
        ctx.save();
        if (readyTieFighterInside) {
            ctx.drawImage(tieFighterInside, -INSIDE_WIDTH / 2, -INSIDE_HEIGHT / 2, INSIDE_WIDTH, INSIDE_HEIGHT);
        }
        ctx.restore();
    };

    SampleSpriteLibrary.tieFighterInside = (pilot) => {
        let ctx = pilot.ctx;

        ctx.save();
        drawTieFightersInside(ctx);
        ctx.restore();
    };
})();
