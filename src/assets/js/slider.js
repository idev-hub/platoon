export default class Slider {
    constructor(_container, _class) {
        this.slides = []
        this.length = 0
        this.current = 0
        this.before = 0
        this.after = 0
        this.block = false
        this.timeBlock = 1200
        this.loop = false

        this._container = _container
        this._class = _class
        this.initialization()
    }

    initialization() {

        const find = (node, className) => {
            while (node) {
                if (node.classList.contains(className)) {
                    return node;
                } else {
                    node = node.parentElement;
                }
            }

            return null;
        }

        let DOMSlides = this._container.getElementsByClassName(this._class)
        for (let i = 0; i < DOMSlides.length; i++) {
            let obj = {container: DOMSlides[i]}

            for (const attr of DOMSlides[i].getAttributeNames()) {
                let newAttr = attr.replace("data-", "")
                obj[newAttr] = DOMSlides[i].getAttribute(attr)
            }

            this.slides.push(obj)
        }

        this.length = this.slides.length

        const self = this
        let isURLLoad = false
        let mainSlide = undefined
        const app = document.getElementById("app")
        let windowWidth = window.innerWidth

        const slideToLinks = app.getElementsByClassName("slideTo")
        for (let i = 0; i < slideToLinks.length; i++) {
            const link = slideToLinks[i]
            link.addEventListener("click", function (e) {
                e.preventDefault()
                const toSlideData = e.target.getAttribute("data-slide")
                if (toSlideData) {
                    if (parseInt(toSlideData) !== self.current) self.toSlide(parseInt(toSlideData), 0, true)
                } else if (e.target.getAttribute("href")) {
                    let index = self.slides.findIndex((s) => "#" + s.id === e.target.getAttribute("href"))
                    if (index !== -1 && index !== self.current) self.toSlide(index, 0, true)
                }
            })
        }


        for (let i = 0; i < this.length; i++) {
            const slide = this.slides[i]

            if (window.location.hash === "#" + slide.id) {
                isURLLoad = true
                this.current = i
            }

            if (slide.main !== undefined) mainSlide = i

            const content = slide.container.getElementsByClassName("content")[0]
            let scrollToggle = content.scrollHeight === content.offsetHeight
            slide.scroll = !scrollToggle

            function before() {
                if (self.loop) if (self.before === undefined) self.before = self.length - 1
                if (self.before !== undefined) {
                    self.toSlide(self.before, 1, true)
                    self.block = true
                }
            }

            function after() {
                if (self.loop) if (self.after === undefined) self.after = 0
                if (self.after !== undefined) {
                    self.toSlide(self.after, -1, true)
                    self.block = true
                }
            }

            let allowAfter = scrollToggle
            let allowBefore = scrollToggle


            let isTouch = false;

            let ts
            slide.container.addEventListener('touchstart', function (e) {
                if (!isTouch) {
                    // ts = e.touches[0].clientY
                }
            })

            slide.container.addEventListener('touchmove', function (e) {
                let te = e.changedTouches[0].clientY
                // if (!isTouch) {
                //     if (ts > te) {
                //         if (allowBefore) before()
                //     } else {
                //         if (allowAfter) after()
                //     }
                //     isTouch = true
                //     setTimeout(function () {
                //         isTouch = false
                //     }, 1000)
                // }
            })


            slide.container.addEventListener("wheel", function (e) {
                if (!isTouch && find(e.target, 'scroll-container') === null) {
                    if (!this.block) {
                        if (e.deltaY < 0) {
                            if (allowBefore) before()
                        } else if (e.deltaY > 0) {
                            if (allowAfter) after()
                        }
                    }
                    isTouch = true;
                    setTimeout(function () {
                        isTouch = false;
                    }, 1000);
                }
            })

            if (!scrollToggle) {
                content.addEventListener("scroll", function (e) {
                    const target = e.target
                    allowBefore = (target.scrollTop >= 0 && target.scrollTop < 3);
                    allowAfter = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <= 1;
                })
            }
        }

        if (!isURLLoad && mainSlide) this.current = mainSlide
        this.toSlide(this.current, 0, false)
        this.block = false
    }

    removeAllClasses() {
        const app = document.getElementById("app")
        if (app.classList.contains("black-theme")) app.classList.remove("black-theme")
        if (app.classList.contains("white-theme")) app.classList.remove("white-theme")
        if (app.classList.contains("slide-switched")) app.classList.remove("slide-switched")

        for (let i = 0; i < this.length; i++) {
            const slide = this.slides[i].container
            if (slide.classList.contains("no-animation")) slide.classList.remove("no-animation")
            if (slide.classList.contains("before-slide")) slide.classList.remove("before-slide")
            if (slide.classList.contains("current-slide")) slide.classList.remove("current-slide")
            if (slide.classList.contains("after-slide")) slide.classList.remove("after-slide")
            if (slide.classList.contains("before-slide-direction-up")) slide.classList.remove("before-slide-direction-up")
            if (slide.classList.contains("before-slide-direction-down")) slide.classList.remove("before-slide-direction-down")
            if (slide.classList.contains("after-slide-direction-up")) slide.classList.remove("after-slide-direction-up")
            if (slide.classList.contains("after-slide-direction-down")) slide.classList.remove("after-slide-direction-down")
            if (slide.classList.contains("appeared-slide")) slide.classList.remove("appeared-slide")
        }
    }

    toggleLinks(slide) {
        const aside = document.getElementById("aside-page")
        const asideLinks = aside.getElementsByClassName("slideTo")
        for (let i = 0; i < asideLinks.length; i++) {
            const link = asideLinks[i]
            if (link.getAttribute("href") === "#" + slide.id) {
                link.classList.add("current")
            } else {
                if (link.classList.contains("current")) link.classList.remove("current")
            }
        }
    }

    toSlide(index, direction, anim) {
        if (!this.block) {
            const self = this
            const app = document.getElementById("app")

            this.current = index

            this.before = (this.current - 1) >= 0 ? this.current - 1 : undefined;
            this.after = (this.current + 1) < this.length ? this.current + 1 : undefined;

            if (anim) this.removeAllClasses()
            const current = this.slides[this.current].container
            const slide = this.slides[this.current]
            current.classList.add("current-slide")

            if (!anim) {
                current.classList.add("no-animation")
            }

            if (slide.scroll) {
                app.classList.add("scrolling-slide")
            } else if (app.classList.contains("scrolling-slide")) {
                app.classList.remove("scrolling-slide")
            }
            if (slide.id) {
                history.pushState({page: self.current}, slide.title || null, "#" + slide.id)
            }

            if (current.getAttribute("data-app-custom-class")) app.classList.add(current.getAttribute("data-app-custom-class"))

            if (this.before !== undefined) {
                let before = this.slides[this.before].container
                before.classList.add("before-slide")
                if (direction > 0) {
                    before.classList.add("before-slide-direction-up")
                } else {
                    before.classList.add("before-slide-direction-down")
                }

                if (!anim) {
                    before.classList.add("no-animation")
                }
            }
            if (this.after !== undefined) {
                let after = this.slides[this.after].container
                after.classList.add("after-slide")
                if (direction > 0) {
                    after.classList.add("after-slide-direction-up")
                } else {
                    after.classList.add("after-slide-direction-down")
                }

                if (!anim) {
                    after.classList.add("no-animation")
                }
            }

            this._container.dispatchEvent(new CustomEvent("switch", {
                bubbles: true,
                detail: {
                    index: self.current,
                    container: current
                }
            }))

            this.toggleLinks(slide)

            setTimeout(function (e) {
                self.block = false
                app.classList.add("slide-switched")
                current.classList.add("appeared-slide")
                self._container.dispatchEvent(new CustomEvent("switched", {
                    bubbles: true,
                    detail: {
                        index: self.current,
                        container: current
                    }
                }))
            }, self.timeBlock)
        }
    }
}
