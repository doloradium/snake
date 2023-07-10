let retryButton = document.querySelector('.retry__button')
let buttons = document.querySelectorAll('.buttons__item')
let retry = document.querySelector('.retry__container')
let victory = document.querySelector('#victory')
let counter = document.querySelector('.counter')
let right = document.querySelector('#right')
let down = document.querySelector('#down')
let left = document.querySelector('#left')
let loss = document.querySelector('#loss')
let grid = document.querySelector('.grid')
let counterBuffer = counter.textContent
let up = document.querySelector('#up')
let allowMovement = true
let spikeValues = []
let markerTreat
let markerSpike

function movement(memoryCurrent, segment) {
    if (memoryCurrent.top == 1) {
        segment.style.top = `${+segment.style.top.slice(0, segment.style.top.length - 2) - getComputedStyle(grid).width.slice(0, getComputedStyle(grid).width.length - 2) / 10}px`
    } else if (memoryCurrent.left == 1) {
        segment.style.left = `${+segment.style.left.slice(0, segment.style.left.length - 2) - getComputedStyle(grid).width.slice(0, getComputedStyle(grid).width.length - 2) / 10}px`
    } else if (+segment.style.left.slice(0, segment.style.left.length - 2) +
        Math.round(getComputedStyle(segment).width.slice(0, getComputedStyle(segment).width.length - 2)) < window.innerWidth &&
        memoryCurrent.right == 1) {
        segment.style.left = `${+segment.style.left.slice(0, segment.style.left.length - 2) + getComputedStyle(grid).width.slice(0, getComputedStyle(grid).width.length - 2) / 10}px`
    } else if (+segment.style.top.slice(0, segment.style.top.length - 2) +
        Math.round(getComputedStyle(segment).height.slice(0, getComputedStyle(segment).height.length - 2)) < window.innerHeight &&
        memoryCurrent.bottom == 1) {
        segment.style.top = `${+segment.style.top.slice(0, segment.style.top.length - 2) + getComputedStyle(grid).width.slice(0, getComputedStyle(grid).width.length - 2) / 10}px`
    }
}

function segmentCreation() {
    window['segment' + counter.textContent] = document.createElement("div")
    window['segment' + counter.textContent].className = 'segment'
    window['segmentItem' + counter.textContent] = document.createElement("div")
    window['segmentItem' + counter.textContent].className = 'segment__item'
    if (counter.textContent == 0) {
        window['segment' + counter.textContent].style.top = '0'
        window['segment' + counter.textContent].style.left = '0'
        window['segmentItem' + counter.textContent].textContent = '◕▿◕'
    } else window['segmentItem' + counter.textContent].textContent = counter.textContent
    window['segment' + counter.textContent].prepend(window['segmentItem' + counter.textContent])
    if (counter.textContent > 0) {
        window['segment' + counter.textContent].style.top = window['segment' + (+counter.textContent - 1)].style.top
        window['segment' + counter.textContent].style.left = window['segment' + (+counter.textContent - 1)].style.left
    }
    window['segment' + counter.textContent].id = 'segment' + counter.textContent
    window['memory' + counter.textContent] = { top: 0, left: 0, right: 0, bottom: 0 }
    window['buffer' + counter.textContent] = { top: 0, left: 0, right: 0, bottom: 0 }
    grid.prepend(window['segment' + counter.textContent]);
}

function memory(number, top, bottom, left, right) {
    window['memory' + number].top = top
    window['memory' + number].bottom = bottom
    window['memory' + number].left = left
    window['memory' + number].right = right
}

function random(max) {
    return Math.floor(Math.random() * max)
}

function duplicates(item) {
    return new Set(item).size
}

function overlap(element1, element2) {
    const rectangle1 = element1.getBoundingClientRect()
    const rectangle2 = element2.getBoundingClientRect()

    return !(
        rectangle1.top > rectangle2.bottom ||
        rectangle1.right < rectangle2.left ||
        rectangle1.bottom < rectangle2.top ||
        rectangle1.left > rectangle2.right
    )
}

function spikeCreation() {
    for (let i = 0; i < 3; i++) {
        window['spikeContainer' + i] = document.createElement("div")
        window['spikeContainer' + i].className = 'spike__container'
        let spike = document.createElement("div")
        spike.classList.add('spike__item')
        let spikeRotated = document.createElement("div")
        spikeRotated.classList.add('spike__item', 'spike__item-rotated')
        window['spikeContainer' + i].prepend(spike)
        window['spikeContainer' + i].prepend(spikeRotated)
        grid.prepend(window['spikeContainer' + i])
        let segmentArray = document.querySelectorAll('.segment')
        do {
            markerSpike = false
            window['spikeContainer' + i].style.left = `${(random(8) + 1) * 10}%`
            window['spikeContainer' + i].style.top = `${(random(8) + 1) * 10}%`
            segmentArray.forEach((item) => {
                if (overlap(item, window['spikeContainer' + i])) markerSpike = true
            })
            let spikeArray = document.querySelectorAll('.spike__container')
            spikeValues = []
            spikeArray.forEach((item) => {
                spikeValues.push(item.style.left + item.style.top)
            })
            if (duplicates(spikeValues) != +i + 1) markerSpike = true
        } while (markerSpike == true)
    }
}

function treatCreation() {
    for (let i = 0; i < 3; i++) {
        window['treatContainer' + i] = document.createElement("div")
        window['treatContainer' + i].className = 'treat__container'
        let treat = document.createElement("div")
        treat.className = 'treat'
        window['treatContainer' + i].prepend(treat)
        grid.prepend(window['treatContainer' + i])
        let segmentArray = document.querySelectorAll('.segment')
        do {
            markerTreat = false
            window['treatContainer' + i].style.left = `${(random(8) + 1) * 10}%`
            window['treatContainer' + i].style.top = `${(random(8) + 1) * 10}%`
            segmentArray.forEach((item) => {
                if (overlap(item, window['treatContainer' + i])) markerTreat = true
            })
            let treatArray = document.querySelectorAll('.treat__container')
            let treatValues = []
            treatArray.forEach((item) => {
                treatValues.push(item.style.left + item.style.top)
            })
            if (duplicates(treatValues) != +i + 1) markerTreat = true
            for (let j = 0; j < 3; j++) {
                let currentTreat = treatArray[0].style.left + treatArray[0].style.top
                if (currentTreat == spikeValues[j]) markerTreat = true
            }
        } while (markerTreat == true)
    }
    let alltreatsbiggballs = document.querySelectorAll('.treat__container')
    alltreatsbiggballs.forEach((item) => { item.style.opacity = '1' })
}

function squareSpawn(property, row, column) {
    let square = document.createElement("div")
    square.className = property
    square.style.left = `${row * 10}%`
    square.style.top = `${column * 10}%`
    grid.prepend(square)
}

function popUp(hiddenText, visibleText) {
    segmentItem0.textContent = '×▿×'
    memory(0, 0, 0, 0, 0)
    for (let i = 0; i <= counter.textContent; i++) {
        memory(i, 0, 0, 0, 0)
    }
    allowMovement = false
    visibleText.classList.remove('hidden')
    hiddenText.classList.add('hidden')
    retry.classList.remove('hidden')
    setTimeout(() => { retry.classList.remove('visually-hidden') }, 20)
}

document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyW' && memory0.bottom != 1 && allowMovement == true) {
        up.classList.add('buttons__item-active')
        memory(0, 1, 0, 0, 0)
        document.querySelector('#up > * > g > *').classList.add('buttons__image-active')
        setTimeout(() => {
            up.classList.remove('buttons__item-active')
            document.querySelector('#up > * > g > *').classList.remove('buttons__image-active')
        }, 200)
    } else if (e.code == 'KeyA' && memory0.right != 1 && allowMovement == true) {
        left.classList.add('buttons__item-active')
        memory(0, 0, 0, 1, 0)
        document.querySelector('#left > * > g > *').classList.add('buttons__image-active')
        setTimeout(() => {
            left.classList.remove('buttons__item-active')
            document.querySelector('#left > * > g > *').classList.remove('buttons__image-active')
        }, 200)
    } else if (e.code == 'KeyD' && memory0.left != 1 && allowMovement == true) {
        right.classList.add('buttons__item-active')
        memory(0, 0, 0, 0, 1)
        document.querySelector('#right > * > g > *').classList.add('buttons__image-active')
        setTimeout(() => {
            right.classList.remove('buttons__item-active')
            document.querySelector('#right > * > g > *').classList.remove('buttons__image-active')
        }, 200)
    } else if (e.code == 'KeyS' && memory0.top != 1 && allowMovement == true) {
        down.classList.add('buttons__item-active')
        memory(0, 0, 1, 0, 0)
        document.querySelector('#down > * > g > *').classList.add('buttons__image-active')
        setTimeout(() => {
            down.classList.remove('buttons__item-active')
            document.querySelector('#down > * > g > *').classList.remove('buttons__image-active')
        }, 200)
    }
})

buttons.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.id == 'up' && memory0.bottom != 1 && allowMovement == true) {
            memory(0, 1, 0, 0, 0)
        } else if (item.id == 'left' && memory0.right != 1 && allowMovement == true) {
            memory(0, 0, 0, 1, 0)
        } else if (item.id == 'right' && memory0.left != 1 && allowMovement == true) {
            memory(0, 0, 0, 0, 1)
        } else if (item.id == 'down' && memory0.top != 1 && allowMovement == true) {
            memory(0, 0, 1, 0, 0)
        }
    })
})

retryButton.addEventListener('click', () => {
    document.querySelectorAll('.treat__container').forEach((item) => item.remove())
    document.querySelectorAll('.spike__container').forEach((item) => item.remove())
    document.querySelectorAll('.segment').forEach((item) => item.remove())
    counterBuffer = 0
    counter.textContent = '0'
    segmentCreation()
    spikeCreation()
    treatCreation()
    retry.classList.add('visually-hidden')
    setTimeout(() => { retry.classList.add('hidden') }, 300)
    allowMovement = true
})

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (i % 2 == 0 && j % 2 == 0) {
            squareSpawn('light-square', j, i)
        } else if (i % 2 == 1 && j % 2 == 0) {
            squareSpawn('dark-square', j, i)
        } else if (i % 2 == 0 && j % 2 == 1) {
            squareSpawn('dark-square', j, i)
        } else if (i % 2 == 1 && j % 2 == 1) {
            squareSpawn('light-square', j, i)
        }
    }
}

segmentCreation()
spikeCreation()
treatCreation()

setInterval(function () {
    let treat = document.querySelectorAll('.treat__container')
    let spikeCollision = document.querySelectorAll('.spike__item')
    let segmentAll = [...document.querySelectorAll('.segment__item')].reverse()
    grid.style.height = getComputedStyle(grid).width
    segmentAll.splice(0, 1)
    segmentAll.forEach((item) => {
        if (overlap(segmentItem0, item)) {
            popUp(victory, loss)
        }
    })
    if (+segment0.style.left.slice(0, segment0.style.left.length - 2) < -1 ||
        +segment0.style.top.slice(0, segment0.style.top.length - 2) < -1 ||
        +segment0.style.left.slice(0, segment0.style.left.length - 2) > getComputedStyle(grid).width.slice(0, getComputedStyle(grid).width.length - 2) ||
        +segment0.style.top.slice(0, segment0.style.top.length - 2) > getComputedStyle(grid).height.slice(0, getComputedStyle(grid).height.length - 2)) {
        popUp(victory, loss)
    }
    spikeCollision.forEach((item) => {
        if (overlap(segment0, item)) {
            popUp(victory, loss)
        }
    })
    if (treat.length < 1) {
        treatCreation()
    }
    if (counterBuffer != counter.textContent) {
        segmentCreation()
    }
    for (let i = 0; i < +counter.textContent + 1; i++) {
        movement(window['memory' + i], window['segment' + i])
        window['buffer' + i] = window['memory' + i]
        if (i != 0) {
            window['memory' + i] = { ...window['buffer' + (i - 1)] }
        }
    }
    counterBuffer = counter.textContent
    treat.forEach((item) => {
        if (overlap(segmentItem0, item.children[0])) {
            counter.textContent = +counter.textContent + 1
            item.remove()
        }
    })
    if (counter.textContent == 10) {
        popUp(loss, victory)
    }
}, 250)