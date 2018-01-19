(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    let drawDeathStar = (ctx) => {
        ctx.save();

        let radialGradient = ctx.createRadialGradient(-206, -206, 1, 0, 0, 700);

        // Put your canvas drawing code (and any other code) here.
        radialGradient.addColorStop(0, "#BBB");
        radialGradient.addColorStop(.3, "#555");

        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(0, 0, 200, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.clip();
        ctx.filter = "blur(5px)";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(4, -756, 810, 0, Math.PI * 2, true);
        ctx.stroke();

        radialGradient = ctx.createRadialGradient(-16, -56, 1, 30, -41, 250);
        ctx.filter = "none";

        radialGradient.addColorStop(0, "#666");
        radialGradient.addColorStop(.2, "#666");
        radialGradient.addColorStop(.8, "#AAA");

        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(30, -41, 60, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.restore();
    };

    let drawLaser = (ctx, howReady) => {
        ctx.save();
        let centerX = 30;
        let centerY = -41;
        let trig = 0;
        ctx.strokeStyle = "#0F0";
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 5]);
        ctx.beginPath();
        for (var i = 0; i <= howReady * 8; i++) {
            trig = (i * 360 / 8) * Math.PI / 180;
            ctx.moveTo(centerX, centerY);
            ctx.moveTo(centerX + (60 * Math.cos(trig)), centerY + (60 * Math.sin(trig)));
            ctx.lineTo(75, -21);
            ctx.stroke();
        }
        ctx.restore();
    };

    SampleSpriteLibrary.deathStar = (fireWhenReady) => {
        let ctx = fireWhenReady.ctx;
        let howReady = fireWhenReady.howReady;

        ctx.save();
        drawDeathStar(ctx);
        drawLaser(ctx, howReady);
        ctx.restore();
    };

})();
