const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const APY_KEY = '&appid=4369dc6fd1f94f0a686bc9adbd547d28'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value 
	const URL = API_LINK + city + APY_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			// res.data.weather[0].id ; to samo podejście co niżej tylko za pomocą innej metody, łatwiejszej
			const status = Object.assign({}, ...res.data.weather)

			warning.textContent = ''
			input.value = ''

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute('src', './img/thunderstrom.png')
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute('src', './img/drizlle.png')
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute('src', './img/rain.png')
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute('src', './img/ice.png')
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknow.png')
			}

			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + '℃'
			humidity.textContent = hum + '%'
			weather.textContent = status.main
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}

const enterCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}
input.addEventListener('keyup', enterCheck)
button.addEventListener('click', getWeather)
