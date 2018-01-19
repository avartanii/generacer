(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const TC_HEIGHT = 200;
    const TC_WIDTH = TC_HEIGHT;
    const CROSSHAIR_MAX = .105 * TC_HEIGHT;
    const COUNTDOWN_MAX = 36000;
    const TRENCH_ZOOM_MAX = .25;

    let trenchZoom = 0.0;

    // Hold off on drawing
    let readyBody = false;
    let readyMonitor = false;
    let readyTrench = false;
    let readyCrosshairsLeft = false;
    let readyCrosshairsRight = false;


    // Import and prime images for drawing
    var targettingComputerBody = new Image();
    targettingComputerBody.onload = () => {
        readyBody = true;
    };
    targettingComputerBody.src = "images/targetting-computer/targetting-computer-body.svg";

    var targettingComputerMonitor = new Image();
    targettingComputerMonitor.onload = () => {
        readyMonitor = true;
    };
    targettingComputerMonitor.src = "images/targetting-computer/targetting-computer-monitor.svg";

    var targettingComputerTrench = new Image();
    targettingComputerTrench.onload = () => {
        readyTrench = true;
    };
    targettingComputerTrench.src = "images/targetting-computer/targetting-computer-trench.svg";

    var targettingComputerCrosshairsLeft = new Image();
    targettingComputerCrosshairsLeft.onload = () => {
        readyCrosshairsLeft = true;
    };
    targettingComputerCrosshairsLeft.src = "images/targetting-computer/targetting-computer-crosshairs-left.svg";

    var targettingComputerCrosshairsRight = new Image();
    targettingComputerCrosshairsRight.onload = () => {
        readyCrosshairsRight = true;
    };
    targettingComputerCrosshairsRight.src = "images/targetting-computer/targetting-computer-crosshairs-right.svg";

    let drawBody = (ctx) => {
        ctx.save();
        if (readyBody) {
            ctx.drawImage(targettingComputerBody, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
        }
        ctx.restore();
    };

    let drawTrench = (ctx) => {
        ctx.save();
        if (readyTrench && readyMonitor) {
            ctx.translate(.03 * TC_HEIGHT, -.016 * TC_HEIGHT);
            if (trenchZoom >= TRENCH_ZOOM_MAX) {
                trenchZoom = 0.0;
            }
            ctx.save();
            ctx.scale(trenchZoom, trenchZoom);
            ctx.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            ctx.save();
            ctx.scale(.25 + trenchZoom, .25 + trenchZoom);
            ctx.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            ctx.save();
            ctx.scale(.5 + trenchZoom, .5 + trenchZoom);
            ctx.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            ctx.save();
            ctx.scale(.75 + trenchZoom, .75 + trenchZoom);
            ctx.drawImage(targettingComputerTrench, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            trenchZoom += .025;
        }
        ctx.restore();
        ctx.drawImage(targettingComputerMonitor, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
    };

    let drawCrosshairs = (ctx, aimAmount) => {
        let translateAmount = aimAmount * CROSSHAIR_MAX;
        if (readyCrosshairsLeft && readyCrosshairsRight) {
            ctx.save();
            ctx.translate(.03 * TC_HEIGHT, -.016 * TC_HEIGHT);
            if (translateAmount >= CROSSHAIR_MAX) {
                translateAmount = CROSSHAIR_MAX;
            }
            ctx.save();
            ctx.translate(translateAmount, 0);
            ctx.drawImage(targettingComputerCrosshairsLeft, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            ctx.save();
            ctx.translate(-translateAmount, 0);
            ctx.drawImage(targettingComputerCrosshairsRight, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
            ctx.restore();
            ctx.restore();
            ctx.drawImage(targettingComputerMonitor, -TC_WIDTH / 2, -TC_HEIGHT / 2, TC_WIDTH, TC_HEIGHT);
        }
    };

    let drawNumbers = (ctx, aimAmount) => {
        if (readyMonitor) {
            let numbers = aimAmount <= 1.0 ? parseInt((1 - aimAmount) * COUNTDOWN_MAX) : 0.0;
            let numberOfZeros = aimAmount < 1.0 ? 5 - parseInt(Math.ceil(Math.log10(numbers))) : 4;
            let zeros = "0";
            for (var i = 0; i < numberOfZeros; i++) {
                zeros += "0";
            }
            ctx.save();
            ctx.translate(.030 * TC_HEIGHT, .120 * TC_HEIGHT);
            ctx.scale(TC_HEIGHT / 250, TC_HEIGHT / 250);
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = '10px AG-Stencil';
            ctx.fillText(zeros + "" + numbers, 0, 0);
            ctx.restore();
        }
    };

    let drawComputer = (ctx, aimAmount) => {
        ctx.save();
        drawBody(ctx);
        drawTrench(ctx);
        drawCrosshairs(ctx, aimAmount);
        drawNumbers(ctx, aimAmount);
        ctx.restore();
    };

    SampleSpriteLibrary.targettingComputer = (readyToFire) => {
        let ctx = readyToFire.ctx;
        let aimAmount = readyToFire.aimAmount;

        ctx.save();
        drawComputer(ctx, aimAmount);
        ctx.restore();
    };
})();
