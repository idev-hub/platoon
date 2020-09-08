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

    if (window.innerWidth >= 787) {
        const slidesContainer = document.getElementById("slide-page")
        const slider = new Slider(slidesContainer, 'slide')
    }


    const catalog = document.getElementsByClassName("catalog")[0]
    if (catalog) {
        const items = catalog.getElementsByClassName("_item")
        for (let i = 0; i < items.length; i++) {
            const item = items[i]

            item.addEventListener("click", function (e) {
                e.preventDefault();
                const content = item.getElementsByClassName("modal-content")[0].innerHTML

                const modal = document.getElementById("modal-3")
                modal.getElementsByClassName("modal__content")[0].innerHTML = content

                const gallary = modal.getElementsByClassName("gallary")[0]
                const imgs = gallary.getElementsByClassName("_imgs")[0]
                const images = imgs.getElementsByTagName("img")

                for (let j = 0; j < images.length; j++) {
                    images[j].addEventListener("click", function (e) {
                        e.preventDefault();
                        gallary.getElementsByTagName("img")[0].setAttribute("src", images[j].getAttribute("src"))
                    })
                }

                MicroModal.show("modal-3", {})
            })
        }
    }

    const glide2 = new Glide('.glide-2', {
        type: 'slider',
        startAt: 0,
        gap: 10,
        perView: 1,
        bound: false,
        rewind: false,
        dots: '.dots',
    })
    const glide2Container = document.getElementsByClassName("glide-2")[0]
    if (glide2Container) {
        const slides = glide2Container.getElementsByClassName("glide__slide")
        const dots = glide2Container.getElementsByClassName("glide__bullets")[0]

        if (dots && slides.length > 0) {
            dots.innerHTML = ""
            for (let i = 0; i < slides.length; i++) {
                let el = document.createElement("button")
                el.classList.add("glide__bullet")
                el.setAttribute("data-glide-dir", `=${i}`)
                dots.append(el)
            }
        }
    }
    glide2.mount()

    const glide3 = new Glide('.glide-3', {
        type: 'slider',
        startAt: 0,
        gap: 10,
        perView: 4,
        bound: false,
        rewind: false,
    })
    const glide3Container = document.getElementsByClassName("glide-3")[0]
    if (glide3Container) {
        const slides = glide3Container.getElementsByClassName("glide__slide")
        const dots = glide3Container.getElementsByClassName("glide__bullets")[0]
        let int = slides.length / glide3.settings.perView

        if (dots && int > 0) {
            dots.innerHTML = ""
            for (let i = 0; i < int; i++) {
                let el = document.createElement("button")
                el.classList.add("glide__bullet")
                el.setAttribute("data-glide-dir", `=${i}`)
                dots.append(el)
            }
        }
    }
    glide3.mount()

    const glide4 = new Glide('.glide-4', {
        type: 'carusel',
        startAt: 0,
        gap: 30,
        perView: 6,
    })
    const glide4Container = document.getElementsByClassName("glide-4")[0]
    if (glide4Container) {
        const slides = glide3Container.getElementsByClassName("glide__slide")
        const dots = glide3Container.getElementsByClassName("glide__bullets")[0]
        let int = slides.length / glide3.settings.perView

        if (dots && int > 0) {
            dots.innerHTML = ""
            for (let i = 0; i < int; i++) {
                let el = document.createElement("button")
                el.classList.add("glide__bullet")
                el.setAttribute("data-glide-dir", `=${i}`)
                dots.append(el)
            }
        }
    }
    glide4.mount()


    if (window.innerWidth >= 787) {
        const glide = new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 3,
            bound: false,
            rewind: false,
        })
        const glideContainer = document.getElementsByClassName("glide")[0]
        if (glideContainer) {
            const slides = glide3Container.getElementsByClassName("glide__slide")
            const dots = glide3Container.getElementsByClassName("glide__bullets")[0]
            let int = slides.length / glide3.settings.perView

            if (dots && int > 0) {
                dots.innerHTML = ""
                for (let i = 0; i < int; i++) {
                    let el = document.createElement("button")
                    el.classList.add("glide__bullet")
                    el.setAttribute("data-glide-dir", `=${i}`)
                    dots.append(el)
                }
            }
        }
        glide.mount()

    } else {
        const glide = new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        })
        const glideContainer = document.getElementsByClassName("glide")[0]
        if (glideContainer) {
            const slides = glide3Container.getElementsByClassName("glide__slide")
            const dots = glide3Container.getElementsByClassName("glide__bullets")[0]
            let int = slides.length / glide3.settings.perView

            if (dots && int > 0) {
                dots.innerHTML = ""
                for (let i = 0; i < int; i++) {
                    let el = document.createElement("button")
                    el.classList.add("glide__bullet")
                    el.setAttribute("data-glide-dir", `=${i}`)
                    dots.append(el)
                }
            }
        }
        glide.mount()
    }
})

