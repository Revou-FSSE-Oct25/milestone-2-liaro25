// ==================================
// Mobile Hamburger Menu (All Pages)
// ==================================

(function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");

    menuBtn.setAttribute("aria-expanded", String(isHidden));
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
})();


/* ================================
   Global Sound Manager (Howler.js)
   ================================ */

(function initSoundManager() {
  // Avoid re-initializing if script is loaded twice
  if (window.SoundManager) return;

  const sfx = {
    click: new Howl({ src: ["./assets/click.wav"], volume: 0.6 }),
    win: new Howl({ src: ["./assets/win.mp3"], volume: 0.6 }),
    lose: new Howl({ src: ["./assets/lose.mp3"], volume: 0.6 }),
    flip: new Howl({ src: ["./assets/flip.mp3"], volume: 0.6 }),
  };

  let muted = false;

  function play(name) {
    const sound = sfx[name];
    if (!sound || muted) return;

    // Prevent stacking too much on rapid clicks
    sound.stop();
    sound.play();
  }

  function mute() {
    muted = true;
    Howler.mute(true);
  }

  function unmute() {
    muted = false;
    Howler.mute(false);
  }

  function toggleMute() {
    muted ? unmute() : mute();
    return muted;
  }

  function isMuted() {
    return muted;
  }

  // Expose a small API globally
  window.SoundManager = {
    play,
    mute,
    unmute,
    toggleMute,
    isMuted,
  };
})();
