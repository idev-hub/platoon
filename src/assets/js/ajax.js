window.addEventListener("DOMContentLoaded", function (e) {
    const forms = document.getElementsByClassName("ajax")
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i]
        const action = form.getAttribute("action")
        const method = form.getAttribute("method")

        form.addEventListener("submit", function (e) {
            e.preventDefault()

            fetch(action.toString(), {
                method: method.toString(),
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: new FormData(e.target)
            }).then(function (data) {

                if (data.body.toString() === "ok" || data.status === 200 || data.status === 201) {
                    MicroModal.show("modal-5", {})
                    setTimeout(function (e) {
                        MicroModal.close("modal-5")
                    }, 2000)
                } else {
                    MicroModal.show("modal-6", {})
                    setTimeout(function (e) {
                        MicroModal.close("modal-6")
                    }, 2000)
                }
            }).catch(function (error) {
                MicroModal.show("modal-6", {})
                setTimeout(function (e) {
                    MicroModal.close("modal-6")
                }, 2000)
            })
        })
    }
})
