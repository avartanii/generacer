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

    const getPlateX = place => (-270 + ((place - 1) * 180));

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

    console.log('horsedata: ', horseData);
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
          // console.log(horse, distance);
          // Assumes timeData is in seconds TODO: fix magic number
          horseTime.push((timeData[i] * 24) + (distance * 10 * 0.336) + 100);
        }
      }

      // console.log(horse, horseTime);

      const horseJSON = {
        sprite: horse, // TODO: FIX NAME ******************************************
        name: horseData[horse].name,
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

      console.log('s: ', (horseData[horse].s));
      console.log('q1: ', (horseData[horse].q1));
      console.log('q2: ', (horseData[horse].q2));
      console.log('q3: ', (horseData[horse].q3));
      console.log('q4: ', (horseData[horse].q4));

      const plateJSON = {
        sprite: `horsePlate${horseNumber}`,
        keyframes: [
          {
            frame: 0,
            tx: -270,
            ty: 362.5,
            showing: false,
          },

          {
            frame: 100,
            tx: getPlateX(horseData[horse].s),
            showing: horseData[horse].s < 5 || horseData[horse].q1 < 5,
          },

          {
            frame: horseTime[0],
            fraction: 'q1',
            tx: getPlateX(horseData[horse].q1),
            showing: horseData[horse].q1 < 5 || horseData[horse].q2 < 5,
          },

          {
            frame: horseTime[1],
            fraction: 'q2',
            tx: getPlateX(horseData[horse].q2),
            showing: horseData[horse].q2 < 5 || horseData[horse].q3 < 5,
          },

          {
            frame: horseTime[2],
            fraction: 'q3',
            tx: getPlateX(horseData[horse].q3),
            showing: horseData[horse].q3 < 5 || horseData[horse].q4 < 5,
          },

          {
            frame: horseTime[3],
            fraction: 'q4',
            tx: getPlateX(horseData[horse].q4),
            showing: horseData[horse].q4 < 5,
          },

          {
            frame: 7000,
            showing: false,
          },
        ],
      };

      scene.push(horseJSON);
      scene.push(plateJSON);
      horseNumber += 1;
    });

    const mask = {
      sprite: 'mask',
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

    scene.push(mask);

    const finalJSON = JSON.stringify(scene);
    console.log('scene: ', scene);

    localStorage.setItem('scene', finalJSON);
  };

  window.createJSON = createJSON;
})();
