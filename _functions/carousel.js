class Carousel {
    constructor(interval, auto) {
        this.idx = 0;
        this.translation = 0;
        this.interval = interval;
        this.startingSwipeX = 0;
        this.movingSwipeX = 0;
        this.autoSlide = null;
        this.autoSlideSetted = auto;

        this.carouselEl = document.getElementsByClassName("carousel")[0];
        this.viewport = document.getElementsByClassName("carousel__viewport")[0];
        this.navigationBtns = document.getElementsByClassName("carousel__pagination-button");
        this.prevBtn = document.getElementsByClassName("carousel__prev")[0];
        this.nextBtn = document.getElementsByClassName("carousel__next")[0];
        this.slideItems = this.viewport.children;
        this.lastItemIdx = this.slideItems.length-1;

        if (this.autoSlideSetted) { this.startAutoSlide(); }
    }

    startAutoSlide() {
        let self = this;
        
        if (this.autoSlide !== null) this.stopAutoSlide();
        this.autoSlide = setInterval((function() { 
            return function() { self.slideToForward(); }; 
        })(), this.interval);
    }
    stopAutoSlide() {
        // Colocar uma variável de controle para saber se a função está rodando.
        clearInterval(this.autoSlide);
    }
    slideToForward() {
        this.idx++;
        if (this.idx > this.lastItemIdx) this.idx = 0;
        this.sliderTransition(-1);
    }
    slideToBackward() {
        this.idx--;
        if (this.idx < 0) this.idx = this.lastItemIdx;
        this.sliderTransition(1);
    }
    sliderTo(next) {
        if (next == this.idx) return;
        const direction = (next - this.idx) * -1;
        
        this.idx = next;
        this.sliderTransition(direction);
    }
    sliderTransition(direction) {        
        this.translation += 100 * direction
    
        if (this.translation < (100 * -this.lastItemIdx)) { this.translation = 0 };
        if (this.translation > 0) { this.translation = 100 * -this.lastItemIdx };
    
        this.viewport.style.transform = 'translateX('+this.translation+'vw)';
        this.viewport.style.transition = 'transform .5s ease-in-out';
        this.updatePagination();
    }
    updatePagination() {
        for (let i = 0; i < this.navigationBtns.length; i++) {
            if (this.navigationBtns[i].classList.contains("is-active")) {
                this.navigationBtns[i].classList.remove("is-active");
                this.navigationBtns[this.idx].classList.add("is-active");
                break;
            }
        }
    }
    activateSlider(target) {
        if (this.autoSlideSetted) { this.stopAutoSlide(); }
        switch (target) {
            case 'forward': this.slideToForward(); break;
            case 'backward': this.slideToBackward(); break;
            default: this.sliderTo(target);
        }
        if (this.autoSlideSetted) { this.startAutoSlide(); }
    }

    swipeStart(event) { 
        this.startingSwipeX = event.touches[0].clientX; 
    }
    swipeMove(event) { 
        this.movingSwipeX = event.touches[0].clientX; 
    }
    swipeEnd() { 
        if (this.movingSwipeX === 0) return;
        else if (this.startingSwipeX+100 <= this.movingSwipeX) { this.activateSlider("backward"); }
        else if (this.startingSwipeX-100 >= this.movingSwipeX) { this.activateSlider("forward"); } 
        this.movingSwipeX = 0;
    }

    attachEvents(screenViewport) {
        let self = this;
        addEvent(this.prevBtn, 'click', function() { self.activateSlider("backward"); });
        addEvent(this.nextBtn, 'click', function() { self.activateSlider("forward"); });
        for (const button of this.navigationBtns) {
            addEvent(button, 'click', function() { self.activateSlider(button.dataset.index) });
        }

        addEvent(this.carouselEl, 'touchstart', event => { self.swipeStart(event) });
        addEvent(this.carouselEl, 'touchmove', event => { self.swipeMove(event) });
        addEvent(this.carouselEl, 'touchend', () => { self.swipeEnd(); });

        addEvent(screenViewport, 'focus', function() { self.startAutoSlide(); });
        addEvent(screenViewport, 'blur', function() { self.stopAutoSlide(); });
    }

    addEvent(element, event, func) {
        if (element.attachEvent)
            return element.attachEvent('on'+event, func);
        else
            return element.addEventListener(event, func, false);
    }
}
