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
  let raceData = [
    // ['Arewehavingfunyet', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    // ['Maddizaskar', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    // ['Perina\'s Pride', 2, 2, .5, 2, .5, 4, 0, 4, 0, 3, 18.5],
    // ['Spa Town Parade', 4, 3, 1, 3, .5, 3, .5, 3, 1.5, 4, 0],
    ['horse', 1, 1, 1, 1, 1, 1, 1 / 2, 1, 1 / 2, 1, 1 / 2],
    ['horse1', 3, 4, 0, 4, 0, 2, 1 / 2, 2, 1, 2, 4.25],
    ['horse2', 2, 2, .5, 2, .5, 4, 0, 4, 0, 3, 18.5],
    ['horse3', 4, 3, 1, 3, .5, 3, .5, 3, 1.5, 4, 0],
  ];
  // let timeData = [24.90, 49.96, 74.70, 99.77];
  let timeData = [7, 10, 13, 20];
  createJSON(raceData, timeData);

  // $.getJSON("scene.json").then((scene) => {
  let sceneJSON = JSON.parse(localStorage.getItem('scene'));
  // $.getJSON().then((scene) => {
  let canvas = $("#canvas")[0];
  KeyframeTweener.initialize({
    ctx: canvas.getContext("2d"),
    width: canvas.width,
    height: canvas.height,
    scene: sceneJSON
    // scene: scene
  });
  // });
})();
