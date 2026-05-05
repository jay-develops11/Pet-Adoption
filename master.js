const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function go() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()

    const temperature = weatherData.properties.periods[0].temperature
    document.querySelector("#current-temp").textContent = temperature

}

go()

async function petsArea() {
    const petsPromise = await fetch("https://petsprojectadoption.netlify.app/.netlify/functions/pets")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const clone = template.content.cloneNode(true)

        clone.querySelector(".pet-cards").dataset.species = pet.species

        clone.querySelector("h3").textContent = pet.name
        clone.querySelector(".pet-description").textContent = pet.description
        clone.querySelector(".pet-age").textContent = ageText(pet.birthYear)

        if (!pet.photo) pet.photo = "images/fallback.jpg"

        clone.querySelector(".photos img").src = pet.photo
        clone.querySelector(".photos img").alt = `A ${pet.species} named ${pet.name}.`

        wrapper.appendChild(clone)

    })
    document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function ageText(birthYear) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (age == 1) return "1 year old"
    if (age == 0) return "Less than a year old"

    return `${age} years old`
}

// mid section buttons
const allButtons = document.querySelectorAll(".mid-section button")

allButtons.forEach(lu => {
    lu.addEventListener("click", buttonClick)
})

function buttonClick(ev) {
    // remove active class from all buttons
    allButtons.forEach(lu => lu.classList.remove("active"))

    // add active class to the clicked button
    ev.target.classList.add("active")

    // filter the pets based on the button clicked
    const filter = ev.target.dataset.moon
    document.querySelectorAll(".pet-cards").forEach(lu => {
        if (filter == lu.dataset.species || filter == "all") {
            lu.style.display = "grid"
        } else {
            lu.style.display = "none"
        }
    })
}