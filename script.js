
"use strict";

const PASSWORD = "princesa";
const loginScreen = document.getElementById("loginScreen");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("passwordInput");
const openLetterButton = document.getElementById("openLetterButton");
const errorMessage = document.getElementById("error");

function unlockSite() {
    loginScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    startHearts();
}

function checkPassword() {
    const answer = passwordInput.value.trim().toLocaleLowerCase("pt-BR");

    if (answer === PASSWORD) {
        localStorage.setItem("beatriz_cartinha_access", "true");
        errorMessage.textContent = "Sabia que você acertaria ❤️";
        errorMessage.style.color = "#66875d";
        openLetterButton.disabled = true;
        window.setTimeout(unlockSite, 650);
        return;
    }

    errorMessage.textContent = "Hmm... essa não é a resposta que eu estava esperando 😘";
    errorMessage.style.color = "#b44e5d";
    passwordInput.focus();
    passwordInput.select();
}

openLetterButton.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkPassword();
});

// O acesso permanece liberado neste navegador depois da primeira entrada.
window.addEventListener("load", () => {
    if (localStorage.getItem("beatriz_cartinha_access") === "true") {
        unlockSite();
    }
});

// Pequenos corações ocasionais, sem acumular elementos na página.
function startHearts() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.heartTimer) return;

    window.heartTimer = window.setInterval(() => {
        if (mainContent.classList.contains("hidden")) return;

        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${12 + Math.random() * 17}px`;
        heart.style.color = Math.random() > 0.5 ? "#c98796" : "#e5b8c0";
        document.body.appendChild(heart);
        window.setTimeout(() => heart.remove(), 5200);
    }, 4200);
}

// Revela a mensagem escondida.
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

secretButton.addEventListener("click", () => {
    const isOpen = secretMessage.classList.toggle("show");
    secretButton.textContent = isOpen ? "♥" : "⭐";
    secretButton.setAttribute("aria-expanded", String(isOpen));
});

// Animação suave quando as seções entram na tela.
const revealItems = document.querySelectorAll(".section, .promise, .final");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
        item.classList.add("reveal");
        observer.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
}
