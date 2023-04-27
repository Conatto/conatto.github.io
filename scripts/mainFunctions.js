const animationList = ['fadeInUp'];
const animateShowUpScene = "animate__fadeIn"
const animateShowOutScene = "animate__fadeOut"
const welcomeMessage = ["Olá!", "Conheça meus projetos"]
let animationDelay = 1500;
let allowScroll = true;

window.onload = function() {
    if ((document.getElementById("yearNow") !== null) && 
    (document.getElementById("yearNow") !== undefined))
        document.getElementById("yearNow").innerHTML = getYearNow();

    if (document.getElementsByTagName('title')[0].innerHTML === "Projetos") {
        animationDelay = 0; allowScroll = false;
        bindDropdownEvents();
        hideSections();
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
    const projectPics = Array.from(document.getElementsByClassName('board-figure'));
    if (projectPics.length > 0 || projectPics !== null) {
        projectPics.forEach(picture => {
            addEvent(picture, 'mouseover', () => {
                picture.getElementsByClassName('fullscreen-icon')[0].classList.remove('hidden');
            });
            addEvent(picture, 'mouseout', () => {
                picture.getElementsByClassName('fullscreen-icon')[0].classList.add('hidden');
            });
            addEvent(picture, 'click', () => {
                const srcString = picture.getElementsByTagName('img')[0].src.split('static/');                
                const modal = document.getElementsByClassName('modal')[0];

                const imgEl = modal.getElementsByTagName('img')[0];
                imgEl.src = './static/' + srcString.pop();
                modal.classList.remove('hidden');
                imgEl.classList.add('animate__zoomIn');
            });
        });
    }
    const modalCloseBtn = Array.from(document.getElementsByClassName('close-icon'));
    if (modalCloseBtn.length > 0 || modalCloseBtn !== null) {
        modalCloseBtn.forEach(button => {
            addEvent(button, 'click', () => {
                let target = button;
                do {
                    target = target.parentNode;
                } while (!target.classList.contains('modal'));

                const modal = target;
                const imgEl = modal.getElementsByTagName('img')[0];

                imgEl.classList.remove('animate__zoomIn');
                imgEl.classList.add('animate__zoomOut');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    imgEl.classList.remove('animate__zoomOut');
                }, 500);
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

const hideSections = () => {
    const sections = Array.from(document.getElementsByTagName("section"));
    const targetSection = document.URL.split("#").pop();
    sections.forEach(section => {
        if (section.getAttribute("id") !== targetSection) 
            section.classList.add('unavailable');
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

const getYearNow = () => { 
    const date = new Date(); 
    return date.getFullYear();
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