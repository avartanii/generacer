(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const XW_HEIGHT = 200;
    const XW_WIDTH = XW_HEIGHT;
    const WING_OPEN = 1.0;
    const WING_CLOSED = 0.0;
    const WING_ANGLE = 15.0;

    let howOpen = WING_OPEN;


    // Hold off on drawing
    let readyLeftLower = false;
    let readyLeftUpper = false;
    let readyRightLower = false;
    let readyRightUpper = false;
    let readyBody = false;


    // Import and prime images for drawing
    var xwingLeftLowerImage = new Image();
    xwingLeftLowerImage.onload = () => {
        readyLeftLower = true;
    };
    xwingLeftLowerImage.src = "images/x-wing/x-wing-drawing-left-lower.svg";

    var xwingLeftUpperImage = new Image();
    xwingLeftUpperImage.onload = () => {
        readyLeftUpper = true;
    };
    xwingLeftUpperImage.src = "images/x-wing/x-wing-drawing-left-upper.svg";

    var xwingRightLowerImage = new Image();
    xwingRightLowerImage.onload = () => {
        readyRightLower = true;
    };
    xwingRightLowerImage.src = "images/x-wing/x-wing-drawing-right-lower.svg";

    var xwingRightUpperImage = new Image();
    xwingRightUpperImage.onload = () => {
        readyRightUpper = true;
    };
    xwingRightUpperImage.src = "images/x-wing/x-wing-drawing-right-upper.svg";

    var xwingBodyImage = new Image();
    xwingBodyImage.onload = () => {
        readyBody = true;

    };
    xwingBodyImage.src = "images/x-wing/x-wing-drawing-body.svg";


    let drawLeftLower = (ctx) => {
        ctx.save();
        if (readyLeftLower) {
            ctx.drawImage(xwingLeftLowerImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        ctx.restore();
    };

    let drawLeftUpper = (ctx) => {
        ctx.save();
        if (readyLeftUpper) {
            ctx.drawImage(xwingLeftUpperImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        ctx.restore();
    };

    let drawRightLower = (ctx) => {
        ctx.save();
        if (readyRightLower) {
            ctx.drawImage(xwingRightLowerImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        ctx.restore();
    };

    let drawRightUpper = (ctx) => {
        ctx.save();
        if (readyRightUpper) {
            ctx.drawImage(xwingRightUpperImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        ctx.restore();
    };

    let drawBody = (ctx) => {
        ctx.save();
        if (readyBody) {
            ctx.drawImage(xwingBodyImage, -XW_WIDTH / 2, -XW_HEIGHT / 2, XW_WIDTH, XW_HEIGHT);
        }
        ctx.restore();
    };

    let rotateLeftLower = (ctx, openAmount) => {
        ctx.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            ctx.rotate(((1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            ctx.rotate(((1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawLeftLower(ctx);
        ctx.restore();
    };

    let rotateLeftUpper = (ctx, openAmount) => {
        ctx.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            ctx.rotate((-(1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            ctx.rotate((-(1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawLeftUpper(ctx);
        ctx.restore();
    };

    let rotateRightLower = (ctx, openAmount) => {
        ctx.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            ctx.rotate((-(1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            ctx.rotate((-(1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawRightLower(ctx);
        ctx.restore();
    };

    let rotateRightUpper = (ctx, openAmount) => {
        ctx.save();
        if (openAmount <= WING_OPEN && openAmount >= WING_CLOSED) {
            ctx.rotate(((1 - openAmount) * WING_ANGLE) * Math.PI / 180);
            howOpen = openAmount;
        } else {
            ctx.rotate(((1 - howOpen) * WING_ANGLE) * Math.PI / 180);
        }
        drawRightUpper(ctx);
        ctx.restore();
    };

    let foldWings = (ctx, openAmount) => {
        ctx.save();
        rotateLeftLower(ctx, openAmount);
        rotateLeftUpper(ctx, openAmount);
        rotateRightLower(ctx, openAmount);
        rotateRightUpper(ctx, openAmount);
        drawBody(ctx);
        ctx.restore();
    };

    SampleSpriteLibrary.xwing = (flightPlan) => {
        let ctx = flightPlan.ctx;
        let wingOpenAmount = flightPlan.wingOpenAmount;

        ctx.save();
        // drawXWing(ctx);
        foldWings(ctx, wingOpenAmount);
        ctx.restore();
    };
})();
