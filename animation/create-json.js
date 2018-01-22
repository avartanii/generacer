// let fs = require('fs'); // Can't use fs on front end. User in server once implemented
(() => {

  let createJSON = (raceData, timeData) => {
    console.log('creating');
    let horseData = {};
    let scene = [];

    let track = {
      'sprite': 'track',
      'keyframes': [
        {
          'frame': 0,
          'tx': 0,
          'ty': 0,
          'showing': true
        },

        {
          'frame': 7000,
          'showing': false
        }
      ]
    };

    scene.push(track);

    raceData.forEach((horse) => { // raceData is a 2D array
      horseData[horse[0]] = {
        's': horse[1],   // Start
        'q1': horse[2],  // Quarter 1
        'd1': horse[3],  // Distance ahead
        'q2': horse[4],  // Half
        'd2': horse[5],  // Distance ahead
        'q3': horse[6],  // Three Quarters
        'd3': horse[7],  // Distance ahead
        'str': horse[8], // Stretch
        'dstr': horse[9],  // Distance ahead
        'q4': horse[10],  // Finish
        'd4': horse[11]  // Distance ahead
      };
    });

    console.log(horseData);
    let horseNumber = 0;
    for (let horse in horseData) {
      let horseTime = [];

      for (let i = 0; i < timeData.length; i += 1) {
        if (horseData[horse][`q${i + 1}`] === 1) { // If first place horse
          horseTime.push((timeData[i] * 24) + 100); // Assumes timeData is in seconds and last 3 are split times TODO: fix magic number
        } else {
          let distance = 0;
          for (let otherHorse in horseData) {
            if (horseData[otherHorse][`q${i + 1}`] < horseData[horse][`q${i + 1}`]) {
              distance += horseData[otherHorse][`d${i + 1}`];
            }
          }
          console.log(horse, distance);
          horseTime.push((timeData[i] * 24) + (distance * 10 * 3) + 100); // Assumes timeData is in seconds TODO: fix magic number
        }
      }

      console.log(horse, horseTime);

      let horseJSON = {
        'sprite': horse, // TODO: FIX NAME ******************************************
        'keyframes': [
          {
            'frame': 0,
            'tx': 230,
            'ty': -110 - (horseNumber * 10),
            'showing': true
          },

          {
            'frame': 100,
            'tx': 230,
            'ty': -110 - (horseNumber * 10),
            'openGate': true,
            'showing': true
          },

          {
            'frame': horseTime[0],
            'fraction': 'q1',
            'tx': -250,
            // 'tx': -78.5,
            'ty': -110
          },

          {
            'frame': horseTime[1],
            'fraction': 'q2',
            'tx': -250,
            'ty': 0
          },

          {
            'frame': horseTime[2],
            'fraction': 'q3',
            'tx': -250,
            'ty': 110
          },

          {
            'frame': horseTime[3],
            'fraction': 'q4',
            'tx': 250,
            'ty': 110
          },

          {
            'frame': 7000,
            'showing': false
          }
        ]
      };

      scene.push(horseJSON);
      horseNumber += 1;
    }

    let finalJSON = JSON.stringify(scene);
    console.log(scene);

    localStorage.setItem('scene', finalJSON);

    // fs.writeFile('scene.json', finalJSON);

  };

  window.createJSON = createJSON;
})();
