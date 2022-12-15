const animationList = ['fadeInUp'];
const welcomeMessage = ["Olá!", "Conheça meus projetos"]

window.onload = function() {
    setTimeout(() => {
        observerTo('animation-children', animateObserver);
        document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
    }, 2000)

    new TypeIt("#welcome", {
        strings: welcomeMessage,
        speed: 25,
        waitUntilVisible: true,
    }).go();
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