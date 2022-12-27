const animationList = ['fadeInUp'];
const animateShowUpScene = "animate__fadeIn"
const animateShowOutScene = "animate__fadeOut"
const welcomeMessage = ["Olá!", "Conheça meus projetos"]
let animationDelay = 1500;
let allowScroll = true;

window.onload = function() {
    if (document.getElementsByTagName('title')[0].innerHTML === "Projetos") {
        animationDelay = 0; allowScroll = false;
        bindDropdownEvents();
    }
    
    setTimeout(() => {
        observerTo('animation-children', animateObserver);
        if (allowScroll) {
            document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
        }
    }, animationDelay);

    if (document.getElementById('welcome') !== null) {
        new TypeIt("#welcome", {
            strings: welcomeMessage,
            speed: 25,
            waitUntilVisible: true,
        }).go();   
    }
}

const bindDropdownEvents = () => {
    const dropdownButtons = Array.from(document.getElementsByClassName('dropdown-button'));
    if (dropdownButtons.length > 0 || dropdownButtons !== null) {
        dropdownButtons.forEach(button => {
            addEvent(button, 'click', () => { toggleDropdown(button); });
        });
    }
    const labels = Array.from(document.getElementsByClassName('menu-item'));
    if (labels.length > 0 || labels !== null) {
        labels.forEach(label => {
            addEvent(label, 'click', () => {
                changeSceneBoard(label);
                updateDropdownSelectedEl(label);
            });
        });
    }
    addEvent(document, 'click', () => { closeAllDropdowns(window.event.target); });
}
const toggleDropdown = (button) => {
    const dropdowns = Array.from(document.getElementsByClassName('dropdown-content'));
    dropdowns.forEach((ol, index) => {
        if (index === Number(button.dataset.index)) {
            ol.classList.toggle('show');
        }
    });
}
const updateDropdownSelectedEl = (labelSelected) => {
    const section = document.getElementById(labelSelected.dataset.section);
    const buttonValue = section.getElementsByClassName('dropdown-selected')[0];
    buttonValue.textContent = labelSelected.textContent; 
}
const closeAllDropdowns = (element) => {
    if (element.classList.contains('dropdown-button')
        && !element.classList.contains('show')) {
        return
    }
    const dropdowns = Array.from(document.getElementsByClassName('dropdown-content'));
    dropdowns.forEach(ol => {
        if (ol.classList.contains('show')) {
            ol.classList.remove('show');
        }
    });
}

const changeSceneBoard = (next) => {
    const section = document.getElementById(next.dataset.section);
    const currentScene = section.querySelector('.current-scene');
    const scenes = Array.from(section.querySelectorAll('.board-content'));
    const nextScene = scenes[next.dataset.scene-1];

    if (currentScene.classList.contains(animateShowUpScene)) {
        currentScene.classList.remove(animateShowUpScene);
    }
    currentScene.classList.remove('current-scene');
    currentScene.classList.add(animateShowOutScene);

    if (nextScene.classList.contains('hidden')) {
        nextScene.classList.remove('hidden');
    }
    if (nextScene.classList.contains(animateShowOutScene)) {
        nextScene.classList.remove(animateShowOutScene);
    }
    nextScene.classList.add(animateShowUpScene);
    nextScene.classList.add('current-scene');
}

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(element => {
        if (element.isIntersecting) {
            const el = element.target;
            if (el.classList.contains('animation-children')) {
                const childs = Array.from(el.querySelectorAll('.animate__animated')).reverse();
                animateChainedEffect(childs, childs.pop(), 150);
            }
        }
    }, { threshold: .5 });
});
const animateChainedEffect = (arr, element, delay) => {
    if ((element == null) || (!element.classList.contains("unanimated"))) return

    animateElement(element);
    setTimeout(() => {
        animateChainedEffect(arr, arr.pop(), delay);
    }, delay);
}
const animateElement = (element, prefix = 'animate__') => {
    element.classList.remove('unanimated');
    animationList.forEach(animationName => {
        if (element.classList.contains(animationName)) { 
            element.classList.remove(animationName);
            element.classList.add(prefix + animationName);
        }
    });
}

// Funções Auxiliares
function addEvent(element, event, func) {
    if (element.attachEvent)
        return element.attachEvent('on'+event, func);
    else
        return element.addEventListener(event, func, false);
}
const observerTo = (targetClass, observer) => {
    Array.from(document.getElementsByClassName(targetClass)).forEach(key => {
        observer.observe(key);
    });
}