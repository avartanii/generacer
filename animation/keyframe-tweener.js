/*
* A simple keyframe-tweening animation module for 2D
* canvas elements.
*/
(() => {
  // The big one: animation initialization.  The settings parameter
  // is expected to be a JavaScript object with the following
  // properties:
  //
  // - renderingContext: the 2D canvas rendering context to use
  // - width: the width of the canvas element
  // - height: the height of the canvas element
  // - scene: the array of sprites to animate
  // - frameRate: number of frames per second (default 24)
  //
  // In turn, each sprite is a JavaScript object with the following
  // properties:
  //
  // - draw: the function that draws the sprite
  // - keyframes: the array of keyframes that the sprite should follow
  //
  // Finally, each keyframe is a JavaScript object with the following
  // properties.  Unlike the other objects, defaults are provided in
  // case a property is not present:
  //
  // - frame: the global animation frame number in which this keyframe
  //          is to appear
  // - ease: the easing function to use (default is KeyframeTweener.linear)
  // - tx, ty: the location of the sprite (default is 0, 0)
  // - sx, sy: the scale factor of the sprite (default is 1, 1)
  // - rotate: the rotation angle of the sprite (default is 0)
  let initializeAnimation = (settings) => {
    // We need to keep track of the current frame.
    let currentFrame = 0;

    let keyframeData = {};

    let vals = ['tx', 'ty', 'sx', 'sy', 'rotate', 'opacity', 'wingOpenAmount', 'aimAmount', 'howReady', 'showing', 'direction']

    let valueDefaults = {
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
    }

    // Avoid having to go through settings to get to the
    // rendering context and sprites.
    let renderingContext = settings.renderingContext;
    let width = settings.width;
    let height = settings.height;
    let scene = settings.scene;

    let previousTimestamp = null;

    let nextFrame = (timestamp) => {

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
      renderingContext.clearRect(0, 0, width, height);

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
            renderingContext.save();

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
                renderingContext.translate(
                  ease(currentTweenFrame, start, distance, duration),
                  0
                );
              } else if (val === 'ty') {
                renderingContext.translate(
                  0,
                  ease(currentTweenFrame, start, distance, duration)
                );
              } else if (val === 'sx' || val === 'sy') {
                renderingContext.scale(
                  ease(currentTweenFrame, start, distance, duration),
                  ease(currentTweenFrame, start, distance, duration)
                );
              } else if (val === 'rotate') {
                distance += start;
                start *=  -1 * Math.PI / 180;
                distance *= -1 * Math.PI / 180;
                distance -= start;
                renderingContext.rotate(
                  ease(currentTweenFrame, start, distance, duration)
                );
              } else if (val === 'opacity') {
                renderingContext.globalAlpha =
                  ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'wingOpenAmount') {
                wingOpenAmount = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'aimAmount') {
                aimAmount = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'howReady') {
                howReady = ease(currentTweenFrame, start, distance, duration);
              } else if (val === 'showing') {
                // if (i === 6) {
                //   console.log('keyframe: ', startKeyframe.showing);
                //   console.log('past    : ', past.val);
                // }
                showing = (startKeyframe.showing || past.val);
              } else if (val === 'direction') {
                direction = (startKeyframe.direction || past.val);
              }
            });
            // NEW CODE ***************************************************

            if (showing === true) {
              if (i === 6) {
                console.log("yo");
              }
              SampleSpriteLibrary[scene[i].sprite]({
                renderingContext,
                direction,
                wingOpenAmount,
                aimAmount,
                howReady
              });
            }

            // Clean up.
            renderingContext.restore();
          }
        }
      }

      // Move to the next frame.
      currentFrame += 1;
      previousTimestamp = timestamp;
      window.requestAnimationFrame(nextFrame);
    };

    for (let i = 0, maxI = scene.length; i < maxI; i++) {
      let currentSprite = scene[i]['sprite'];
      if (!(currentSprite in keyframeData)) {
        keyframeData[currentSprite] = {};
      }
      for (let j = 0, maxJ = scene[i].keyframes.length; j < maxJ; j += 1) {
        let currentKey = scene[i].keyframes[j];
        for (let property in currentKey) {
          if (currentKey.hasOwnProperty(property)) {
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
