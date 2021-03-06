window.onload = (() => {
  const $submit = document.getElementById('form-submit');
  $submit.onclick = () => {
    const raceData = [];
    const timeData = [];
    let numberOfHorses = 0;
    for (let i = 0; i < 14; i += 1) {
      if (document.getElementById(`horse${i}`).value) {
        numberOfHorses += 1;
      }
    }

    for (let i = 0; i < numberOfHorses; i += 1) {
      const newHorse = [];
      newHorse.push(`horse${i}`);
      newHorse.push(document.getElementById(`horse${i}`).value);
      newHorse.push(parseFloat(document.getElementById(`start${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`quarter${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`quarter${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`half${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`half${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`three-quarter${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`three-quarter${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`stretch${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`stretch${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`final${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`final${i}pos`).value, 10));
      raceData.push(newHorse);
    }
    console.log('raceData calc: ', raceData);

    for (let i = 0; i < 4; i += 1) {
      timeData.push(parseFloat(document.getElementById(`time${i}`).value, 10));
    }

    console.log('timeData: ', timeData);

    localStorage.setItem('raceData', JSON.stringify(raceData));
    localStorage.setItem('timeData', JSON.stringify(timeData));
    window.location = '../../animation/keyframe-tweening-demo.html';
  };
})();
