(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  const HORSE_RADIUS = 5;

  const drawHorse = (ctx) => {
    ctx.save();

    // Horse
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, HORSE_RADIUS, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.restore();
  };

  SampleSpriteLibrary.horse7 = (racer) => {
    const { ctx } = racer;

    ctx.save();
    drawHorse(ctx);
    ctx.restore();
  };
})();
