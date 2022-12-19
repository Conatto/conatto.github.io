const animationList = ['fadeInUp'];
const welcomeMessage = ["Olá!", "Conheça meus projetos"]
let animationDelay = 1500;
let allowScroll = true;

window.onload = function() {
    if (document.getElementsByTagName('title')[0].innerHTML === "Projetos") {
        animationDelay = 0; allowScroll = false;
    }
    
    setTimeout(() => {
        observerTo('animation-children', animateObserver);
        if (allowScroll) {
            document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
        }
    }, animationDelay)

    const labels = Array.from(document.getElementsByClassName('board-item'));
    if (labels.length > 0 || labels !== null) {
        labels.forEach(label => {
            addEvent(label, 'click', () => { changeSceneBoard(label); });
        });
    }

    if (document.getElementById('welcome') !== null) {
        new TypeIt("#welcome", {
            strings: welcomeMessage,
            speed: 25,
            waitUntilVisible: true,
        }).go();   
    }
}

const changeSceneBoard = (next) => {
    const section = document.getElementById(next.dataset.section);
    const currentScene = section.querySelector('.current-scene');
    const scenes = Array.from(section.querySelectorAll('.board-content'));
    const nextScene = scenes[next.dataset.scene-1];

    if (currentScene.classList.contains('animate__fadeInDown')) {
        currentScene.classList.remove('animate__fadeInDown');
    }
    currentScene.classList.remove('current-scene');
    currentScene.classList.add('animate__fadeOutDown');

    if (nextScene.classList.contains('hidden')) {
        nextScene.classList.remove('hidden');
    }
    if (nextScene.classList.contains('animate__fadeOutDown')) {
        nextScene.classList.remove('animate__fadeOutDown');
    }
    nextScene.classList.add('animate__fadeInDown');
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
function animateChainedEffect(arr, element, delay) {
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