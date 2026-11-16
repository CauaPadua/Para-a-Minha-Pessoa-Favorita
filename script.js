const PASSWORD = "princesa";

const loginScreen = document.getElementById("loginScreen");
const mainContent = document.getElementById("mainContent");

function unlockSite() {
    loginScreen.style.opacity = "0";

    setTimeout(() => {
        loginScreen.style.display = "none";
        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 600);
}

function checkPassword() {

    const input = document
        .getElementById("passwordInput")
        .value
        .trim()
        .toLowerCase();

    const error = document.getElementById("error");

    if (input === PASSWORD) {

        localStorage.setItem(
            "beatriz_cartinha_access",
            "true"
        );

        error.style.color = "#77a56f";
        error.innerHTML = "Sabia que você acertaria ❤️";

        setTimeout(() => {
            unlockSite();
        }, 1200);

    } else {

        error.style.color = "#c94d4d";
        error.innerHTML =
            "Hmm... essa não é a resposta que eu estava esperando 😘";

    }
}

window.addEventListener("load", () => {

    const access =
        localStorage.getItem(
            "beatriz_cartinha_access"
        );

    if (access === "true") {

        loginScreen.style.display = "none";
        mainContent.classList.remove("hidden");
    }
});

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        checkPassword();
    }
});

/* ESTRELA SECRETA */

const secretButton =
    document.getElementById(
        "secretButton"
    );

const secretMessage =
    document.getElementById(
        "secretMessage"
    );

if (secretButton) {

    secretButton.addEventListener(
        "click",
        () => {

            secretMessage.classList.toggle(
                "show"
            );

            secretButton.innerHTML =
                secretMessage.classList.contains(
                    "show"
                )
                ? "❤️"
                : "⭐";
        }
    );
}

/* ANIMAÇÃO SUAVE */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(
            (entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0px)";
                }
            }
        );
    },
    {
        threshold: 0.15
    }
);

window.addEventListener(
    "load",
    () => {

        document
            .querySelectorAll(
                ".section, .promise, .final"
            )
            .forEach(
                (element) => {

                    element.style.opacity = "0";

                    element.style.transform =
                        "translateY(40px)";

                    element.style.transition =
                        "all 1s ease";

                    observer.observe(
                        element
                    );
                }
            );
    }
);

/* CORAÇÕES FLUTUANTES */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        12 + Math.random() * 18 + "px";

    heart.style.opacity = "0.7";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "999";

    document.body.appendChild(
        heart
    );

    let pos = -30;

    const interval =
        setInterval(() => {

            pos += 2;

            heart.style.bottom =
                pos + "px";

            heart.style.opacity =
                Math.max(
                    0,
                    1 - pos / 900
                );

            if (pos > 900) {

                clearInterval(
                    interval
                );

                heart.remove();
            }

        }, 20);
}

/* coração ocasional */

setInterval(() => {

    if (
        !document
            .getElementById(
                "mainContent"
            )
            .classList.contains(
                "hidden"
            )
    ) {
        createHeart();
    }

}, 4000);
