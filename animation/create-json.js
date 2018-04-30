// let fs = require('fs'); // Can't use fs on front end. User in server once implemented
(() => {
  const createJSON = (raceData, timeData) => {
    console.log('creating');
    const horseData = {};
    const scene = [];

    const track = {
      sprite: 'track',
      keyframes: [
        {
          frame: 0,
          tx: 0,
          ty: 0,
          showing: true,
        },

        {
          frame: 7000,
          showing: false,
        },
      ],
    };

    scene.push(track);

    raceData.forEach((horse) => { // raceData is a 2D array
      horseData[horse[0]] = {
        name: horse[1], // Start
        s: horse[2], // Start
        q1: horse[3], // Quarter 1
        d1: horse[4], // Distance ahead
        q2: horse[5], // Half
        d2: horse[6], // Distance ahead
        q3: horse[7], // Three Quarters
        d3: horse[8], // Distance ahead
        str: horse[9], // Stretch
        dstr: horse[10], // Distance ahead
        q4: horse[11], // Finish
        d4: horse[12], // Distance ahead
      };
    });

    console.log(horseData);
    let horseNumber = 0;
    Object.keys(horseData).forEach((horse) => {
      const horseTime = [];

      for (let i = 0; i < timeData.length; i += 1) {
        if (horseData[horse][`q${i + 1}`] === 1) { // If first place horse
          // Assumes timeData is in seconds and last 3 are split times TODO: fix magic number
          horseTime.push((timeData[i] * 24) + 100);
        } else {
          let distance = 0;
          Object.keys(horseData).forEach((otherHorse) => {
            if (horseData[otherHorse][`q${i + 1}`] < horseData[horse][`q${i + 1}`]) {
              distance += horseData[otherHorse][`d${i + 1}`];
            }
          });
          console.log(horse, distance);
          // Assumes timeData is in seconds TODO: fix magic number
          horseTime.push((timeData[i] * 24) + (distance * 10 * 0.336) + 100);
        }
      }

      console.log(horse, horseTime);

      const horseJSON = {
        sprite: horse, // TODO: FIX NAME ******************************************
        keyframes: [
          {
            frame: 0,
            tx: 230,
            ty: -110 - (horseNumber * 10),
            showing: true,
          },

          {
            frame: 100,
            tx: 230,
            ty: -110 - (horseNumber * 10),
            openGate: true,
            showing: true,
          },

          {
            frame: horseTime[0],
            fraction: 'q1',
            tx: -250,
            ty: -110,
          },

          {
            frame: horseTime[1],
            fraction: 'q2',
            tx: -250,
            ty: 0,
          },

          {
            frame: horseTime[2],
            fraction: 'q3',
            tx: -250,
            ty: 110,
          },

          {
            frame: horseTime[3],
            fraction: 'q4',
            tx: 250,
            ty: 110,
          },

          {
            frame: 7000,
            showing: false,
          },
        ],
      };

      scene.push(horseJSON);
      horseNumber += 1;
    });

    const finalJSON = JSON.stringify(scene);
    console.log(scene);

    localStorage.setItem('scene', finalJSON);
  };

  window.createJSON = createJSON;
})();
