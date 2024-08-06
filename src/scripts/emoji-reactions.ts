import confetti from "canvas-confetti";

// Confetti for likes
const buttons = document.querySelectorAll("[confetti-button]");
buttons.forEach((button) => {
  button.addEventListener("click", () => confetti());
});

// Generic Emoji Reaction Button
class EmojiReactionBtn extends HTMLElement {
  private count: number = 0;
  private button: HTMLButtonElement | null = null;
  private countSpan: HTMLSpanElement | null = null;
  private animationClass: string;
  private target: string;

  constructor() {
    super();
    this.animationClass =
      this.getAttribute("animation-class") || "animate-pulse";

    this.target = this.getAttribute("target") || "emoji-reaction-btn";
  }

  connectedCallback() {
    this.button = this.querySelector("button");
    this.countSpan = this.querySelector("span");

    if (this.button && this.countSpan) {
      this.button.addEventListener("click", this.handleClick.bind(this));
    }
  }

  private handleClick() {
    this.count++;
    if (this.countSpan) {
      this.countSpan.textContent = this.count.toString();
    }

    if (this.button) {
      // Add the pulse animation class
      this.button.classList.add(this.animationClass);

      // Remove the pulse animation class after animation completes
      this.button.addEventListener(
        "animationend",
        () => {
          this.button?.classList.remove(this.animationClass);
        },
        { once: true }
      );
    }
  }
}

// Define custom elements
customElements.define("emoji-reaction-btn", EmojiReactionBtn);
