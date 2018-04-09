window.onload = (() => {
  console.log('hi');
  const $submit = document.getElementById('form-submit');
  $submit.onclick = () => {
    console.log('hello');
    const raceData = [];
    let numberOfHorses = 0;
    for (let i = 0; i < 14; i += 1) {
      console.log(document.getElementById(`horse${i}`).value);
      if (document.getElementById(`horse${i}`).value) {
        numberOfHorses += 1;
      }
    }
    console.log('numberOfHorses: ', numberOfHorses);

    for (let i = 0; i < numberOfHorses; i += 1) {
      const newHorse = [];
      newHorse.push(document.getElementById(`horse${i}`).value);
      newHorse.push(parseFloat(document.getElementById(`start${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`quarter${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`quarter${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`half${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`half${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`three-quarter${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`three-quarter${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`stretch${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`stretch${i}pos`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`final${i}`).value, 10));
      newHorse.push(parseFloat(document.getElementById(`final${i}pos`).value, 10));
      raceData.push(newHorse);
    }
    console.log('raceData calc: ', raceData);

    localStorage.setItem('raceData', JSON.stringify(raceData));
    window.location = '../../animation/keyframe-tweening-demo.html';
  };
  console.log($submit);
})();
