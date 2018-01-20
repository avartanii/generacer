(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

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

  // Populate gates object with key values indicating gate openness
  let gates = (() => {
    let gateNumbers = {};
    for (let i = 0; i < NUMBER_OF_GATES; i += 1) {
      gateNumbers[i] = CLOSED;
    }
    return gateNumbers;
  })();



  let drawTrack = (ctx) => {
    ctx.save();

    // ctx.fillStyle = radialGradient;
    ctx.strokeStyle = 'black';

    // Perimeter
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(TRACK_TOTAL_WIDTH, -TRACK_TOTAL_WIDTH);
    ctx.lineTo(-TRACK_TOTAL_WIDTH, -TRACK_TOTAL_WIDTH);
    ctx.arc(-TRACK_TOTAL_WIDTH, 0, TRACK_OUTER_RADIUS, 3 / 2 * Math.PI, 1 / 2 * Math.PI, true);
    ctx.lineTo(TRACK_TOTAL_WIDTH, TRACK_TOTAL_WIDTH);
    ctx.arc(TRACK_TOTAL_WIDTH, 0, TRACK_OUTER_RADIUS, 1 / 2 * Math.PI, 3 / 2 * Math.PI, true);
    ctx.lineTo(TRACK_TOTAL_WIDTH, -(TRACK_TOTAL_WIDTH - TRACK_WIDTH)); // Gate line
    ctx.fillStyle = TRACK_COLOR;
    ctx.fill();
    // ctx.stroke();

    // Inside boundary
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(250, -100);
    ctx.lineTo(-250, -100);
    ctx.arc(-250, 0, 100, 3 / 2 * Math.PI, 1 / 2 * Math.PI, true);
    ctx.lineTo(250, 100);
    ctx.arc(250, 0, 100, 1 / 2 * Math.PI, 3 / 2 * Math.PI, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    // ctx.stroke();

    // Gates
    ctx.lineWidth = 3;
    for (let i = 0; i < NUMBER_OF_GATES + 1; i += 1) {
      ctx.beginPath();
      let targetY = -(TRACK_TOTAL_WIDTH - TRACK_GATE_MARGIN) + (GATE_WIDTH * i);
      ctx.moveTo(TRACK_TOTAL_WIDTH, targetY);
      ctx.lineTo(TRACK_TOTAL_WIDTH - GATE_LENGTH, targetY);
      ctx.stroke();
    }

    ctx.restore();
  };

  // TODO: Clean up magic numbers
  let drawGates = (ctx) => {
    ctx.save();
    ctx.lineWidth = 1;
    for (let i = 0; i < NUMBER_OF_GATES; i += 1) {
      let startX = TRACK_TOTAL_WIDTH - GATE_LENGTH;
      let startY = -(TRACK_INNER_RADIUS + TRACK_GATE_MARGIN) - (i * GATE_WIDTH);
      let targetX = startX;
      let targetY = -(TRACK_INNER_RADIUS + TRACK_GATE_MARGIN) - ((i + 1) * GATE_WIDTH);
      if (gates[i]) {
        targetX = TRACK_TOTAL_WIDTH - GATE_WIDTH - GATE_LENGTH; // Open gate
        targetY = startY;
      }
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
    }
    ctx.restore();
  };

  let openGate = (openGates) => {
    openGates.forEach((gate) => {
      gates[gate] = OPEN;
    });
  };

  SampleSpriteLibrary.track = (conditions) => {
    let ctx = conditions.ctx;
    let openGates = conditions.openGates;

    ctx.save();
    drawTrack(ctx);
    openGate(openGates);
    drawGates(ctx);
    ctx.restore();
  };

})();
