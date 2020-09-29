import LazyLoad from './assets/js/lazyload'
import Slider from './assets/js/slider'
import MicroModal from 'micromodal';
import "./assets/scss/main.scss"

import Glide from '@glidejs/glide'

window.addEventListener("DOMContentLoaded", function (e) {

    const catalogs = document.getElementsByClassName("catalog")
    for (let e = 0; e < catalogs.length; e++) {
        const catalog = catalogs[e]
        const items = catalog.getElementsByClassName("_item")
        for (let i = 0; i < items.length; i++) {
            const item = items[i]

            const opens = item.getElementsByClassName("open")
            for (let j = 0; j < opens.length; j++) {
                opens[j].addEventListener("click", function (e) {
                    e.preventDefault();
                    const content = item.getElementsByClassName("modal-content")[0].innerHTML
                    const product = opens[j].getAttribute("data-product")
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
                    console.log(product)

                    const btn = modal.getElementsByClassName("custom-open")
                    for (let k = 0; k < btn.length; k++) {
                        const b = btn[k]
                        b.addEventListener("click", function (e){
                            e.preventDefault()
                            MicroModal.show("modal-7", {})

                            const productField = document.getElementById("productName")
                            const modal7 = document.getElementById("modal-7")
                            productField.setAttribute("value", product)

                            const cl = modal7.getElementsByClassName("modal__close")
                            for (let j = 0; j < cl.length; j++) {
                                cl[j].addEventListener("click", function (e) {
                                    MicroModal.close("modal-7")
                                })
                            }
                        })
                    }

                    const cl = modal.getElementsByClassName("closes")
                    for (let j = 0; j < cl.length; j++) {
                        cl[j].addEventListener("click", function (e) {
                            MicroModal.close("modal-3")
                        })
                    }
                })
            }
        }
    }


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


    const toggleContent = document.getElementsByClassName("toggle-content")
    for (let i = 0; i < toggleContent.length; i++) {
        const toggle = toggleContent[i]
        toggle.addEventListener("click", function (e) {

            const contents = document.getElementsByClassName("content-by-index")
            for (let j = 0; j < contents.length; j++) {
                const content = contents[j]
                content.classList.remove("current")
            }

            const el = document.getElementById(toggle.getAttribute("data-id"))
            if (el) {
                el.classList.add("current")
                const num = document.getElementById("num-content-by-index")
                const text = toggle.getAttribute("data-text")
                if (text) num.innerText = text
            }


            for (let j = 0; j < toggleContent.length; j++) {
                toggleContent[j].classList.remove("current")
            }
            toggle.classList.add("current")

            e.preventDefault()
        })
    }


    const cards = document.getElementsByClassName("cards")[0]
    if (cards) {
        const items = cards.getElementsByClassName("_item")
        for (let i = 0; i < items.length; i++) {
            const item = items[i]


            item.getElementsByClassName("open-modal")[0].addEventListener("click", function (e) {
                e.preventDefault();


                const content = item.getElementsByClassName("modal__content")[0].innerHTML

                const modal = document.getElementById("modal-4")
                modal.getElementsByClassName("modal__content")[0].innerHTML = content

                modal.addEventListener("click", function (e) {
                    MicroModal.close("modal-4")
                })

                MicroModal.show("modal-4", {})
            })
        }
    }

    const advantages = document.getElementsByClassName("_advantage")
    for (let i = 0; i < advantages.length; i++) {
        const adv = advantages[i]
        adv.addEventListener("click", function (e) {
            e.preventDefault();
            const content = adv.getElementsByClassName("modal__content")[0].innerHTML

            const modal = document.getElementById("modal-4")
            modal.getElementsByClassName("modal__content")[0].innerHTML = content

            modal.addEventListener("click", function (e) {
                MicroModal.close("modal-4")
            })

            MicroModal.show("modal-4", {})
        })
    }

    let gl1, gl2, gl2mobile, gl3, gl4

    if (window.innerWidth >= 787) {
        gl2 = new Glide('.glide-2', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        })
        document.getElementsByClassName(gl2.selector.split(".")[1])[0].setAttribute("data-perView", gl2.settings.perView)
    } else {
        gl2mobile = new Glide('.glide-2mobile', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        })
        document.getElementsByClassName(gl2mobile.selector.split(".")[1])[0].setAttribute("data-perView", gl2mobile.settings.perView)
    }



    if (window.innerWidth >= 787) {
        gl3 = new Glide('.glide-3', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 4,
            bound: false,
            rewind: false,
        })
    } else {
        gl3 = new Glide('.glide-3', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        })
    }

    document.getElementsByClassName(gl3.selector.split(".")[1])[0].setAttribute("data-perView", gl3.settings.perView)

    gl4 = new Glide('.glide-4', {
        type: 'carusel',
        startAt: 0,
        gap: 30,
        perView: 6,
        bound: false,
        rewind: false,
    })

    document.getElementsByClassName(gl4.selector.split(".")[1])[0].setAttribute("data-perView", gl4.settings.perView)

    if (window.innerWidth >= 787) {
        gl1 = new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 3,
            bound: false,
            rewind: false,
        })

        document.getElementsByClassName(gl1.selector.split(".")[1])[0].setAttribute("data-perView", gl1.settings.perView)
    } else {
        gl1 = new Glide('.glide', {
            type: 'slider',
            startAt: 0,
            gap: 10,
            perView: 1,
            bound: false,
            rewind: false,
        })

        document.getElementsByClassName(gl1.selector.split(".")[1])[0].setAttribute("data-perView", gl1.settings.perView)
    }

    const dotsCntainer = document.getElementsByClassName("auto-dots")
    for (let i = 0; i < dotsCntainer.length; i++) {
        const container = dotsCntainer[i]
        const perView = container.getAttribute("data-perView") || 1

        const slides = container.getElementsByClassName("glide__slide")
        const dots = container.getElementsByClassName("glide__bullets")[0]
        if (dots) {
            dots.innerHTML = ""
            if(parseInt(perView) !== slides.length){
                for (let i = 0; i < (slides.length / perView); i++) {
                    let el = document.createElement("button")
                    el.classList.add("glide__bullet")
                    el.setAttribute("data-glide-dir", `=${i}`)
                    dots.append(el)
                }
            }
        }
    }

    gl1.mount()
    if (window.innerWidth >= 787) {
        gl2.mount()
    } else {
        gl2mobile.mount()
    }

    gl3.mount()
    gl4.mount()

})

