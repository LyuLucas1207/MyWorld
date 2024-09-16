
class Star {
    selector = '.section-banner';
    num = 125;
    range = 100;
    constructor(selector, num, range) {
        this.selector = selector;
        this.num = num;
        this.range = range;
    }
    get Selector() {
        return this.selector;
    }
    get Num() {
        return this.num;
    }
    get Range() {
        return this.range;
    }
}

function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function debounce(func, duration = 1000) {
    let timeId;//记录上一次的定时器
    return function (...args) { //传入剩余参数
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            func(...args);
        }, duration);
    };
}


function getRandomPosition(num, unit, range) {
    let position = [];
    for (let i = 0; i < num; i++) {
        let left = Math.floor(Math.random() * range - range / 2);
        let top = Math.floor(Math.random() * range - range / 2);
        let right = Math.floor(Math.random() * range - range / 2);
        let bottom = Math.floor(Math.random() * range - range / 2);
        position.push({
            left: `${left}${unit}`,
            top: `${top}${unit}`,
            right: `${right}${unit}`,
            bottom: `${bottom}${unit}`
        });
    }
    return position;
}

function createStar(StarClass) {
    if (!(StarClass instanceof Star)) {
        return;
    }
    document.querySelectorAll(StarClass.Selector).forEach((sectionBanner) => {
        if (!sectionBanner) {
            return;
        }
        let unit = window.innerWidth > 1300 ? 'vw' : 'vh';
        let position = getRandomPosition(StarClass.num, unit, StarClass.Range);
        for (let i = 0; i < StarClass.num; i++) {
            let starDiv = document.createElement('div');
            starDiv.id = `star-${i}`;
            starDiv.style.position = 'absolute';
            starDiv.style.transform = `translate(-50%, -50%)`;
            starDiv.style.left = position[i].left;// Fallback values
            starDiv.style.top = position[i].top;
            starDiv.style.left = `calc(50% + ${position[i].left})`;
            starDiv.style.top = `calc(50% + ${position[i].top})`;
            starDiv.style.animation = `twinkling ${Math.floor(Math.random() * 5 + 1)}s infinite`;

            let star_up = createElementWithClass('div', 'curved-corner-star');
            let star_down = createElementWithClass('div', 'curved-corner-star');
            let star_up_right = createElementWithClass('div', 'curved-corner-topright');
            let star_up_left = createElementWithClass('div', 'curved-corner-topleft');
            let star_down_right = createElementWithClass('div', 'curved-corner-bottomright');
            let star_down_left = createElementWithClass('div', 'curved-corner-bottomleft');

            star_up.appendChild(star_up_right);
            star_up.appendChild(star_up_left);
            star_down.appendChild(star_down_right);
            star_down.appendChild(star_down_left);
            starDiv.appendChild(star_down);
            starDiv.appendChild(star_up);
            sectionBanner.appendChild(starDiv);
        }
    });
}
function generateStar(StarClass) {
    if (!(StarClass instanceof Star)) {
        return;
    }
    let sectionBanner = document.querySelector(StarClass.Selector);
    if (!sectionBanner) {
        return;
    }
    while (sectionBanner.firstChild) {
        sectionBanner.removeChild(sectionBanner.firstChild);
    }
    createStar(StarClass);
    window.addEventListener('resize', debounce(function () {
        let sectionBanner = document.querySelector(StarClass.Selector);
        while (sectionBanner.firstChild) {
            sectionBanner.removeChild(sectionBanner.firstChild);
        }
        createStar(StarClass);
    }));
}

export { Star, generateStar };