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
  click: new Howl({ src: ["sounds/click.wav"], volume: 0.6 }),
  win: new Howl({ src: ["sounds/win.mp3"], volume: 0.6 }),
  lose: new Howl({ src: ["sounds/lose.mp3"], volume: 0.6 }),
  flip: new Howl({ src: ["sounds/flip.mp3"], volume: 0.6 }),
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

(function unlockIOSAudio() {
  const unlock = () => {
    if (window.Howler) {
      Howler.ctx.resume?.();
      Howler.autoUnlock = true;
    }

    document.removeEventListener("touchstart", unlock);
    document.removeEventListener("click", unlock);
  };

  document.addEventListener("touchstart", unlock, { once: true });
  document.addEventListener("click", unlock, { once: true });
})();
