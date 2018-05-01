(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  const TRACK_TOTAL_WIDTH = 250;

  const drawMask = (ctx) => {
    ctx.save();

    // Horse
    ctx.rect(1.5 * TRACK_TOTAL_WIDTH, 1.25 * TRACK_TOTAL_WIDTH, 3 * TRACK_TOTAL_WIDTH, 100);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.restore();
  };

  SampleSpriteLibrary.mask = (phantom) => {
    const { ctx } = phantom;

    ctx.save();
    drawMask(ctx);
    ctx.restore();
  };
})();
