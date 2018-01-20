(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  const HORSE_RADIUS = 4;

  // GATE CONSTANTS
  const NUMBER_OF_GATES = 14; // Max number of gate slots on track
  const OPEN = true;
  const CLOSED = false;
  const GATE_WIDTH = 10; // Point width of gate door
  const GATE_LENGTH = 25; // Point length of gate sides

  // TRACK CONSTANTS
  const TRACK_TOTAL_WIDTH = 250;
  const TRACK_WIDTH = 150;
  const TRACK_GATE_MARGIN = 5;
  const TRACK_OUTER_RADIUS = 250;
  const TRACK_INNER_RADIUS = 100;
  const TRACK_COLOR = '#ffe6b5';

  let trackLength;   // total length of race
  let progress;      // % complete of race
  let place;         // 1st, 2nd, etc.
  let position;      // Inside or outside of track

  let drawHorse = (ctx) => {
    ctx.save();

    // Horse
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, HORSE_RADIUS, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.restore();
  };

  SampleSpriteLibrary.horse = (racer) => {
    let ctx = racer.ctx;

    ctx.save();
    drawHorse(ctx);
    ctx.restore();
  };

})();
