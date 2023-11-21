const pianokeys = document.querySelectorAll(".piano-keys .key");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

const volumeSlider = document.querySelector(".volume-slider input");

const keysCheck = document.querySelector(".keys-check input");

const showHideKeys = () => {
    pianokeys.forEach(key => key.classList.toggle("hide"));
}

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`
    audio.play();

    const clickkedKey = 
    document.querySelector(`[data-key="${key}"]`);
    clickkedKey.classList.add("active");
    setTimeout(()=>{
        clickkedKey.classList.remove("active");
    }, 150)
};
pianokeys.forEach((key)=>{
    console.log(key.dataset.key);
    key.addEventListener("click", ()=> playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {

    if(mapedKeys.includes(e.key)){
        playTune(e.key);
    }
    
});


const handleVolume = (e) => {
    audio.volume = e.target.value;
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);