/*
* This file demonstrates how our homebrew keyframe-tweening
* engine is used.
*/
(() => {
  // We assume that our sample sprite library and keyframe tweener object are available.
  // We download our scene then render it when it's in. For larger scenes, you might want
  // to stick in a "loading" animation while the JSON file is being downloaded.

  // Mainly, it needs to know the rendering context to use.  And the animations to display,
  // of course.
  console.log('RACE DATA: ', JSON.parse(localStorage.getItem('raceData')));
  console.log('TIME DATA: ', JSON.parse(localStorage.getItem('timeData')));
  console.log('********************************************************');
  const raceData = [
    // ['Arewehavingfunyet', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    // ['Maddizaskar', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    // ['Perina\'s Pride', 2, 2, 0.5, 2, .5, 4, 0, 4, 0, 3, 18.5],
    // ['Spa Town Parade', 4, 3, 1, 3, .5, 3, .5, 3, 1.5, 4, 0],
    // ['horse0', 'horse0', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    // ['horse1', 'horse1', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    // ['horse2', 'horse2', 2, 2, 0.5, 2, 0.5, 4, 0, 4, 0, 3, 18.5],
    // ['horse3', 'horse3', 4, 3, 1, 3, 0.5, 3, 0.5, 3, 1.5, 4, 0],
    ['horse0', 'horse0', 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1.5],
    ['horse1', 'horse1', 1, 2, 2, 1, 1.5, 2, 2, 1, 1, 1, 2.25],
    ['horse2', 'horse2', 4, 3, 1.5, 3, 2, 3, 1.5, 3, 2, 3, 3],
    ['horse3', 'horse3', 3, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0],
  ];
  const newRaceData = JSON.parse(localStorage.getItem('raceData'));
  const newTimeData = JSON.parse(localStorage.getItem('timeData'));
  // const timeData = [24.90, 49.96, 74.70, 99.77];
  // const timeData = [7, 10, 13, 20];
  createJSON(newRaceData, newTimeData);

  const sceneJSON = JSON.parse(localStorage.getItem('scene'));
  const canvas = $('#canvas')[0];
  KeyframeTweener.initialize({
    ctx: canvas.getContext('2d'),
    width: canvas.width,
    height: canvas.height,
    scene: sceneJSON,
  });
})();
