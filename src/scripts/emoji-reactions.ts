import confetti from "canvas-confetti";

// Confetti for likes
const buttons = document.querySelectorAll("[confetti-button]");
buttons.forEach((button) => {
  button.addEventListener("click", () => confetti());
});

// Custom like button elements
class HeartBtn extends HTMLElement {
  constructor() {
    super();
    let count = 0;

    const heartButton = this.querySelector("button");
    const countSpan = this.querySelector("span");

    if (heartButton && countSpan)
      heartButton.addEventListener("click", () => {
        count++;
        countSpan.textContent = count.toString();

        // Add the pulse animation class
        heartButton.classList.add('animate-pulseRed');

        // Remove the pulse animation class after animation completes
        heartButton.addEventListener('animationend', () => {
          heartButton.classList.remove('animate-pulseRed');
        }, { once: true });
      });
  }
}

class LikeBtn extends HTMLElement {
  constructor() {
    super();
    let count = 0;

    const likeButton = this.querySelector("button");
    const countSpan = this.querySelector("span");

    if (likeButton && countSpan)
      likeButton.addEventListener("click", () => {
        count++;
        countSpan.textContent = count.toString();

        // Add the pulse animation class
        likeButton.classList.add('animate-pulseGreen');

        // Remove the pulse animation class after animation completes
        likeButton.addEventListener('animationend', () => {
          likeButton.classList.remove('animate-pulseGreen');
        }, { once: true });
      });
  }
}

class HappyBtn extends HTMLElement {
  constructor() {
    super();
    let count = 0;

    const happyButton = this.querySelector("button");
    const countSpan = this.querySelector("span");

    if (happyButton && countSpan)
      happyButton.addEventListener("click", () => {
        count++;
        countSpan.textContent = count.toString();

        // Add the pulse animation class
        happyButton.classList.add('animate-pulseYellow');

        // Remove the pulse animation class after animation completes
        happyButton.addEventListener('animationend', () => {
          happyButton.classList.remove('animate-pulseYellow');
        }, { once: true });
      });
  }
}

class SadBtn extends HTMLElement {
  constructor() {
    super();
    let count = 0;

    const sadButton = this.querySelector("button");
    const countSpan = this.querySelector("span");

    if (sadButton && countSpan)
      sadButton.addEventListener("click", () => {
        count++;
        countSpan.textContent = count.toString();

        // Add the pulse animation class
        sadButton.classList.add('animate-pulseYellow');

        // Remove the pulse animation class after animation completes
        sadButton.addEventListener('animationend', () => {
          sadButton.classList.remove('animate-pulseYellow');
        }, { once: true });
      });
  }
}

customElements.define("happy-btn", HappyBtn);
customElements.define("sad-btn", SadBtn);
customElements.define("like-btn", LikeBtn);
customElements.define("heart-btn", HeartBtn);