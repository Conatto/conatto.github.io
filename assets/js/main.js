const typerMessage = ["Desenvolvedor Web"]

document.addEventListener("DOMContentLoaded", function () {
  const preloaderEl = document.getElementsByClassName("preloader")[0];
  
  preloaderEl.addEventListener("animationend", function() {
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
    preloaderEl.remove();

    const animationList = Array.from(document.getElementsByClassName("animate__animated"));
    animationList.forEach(element => {
      if (element.classList.contains("unanimated")) {
          element.classList.remove("unanimated");
          element.classList.add("animate__fadeIn");
      }
    });

    if (document.getElementById('typing-text') !== null) {
      new TypeIt("#typing-text", {
          strings: typerMessage,
          speed: 25,
          waitUntilVisible: true,
      }).go();   
    }
  });  
  preloaderEl.classList.add("fade-animation");

  new SweetScroll({}); particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 16,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": ["#FDA115", "#FF6E3A"]
        },
        "shape": {
          "type": "polygon",
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
          "value": 15,
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
          "speed": 1,
          "direction": "bottom",
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
}, false)

document.addEventListener("scroll", function () {
  if (window.scrollY >= (window.screen.height/2))
    {
      this.getElementsByClassName('up')[0].classList.remove('hide');
    } else
    {
      this.getElementsByClassName('up')[0].classList.add('hide');
    }
});
