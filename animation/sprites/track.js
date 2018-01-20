(() => {
  window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

  // Max number of gate slots on track
  const NUMBER_OF_GATES = 14;
  const OPEN = true;
  const CLOSED = false;
  const GATE_WIDTH = 10;

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
    ctx.moveTo(250, -250);
    ctx.lineTo(-250, -250);
    ctx.arc(-250, 0, 250, 3 / 2 * Math.PI, 1 / 2 * Math.PI, true);
    ctx.lineTo(250, 250);
    ctx.arc(250, 0, 250, 1 / 2 * Math.PI, 3 / 2 * Math.PI, true);
    ctx.lineTo(250, -100); // Gate line
    ctx.fillStyle = '#ffe6b5';
    ctx.fill();
    ctx.stroke();

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
    ctx.stroke();

    // Gates
    ctx.lineWidth = .5;
    for (let i = 1; i < 16; i += 1) {
      ctx.beginPath();
      let targetY = -250 + (10 * i);
      ctx.moveTo(250, targetY);
      ctx.lineTo(225, targetY);
      ctx.stroke();
    }

    ctx.restore();
  };

  // TODO: Clean up magic numbers
  // TODO: Adjust to display correctly
  let drawGates = (ctx) => {
    ctx.save();
    ctx.lineWidth = .5;
    for (let i = 0; i < Object.keys(gates).length; i += 1) {
      let startX = 225;
      let startY = -250 + (i * GATE_WIDTH);
      let targetX = startX;
      let targetY = -250 + ((i - 1) * GATE_WIDTH);
      if (gates[i]) {
        targetX = 215;
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
    console.log('gates: ', gates);
    openGates.forEach((gate) => {
      console.log('gate: ', gate);
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
