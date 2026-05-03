async function go() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()

    const temperature = weatherData.properties.periods[0].temperature

    console.log(temperature)
}

go()