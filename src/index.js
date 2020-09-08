import LazyLoad from './assets/js/lazyload'
import Slider from './assets/js/slider'
import MicroModal from 'micromodal';
import "./assets/scss/main.scss"

import Glide from '@glidejs/glide'
import {Controls, Breakpoints} from '@glidejs/glide/dist/glide.modular.esm'

window.addEventListener("DOMContentLoaded", function (e) {
    MicroModal.init({
        openTrigger: 'data-custom-open',
        closeTrigger: 'data-custom-close',
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false
    });

    const myLazyLoad = new LazyLoad()
    myLazyLoad.update()

    if(window.innerWidth >= 787){
        const slidesContainer = document.getElementById("slide-page")
        const slider = new Slider(slidesContainer, 'slide')
    }


    new Glide('.glide-2', {
        type: 'slider',
        startAt: 0,
        gap: 10,
        perView: 1,
        bound: false,
        rewind: false,
    }).mount()

    new Glide('.glide-3', {
        type: 'slider',
        startAt: 0,
        gap: 10,
        perView: 4,
        bound: false,
        rewind: false,
    }).mount()

    new Glide('.glide-4', {
        type: 'carusel',
        startAt: 0,
        gap:  30,
        perView: 6,
    }).mount()

    if(window.innerWidth >= 787){
        new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 3,
            bound: false,
            rewind: false,
        }).mount()
    } else {
        new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        }).mount()
    }
})

