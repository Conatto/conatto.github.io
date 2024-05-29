let currMessage = null;

document.addEventListener("DOMContentLoaded", function () {
  this.getElementById('year').innerHTML = new Date().getFullYear();

  const preloaderEl = document.getElementsByClassName("preloader")[0];
  preloaderEl.addEventListener("animationend", function() {
    closePreloader(this);
    initParticlesAnimation();
    observerTo('sections', initTypeObserver());
    initFadeAnimation();
  }); preloaderEl.classList.add("fade-animation");
}, false)

const typer = new TypeIt("#typing-text", {
  cursorChar: "_",
  speed: 25,
  waitUntilVisible: true,
});

const typping = message => {
  if (message === currMessage) return;

  if (!currMessage) typer.type(message).go();
  else typer.delete().flush().type(message).flush();
  currMessage = message;
}

const initTypeObserver = () => {
  return new IntersectionObserver(entries => {
    entries.forEach(element => {
        if (element.isIntersecting) {
          switch (element.target.getAttribute('id')) {
            case "particles-js": typping("BOAS VINDAS"); break;
            case "projects": typping("PROJETOS"); break;
            default: typping("BOAS VINDAS");
          }
        }
    });
  }, { threshold: .3 });
}
const initFadeAnimation = () => {
  Array.from(document.getElementsByClassName("animate__animated"))
  .forEach(element => {
    if (element.classList.contains("unanimated")) {
        element.classList.remove("unanimated");
        switch (element.getAttribute("data-anim")) {
          case "fadeIn": element.classList.add("animate__fadeIn"); break;
          case "fadeInDown": element.classList.add("animate__fadeInDown"); break;
          case "fadeInUp": element.classList.add("animate__fadeInUp"); break;
        }
    }
  });
}
const closePreloader = preloader => {
  document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
  preloader.remove();
}
const initParticlesAnimation = () => {
  new SweetScroll({}); particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 28,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#4C3A99", "#191333"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 8
        },
        "image": {
            "src": "assets/img/particle.svg",
            "width": 100,
            "height": 100,
        }
      },
      "opacity": {
        "value": 0.7,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.4,
          "sync": false
        }
      },
      "size": {
        "value": 8,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "enable": true,
        "speed": 10,
        "direction": "bottom-left",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 1200,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false
        },
        "onclick": {
          "enable": false,
        },
        "resize": true
      },
      "retina_detect": true
    }
  });
}

const observerTo = (targetClass, observer) => {
  Array.from(document.getElementsByClassName(targetClass)).forEach(key => {
      observer.observe(key);
  })
}

document.addEventListener("scroll", function () {
  if (window.scrollY >= (window.screen.height/2))
    {
      this.getElementsByClassName('up')[0].classList.remove('hide');
    } else
    {
      this.getElementsByClassName('up')[0].classList.add('hide');
    }
});
