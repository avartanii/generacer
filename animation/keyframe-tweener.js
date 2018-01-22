/*
* A simple keyframe-tweening animation module for 2D
* canvas elements.
*/
(() => {

  let initializeAnimation = (settings) => {
    // We need to keep track of the current frame.
    let currentFrame = 0;

    let keyframeData = {}; // parsed from scene.json
    let horseData = {};

    let vals = []; // values defined in keyframes

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
    let ctx = settings.ctx;
    let width = settings.width;
    let height = settings.height;
    let scene = settings.scene;

    let previousTimestamp = null;

    // Assuming horses' names, places, and distances are in 2D Array
    let calculateVelocities = (raceData, timeData) => {
      raceData.forEach((horse) => {
        horseData[horse] = {
          's': horse[1],   // Start
          'q1': horse[2],  // Quarter 1
          'd1': horse[3],  // Distance ahead
          'q2': horse[4],  // Half
          'd2': horse[5],  // Distance ahead
          'q3': horse[6],  // Three Quarters
          'd3': horse[7],  // Distance ahead
          'str': horse[8], // Stretch
          'd4': horse[9],  // Distance ahead
          'q4': horse[10],  // Finish
          'd5': horse[11]  // Distance ahead
        };
        if (horseData[horse]['q4'] === 1) {
          for (let i = 0; i < timeData.length - 1; i += 1) {
            horseData[horse][`v${i}`] = .25 / (timeData[i + 1] - timeData[i]); // TODO: replace with parameterized race length
          }
        }
      });
    };

    let around = (currentTime, start, distance, duration) => {
      let percentComplete = currentTime / duration;
      console.log("X: ", 100 * Math.cos((1 - percentComplete) * Math.PI / 2));
      console.log("Y: ", -100 * Math.sin((1 - percentComplete) * Math.PI / 2));
      return {
        'x': start - (100 * Math.cos((1 - percentComplete) * Math.PI / 2)),
        'y': start - (100 * Math.sin((1 - percentComplete) * Math.PI / 2))
      };
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
      if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 24))) {
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
            let wingOpenAmount;
            let aimAmount;
            let howReady;
            let showing;
            let direction;

            vals.forEach((val) => {
              // console.log('Val: ', val);
              // console.log('Val default: ', valueDefaults[val]);
              past = checkPastFrames(scene[i]['sprite'], val, valueDefaults[val]);
              future = checkFutureFrames(scene[i]['sprite'], val, valueDefaults[val]);

              start = startKeyframe[val] || past.val;
              distance = (endKeyframe[val] || future.val) - start;

              currentTweenFrame = currentFrame - past.frame;
              duration = future.frame - past.frame;

              if (val === 'tx') {
                let pos;
                let quarter = endKeyframe['fraction'];
                console.log("QUARTER: ", quarter);
                if (quarter === 'q2') {
                  pos = around(currentTweenFrame, (width / 2) + start, distance, duration, quarter);
                  ctx.translate(pos['x'], 0);
                } else if (quarter === 'q3') {
                  pos = around(currentTweenFrame, (width / 2) + start, distance, duration, quarter);
                  ctx.translate(pos['x'], 0);
                } else {
                  ctx.translate(
                    ease(currentTweenFrame, (width / 2) + start, distance, duration),
                    0
                  );
                }
              } else if (val === 'ty') {
                let pos;
                let quarter = endKeyframe['fraction'];
                if (quarter === 'q2') {
                  pos = around(currentTweenFrame, (height / 2) + start, distance, duration, quarter);
                  ctx.translate(0, pos['y']);
                } else if (quarter === 'q3') {
                  pos = around(currentTweenFrame, (height / 2) + start, distance, duration, quarter);
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
              } else if (val === 'wingOpenAmount') {
                wingOpenAmount = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'aimAmount') {
                aimAmount = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'howReady') {
                howReady = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'showing') {
                showing = (startKeyframe.showing || past.val);
              } else if (val === 'direction') {
                direction = (startKeyframe.direction || past.val);
              }
            });
            // NEW CODE ***************************************************

            let openGates = [1, 2, 5, 9];
            if (showing === true) {
              SampleSpriteLibrary[scene[i].sprite]({
                ctx,
                direction,
                wingOpenAmount,
                aimAmount,
                howReady,
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
