/*
* A simple keyframe-tweening animation module for 2D
* canvas elements.
*/
(() => {

  let initializeAnimation = (settings) => {
    // We need to keep track of the current frame.
    let currentFrame = 0;

    let keyframeData = {}; // parsed from scene.json

    let vals = []; // values defined in keyframes

    let openGates = [];

    let valueDefaults = { // default values for values in vals[]
      tx: 0,
      ty: 0,
      sx: 1.0,
      sy: 1.0,
      rotate: 0,
      opacity: 1.0,
      wingOpenAmount: 0.0,
      aimAmount: 0.0,
      howReady: 0.0,
      showing: false,
      direction: 1.0
    };

    // Avoid having to go through settings to get to the
    // rendering context and sprites.
    const { ctx } = settings;
    const { width } = settings;
    const { height } = settings;
    const { scene } = settings;
    const raceData = JSON.parse(localStorage.getItem('raceData'));

    // const raceData = [
    // //   // ['Arewehavingfunyet', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    // //   // ['Maddizaskar', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    // //   // ['Perina\'s Pride', 2, 2, 0.5, 2, .5, 4, 0, 4, 0, 3, 18.5],
    // //   // ['Spa Town Parade', 4, 3, 1, 3, .5, 3, .5, 3, 1.5, 4, 0],
    //   // ['horse0', 'horse0', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    //   // ['horse1', 'horse1', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    //   // ['horse2', 'horse2', 2, 2, 0.5, 2, 0.5, 4, 0, 4, 0, 3, 18.5],
    //   // ['horse3', 'horse3', 4, 3, 1, 3, 0.5, 3, 0.5, 3, 1.5, 4, 0],
    //   ['horse0', 'horse0', 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1.5],
    //   ['horse1', 'horse1', 1, 2, 2, 1, 1.5, 2, 2, 1, 1, 1, 2.25],
    //   ['horse2', 'horse2', 4, 3, 1.5, 3, 2, 3, 1.5, 3, 2, 3, 3],
    //   ['horse3', 'horse3', 3, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0],
    // ];


    console.log('scene mutha: ', scene);
    console.log('raceData mutha: ', raceData);

    let previousTimestamp = null;

    const around = (currentTime, start, distance, duration, quarter, positionChange) => {
      const percentComplete = currentTime / duration;
      const posChange = positionChange > 0 ? positionChange : 0;
      const posChangeFactor = percentComplete < 0.5 ? 20 * percentComplete : 20 * ((1 - percentComplete));
      // console.log('positionChange: ', posChange, posChangeFactor);
      if (quarter === 'q2') {
        return {
          x: start - ((110 + (posChange * posChangeFactor)) * Math.cos(((1 - percentComplete) * Math.PI) / 2)),
          y: start + ((110 + (posChange * posChangeFactor)) * (1 - Math.sin(((1 - percentComplete) * Math.PI) / 2))),
        };
      } else if (quarter === 'q3') {
        return {
          x: start - ((110 + (posChange * posChangeFactor)) * Math.cos((percentComplete * Math.PI) / 2)),
          y: start + ((110 + (posChange * posChangeFactor)) * Math.sin((percentComplete * Math.PI) / 2))
        };
      } else if (quarter === 'q4') {
        return {
          y: start + (posChange * posChangeFactor),
        };
      }
    };

    // Check previous keyframes for value if undefined at current keyframe
    let checkPastFrames = (sprite, value, defaultVal) => {
      if (keyframeData[sprite].hasOwnProperty(value)) {
        let reference = keyframeData[sprite][value];
        let previousFrame = 0;
        for (let frameNumber in reference) {
          if (reference.hasOwnProperty(frameNumber)) {
            if (frameNumber > currentFrame) {
              return {val: (reference[previousFrame] || defaultVal), frame: previousFrame};
            } else {
              previousFrame = frameNumber;
            }
          }
        }
        return {val: reference[previousFrame], frame: currentFrame};
      } else {
        return {val: defaultVal, frame: currentFrame};
      }
    };

    // Check future keyframes for value if undefined at current keyframe
    let checkFutureFrames = (sprite, value, defaultVal) => {
      if (keyframeData[sprite].hasOwnProperty(value)) {
        let reference = keyframeData[sprite][value];
        let lastFrame = 0;
        for (let frameNumber in reference) {
          if (reference.hasOwnProperty(frameNumber)) {
            if (frameNumber > currentFrame) {
              return {val: reference[frameNumber], frame: frameNumber};
            } else if (frameNumber < currentFrame) {
              lastFrame = frameNumber;
            }
          }
        }
        return {val: reference[lastFrame], frame: lastFrame};
      } else {
        return {val: defaultVal, frame: currentFrame};
      }
    };

    let nextFrame = (timestamp) => {

      // Bail-out #1: We just started.
      if (!previousTimestamp) {
        previousTimestamp = timestamp;
        window.requestAnimationFrame(nextFrame);
        return;
      }

      // Bail-out #2: Too soon.
      if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 120))) {
        window.requestAnimationFrame(nextFrame);
        return;
      }

      // Clear the canvas.
      ctx.clearRect(0, 0, width, height);

      // For every sprite, go to the current pair of keyframes.
      // Then, draw the sprite based on the current frame.
      for (let i = 0, maxI = scene.length; i < maxI; i += 1) {
        for (let j = 0, maxJ = scene[i].keyframes.length - 1; j < maxJ; j += 1) {

          let currentKeyframe = scene[i].keyframes[j];

          // We look for keyframe pairs such that the current
          // frame is between their frame numbers.
          if ((currentKeyframe.frame <= currentFrame) &&
          (currentFrame < scene[i].keyframes[j + 1].frame)) {

            // Point to the start and end keyframes.
            let startKeyframe = currentKeyframe;
            let endKeyframe = scene[i].keyframes[j + 1];

            // Save the rendering context state.
            ctx.save();

            // Set up our start and distance values, using defaults
            // if necessary.
            let ease = KeyframeTweener[startKeyframe.ease || checkPastFrames(scene[i]['sprite'], 'ease', 'linear').val];

            // NEW CODE ***************************************************
            let past;
            let future;
            let start;
            let distance;
            let currentTweenFrame;
            let duration;
            let showing;

            vals.forEach((val) => {
              past = checkPastFrames(scene[i]['sprite'], val, valueDefaults[val]);
              future = checkFutureFrames(scene[i]['sprite'], val, valueDefaults[val]);

              start = startKeyframe[val] || past.val;
              distance = (endKeyframe[val] || future.val) - start;

              currentTweenFrame = currentFrame - past.frame;
              duration = future.frame - past.frame;

              if (val === 'tx') {
                let pos;
                let positionChange;
                let quarter = endKeyframe['fraction'];
                if (quarter === 'q2' && !scene[i].sprite.includes('Plate')) {
                  positionChange = i > 0 ? raceData[(i - 1) / 2][7] - raceData[(i - 1) / 2][5] : 0;
                  pos = around(currentTweenFrame, (width / 2) + start, distance, duration, quarter, positionChange);
                  ctx.translate(pos['x'], 0);
                } else if (quarter === 'q3' && !scene[i].sprite.includes('Plate')) {
                  positionChange = i > 0 ? raceData[(i - 1) / 2][9] - raceData[(i - 1) / 2][7] : 0;
                  pos = around(currentTweenFrame, (width / 2) + start, distance, duration, quarter, positionChange);
                  ctx.translate(pos['x'], 0);
                } else {
                  ctx.translate(
                    ease(currentTweenFrame, (width / 2) + start, distance, duration),
                    0
                  );
                }
              } else if (val === 'ty') {
                let pos;
                let positionChange;
                let quarter = endKeyframe['fraction'];
                if (quarter === 'q2' && !scene[i].sprite.includes('Plate')) {
                  positionChange = i > 0 ? raceData[(i - 1) / 2][7] - raceData[(i - 1) / 2][5] : 0;
                  pos = around(currentTweenFrame, (height / 2) + start, distance, duration, quarter, positionChange);
                  ctx.translate(0, pos['y']);
                } else if (quarter === 'q3' && !scene[i].sprite.includes('Plate')) {
                  positionChange = i > 0 ? raceData[(i - 1) / 2][9] - raceData[(i - 1) / 2][7] : 0;
                  pos = around(currentTweenFrame, (height / 2) + start, distance, duration, quarter, positionChange);
                  ctx.translate(0, pos['y']);
                } else if (quarter === 'q4' && !scene[i].sprite.includes('Plate')) {
                  positionChange = i > 0 ? raceData[(i - 1) / 2][9] - raceData[(i - 1) / 2][7] : 0;
                  pos = around(currentTweenFrame, (height / 2) + start, distance, duration, quarter, positionChange);
                  ctx.translate(0, pos['y']);
                } else {
                  ctx.translate(
                    0,
                    ease(currentTweenFrame, (height / 2) + start, distance, duration)
                  );
                }
              } else if (val === 'sx' || val === 'sy') {
                ctx.scale(
                  ease(currentTweenFrame, start, distance, duration),
                  ease(currentTweenFrame, start, distance, duration)
                );
              } else if (val === 'rotate') {
                distance += start;
                start *= -1 * Math.PI / 180;
                distance *= -1 * Math.PI / 180;
                distance -= start;
                ctx.rotate(
                  ease(currentTweenFrame, start, distance, duration)
                );
              } else if (val === 'opacity') {
                ctx.globalAlpha =
                ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'showing') {
                showing = (startKeyframe.showing || past.val);
              } else if (val === 'openGate') {
                if (start) {
                  openGates.push((i - 1) / 2);
                }
              }
            });
            // NEW CODE ***************************************************

            if (showing === true) {
              SampleSpriteLibrary[scene[i].sprite]({
                ctx,
                openGates
              });
            }

            // Clean up.
            ctx.restore();
          }
        }
      }

      // Move to the next frame.
      currentFrame += 1;
      previousTimestamp = timestamp;
      window.requestAnimationFrame(nextFrame);
    };

    // Populate keyframe object with scene information
    for (let i = 0, maxI = scene.length; i < maxI; i++) {
      let currentSprite = scene[i]['sprite'];
      if (!(currentSprite in keyframeData)) {
        keyframeData[currentSprite] = {};
      }
      for (let j = 0, maxJ = scene[i].keyframes.length; j < maxJ; j += 1) {
        let currentKey = scene[i].keyframes[j];
        for (let property in currentKey) {
          if (currentKey.hasOwnProperty(property)) {
            if (!vals.includes(property)) {
              vals.push(property);
            }
            if (!(property in keyframeData[currentSprite])) {
              keyframeData[currentSprite][property] = {};
              keyframeData[currentSprite][property][currentKey.frame] = currentKey[property];
            } else {
              keyframeData[currentSprite][property][currentKey.frame] = currentKey[property];
            }
          }
        }
      }
    }

    window.requestAnimationFrame(nextFrame);
  };

  window.KeyframeTweener = {
    // The module comes with a library of common easing functions.
    linear: (currentTime, start, distance, duration) => {
      let percentComplete = currentTime / duration;
      return distance * percentComplete + start;
    },

    quadEaseIn: (currentTime, start, distance, duration) => {
      let percentComplete = currentTime / duration;
      return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut: (currentTime, start, distance, duration) => {
      let percentComplete = currentTime / duration;
      return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut: (currentTime, start, distance, duration) => {
      let percentComplete = currentTime / (duration / 2);
      return (percentComplete < 1) ?
        (distance / 2) * percentComplete * percentComplete + start :
        (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    easeInOutCirc: function (currentTime, start, distance, duration) {
      if ((currentTime /= duration / 2) < 1) {
        return -distance / 2 * (Math.sqrt(1 - currentTime * currentTime) - 1) + start;
      }
      return distance / 2 * (Math.sqrt(1 - (currentTime -= 2) * currentTime) + 1) + start;
    },

    easeOutBounce: function (currentTime, start, distance, duration) {
      if ((currentTime /= duration) < (1 / 2.75)) {
        return distance * (7.5625 * currentTime * currentTime) + start;
      } else if (currentTime < (2 / 2.75)) {
        return distance * (7.5625 * (currentTime -= (1.5 / 2.75)) * currentTime + .75) + start;
      } else if (currentTime < (2.5 / 2.75)) {
        return distance * (7.5625 * (currentTime -= (2.25 / 2.75)) * currentTime + .9375) + start;
      } else {
        return distance * (7.5625 * (currentTime -= (2.625 / 2.75)) * currentTime + .984375) + start;
      }
    },

    initialize: initializeAnimation
  };
})();
