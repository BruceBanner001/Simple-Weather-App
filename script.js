const main = document.querySelector('.main');
const inputSearch = document.getElementById('searching');
const search = document.querySelector('button');
const countryName = document.getElementById('country');
const flag = document.getElementById('flag');
const weatherImage = document.getElementById('weather-image');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');

search.addEventListener('click', (event)=>{
    event.preventDefault();
    if(inputSearch.value !==''){
        getApi();
    }
})

//id generated from operweathermap.org 
const id = 'cbfd78b1e6839afc461f3c4a580d0e5d'; 
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${id}`;

//Creating function for Fetching Data From Weather API
function getApi(){
    fetch(`${url}&q=${inputSearch.value}`)
    .then(response =>response.json())
    .then(data =>{
        console.log(data); //Checking Whether we received data from API or not
        if(data.cod == 200){ //If we successfully received data from API the cod will be 200
            countryName.innerText = data.name;
            flag.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/32.png`);
            weatherImage.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
            temperature.innerHTML = `${data.main.temp}<sup>o</sup>`;
            weatherDescription.innerText = data.weather[0].description
            clouds.innerText = data.clouds.all+"%";
            humidity.innerText = data.main.humidity+"%";
            pressure.innerText = data.main.pressure+"hPa";
        }
        else{ //If we Enter wrong location
            main.classList.add('error');
            setTimeout(()=>{
                main.classList.remove('error')
            },500);
        }
        inputSearch.value = '';
    })
}
inputSearch.value = 'trichy';
getApi();