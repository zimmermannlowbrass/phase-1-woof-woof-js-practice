fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then(data => pupList(data))

let allThePups = []

function pupList(data) {
    allThePups = []
    data.forEach(pup => allThePups.push(pup))
    createDogBar()
}

//Step 2
function createDogBar() {
    let dogBar = document.querySelector('#dog-bar')
    allThePups.forEach(function(pup) {
        let onePup = document.createElement('span')
        onePup.innerText = pup['name']
        onePup.id = pup['id']
        onePup.addEventListener('click', makeASuperStar)
        dogBar.appendChild(onePup)
        
    })
}


//Step 3
function makeASuperStar(e) {
    let dogContainer = document.querySelector('#dog-info')
    dogContainer.innerText = ''
    let superStarId = e.target.id - 1
    let superStar = allThePups[superStarId]
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')

    img.src = superStar['image']
    h2.innerText = superStar['name']
    h2.id = (superStarId + 1)
    let trueOrFalse = superStar['isGoodDog']
    if (trueOrFalse === true) {
        btn.innerText = 'Good Dog!!'
    } else {
        btn.innerText = 'Bad Dog...'
    }
    
    btn.id = 'dogStatus'
    //Step 4
    btn.addEventListener('click', changeIsGoodDog)

    dogContainer.appendChild(img)
    dogContainer.appendChild(h2)
    dogContainer.appendChild(btn)
}

//Step 4
function changeIsGoodDog() {
    let goodStatus = document.querySelector('#dogStatus')
    let doggoId = document.querySelector('h2').id
    let trueOrFalse

    if (goodStatus.innerText === 'Good Dog!!') {
        goodStatus.innerText = 'Bad Dog...'
        trueOrFalse = false
    } else if (goodStatus.innerText === 'Bad Dog...') {
        goodStatus.innerText = 'Good Dog!!'
        trueOrFalse = true
    }
    fetch(`http://localhost:3000/pups/${doggoId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {isGoodDog : trueOrFalse}
        )
    })
    
    let dogBar = document.querySelector('#dog-bar')
    if (filter.innerText === 'Filter good dogs: OFF') {
        dogBar.innerText = ''
        createDogBar()
    } else if (filter.innerText === 'Filter good dogs: ON') {
        dogBar.innerText = ''
        createDogBarOfGoodDogs()
    }
}


//Step 5

const filter = document.querySelector('#good-dog-filter')
filter.addEventListener('click', filterTheDogs)

function filterTheDogs (e) {
    let filterStatus = e.target.innerText
    let dogBar = document.querySelector('#dog-bar')
    if (filterStatus === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON'
        dogBar.innerText = ''
        createDogBarOfGoodDogs()
    } else if (filterStatus === 'Filter good dogs: ON') {
        e.target.innerText = 'Filter good dogs: OFF'
        dogBar.innerText = ''
        createDogBar()
    }
}

function createDogBarOfGoodDogs() {
    let dogBar = document.querySelector('#dog-bar')
    allThePups.forEach(function(pup) {
        if (pup['isGoodDog'] === true){
            let onePup = document.createElement('span')
            onePup.innerText = pup['name']
            onePup.id = pup['id']
            onePup.addEventListener('click', makeASuperStar)
            dogBar.appendChild(onePup)
        } 
    })
}