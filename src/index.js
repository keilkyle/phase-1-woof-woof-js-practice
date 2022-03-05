let dogBar = document.querySelector("#dog-bar")
let dogStar = document.querySelector("#dog-info")

fetch("http://localhost:3000/pups")
.then(resp =>resp.json())
.then(data => {
    for (dog in data) {
        let name = data[dog].name
        let span = document.createElement("span")
        span.innerText = name
        span.id = dog
        dogBar.appendChild(span)
    }
    
    let buttons = dogBar.getElementsByTagName("span")
    for (button in buttons) {
        buttons[button].addEventListener("click", showDoggo)
    }
})

function showDoggo (e){
    let name = e.target.innerText
    fetch(`http://localhost:3000/pups`)
    .then(resp =>resp.json())
    .then(data => {
        for (dog in data) {
            if (data[dog].name === name) {
                let goodness = ""
                if (data[dog].isGoodDog) {goodness = "Good dog!"} else {goodness = "Bad dog!"}
                let div = `<img src="${data[dog].image}" />
                <h2>${data[dog].name}</h2>
                <button>${goodness}</button>`
                dogStar.innerHTML = div
                dogStar.querySelector("button").id = `${data[dog].id}`
                dogStar.querySelector("button").addEventListener("click", goodBadToggle)
            }
        }
    }
)}

function goodBadToggle (e) {
    let id = e.target.id
    let finalGoodness
    
    if (e.target.innerText === "Good dog!") {
        finalGoodness = false
        e.target.innerText = "Bad dog!"
    } else {
        finalGoodness = true
        e.target.innerText = "Good dog!"
    }

    console.log(id)
    console.log(finalGoodness)

    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog: finalGoodness})
        })
    .then(resp => resp.json())
    } 
