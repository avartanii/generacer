(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  const HORSE_RADIUS = 5;

  let drawHorse = (ctx) => {
    ctx.save();

    // Horse
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, HORSE_RADIUS, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'purple';
    ctx.fill();

    ctx.restore();
  };

  SampleSpriteLibrary.horse3 = (racer) => {
    let ctx = racer.ctx;

    ctx.save();
    drawHorse(ctx);
    ctx.restore();
  };

})();
