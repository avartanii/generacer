(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  const DATA = JSON.parse(localStorage.getItem('scene'));

  const PLATE_WIDTH = 150;
  const PLATE_HEIGHT = 50;
  const HORSE_NAME = DATA[9] ? DATA[9].name : undefined;


  const drawHorsePlate = (ctx) => {
    ctx.save();

    // Plate
    ctx.rect(-PLATE_WIDTH / 2, -PLATE_HEIGHT / 2, PLATE_WIDTH, PLATE_HEIGHT);
    ctx.fillStyle = 'orange';
    ctx.fill();

    // Text
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(HORSE_NAME, 0, 10);
    ctx.strokeStyle = 'black';
    ctx.strokeText(HORSE_NAME, 0, 10);
    ctx.restore();
  };

  SampleSpriteLibrary.horsePlate4 = (plate) => {
    const { ctx } = plate;

    ctx.save();
    drawHorsePlate(ctx);
    ctx.restore();
  };
})();
