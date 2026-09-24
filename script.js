"use strict";


/* ========================================
   LIVING WATERS AQUASCAPES
   script.js
   ======================================== */


document.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     ELEMENTS
     ======================================== */

  const body =
    document.body;

  const header =
    document.querySelector(
      ".site-header"
    );

  const navToggle =
    document.querySelector(
      ".nav-toggle"
    );

  const siteNav =
    document.getElementById(
      "site-nav"
    );

  const navLinks =
    siteNav
      ? siteNav.querySelectorAll("a")
      : [];

  const lightbox =
    document.getElementById(
      "projectLightbox"
    );

  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );

  const lightboxCaption =
    document.getElementById(
      "lightboxCaption"
    );

  const lightboxTriggers =
    document.querySelectorAll(
      "[data-lightbox]"
    );

  const lightboxCloseElements =
    lightbox
      ? lightbox.querySelectorAll(
          "[data-lightbox-close]"
        )
      : [];

  const lightboxCloseButton =
    lightbox
      ? lightbox.querySelector(
          ".lightbox-close"
        )
      : null;

  const currentYear =
    document.getElementById(
      "currentYear"
    );


  let lastFocusedElement = null;


  /* ========================================
     COPYRIGHT YEAR
     ======================================== */

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* ========================================
     HEADER SCROLL STATE
     ======================================== */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 24) {
      header.classList.add(
        "scrolled"
      );
    } else {
      header.classList.remove(
        "scrolled"
      );
    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* ========================================
     MOBILE NAVIGATION
     ======================================== */

  function openNavigation() {

    if (
      !navToggle ||
      !siteNav
    ) {
      return;
    }

    navToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    navToggle.setAttribute(
      "aria-label",
      "Close navigation"
    );

    siteNav.classList.add(
      "open"
    );

    body.classList.add(
      "nav-open"
    );

  }


  function closeNavigation() {

    if (
      !navToggle ||
      !siteNav
    ) {
      return;
    }

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );

    siteNav.classList.remove(
      "open"
    );

    body.classList.remove(
      "nav-open"
    );

  }


  function toggleNavigation() {

    if (!navToggle) {
      return;
    }

    const isOpen =
      navToggle.getAttribute(
        "aria-expanded"
      ) === "true";


    if (isOpen) {
      closeNavigation();
    } else {
      openNavigation();
    }

  }


  if (navToggle) {

    navToggle.addEventListener(
      "click",
      toggleNavigation
    );

  }


  navLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        closeNavigation();

      }
    );

  });


  /* ========================================
     CLOSE MOBILE NAV WHEN
     RETURNING TO DESKTOP
     ======================================== */

  const desktopMedia =
    window.matchMedia(
      "(min-width: 1001px)"
    );


  function handleDesktopChange(
    event
  ) {

    if (event.matches) {
      closeNavigation();
    }

  }


  if (
    typeof desktopMedia.addEventListener ===
    "function"
  ) {

    desktopMedia.addEventListener(
      "change",
      handleDesktopChange
    );

  } else if (
    typeof desktopMedia.addListener ===
    "function"
  ) {

    /*
      Older Safari fallback.
    */

    desktopMedia.addListener(
      handleDesktopChange
    );

  }


  /* ========================================
     PROJECT LIGHTBOX
     ======================================== */

  function openLightbox(
    trigger
  ) {

    if (
      !lightbox ||
      !lightboxImage ||
      !lightboxCaption ||
      !trigger
    ) {
      return;
    }


    const imageSource =
      trigger.dataset.full;

    const imageAlt =
      trigger.dataset.alt ||
      "Living Waters Aquascapes project";


    if (!imageSource) {
      return;
    }


    lastFocusedElement =
      document.activeElement;


    lightboxImage.src =
      imageSource;

    lightboxImage.alt =
      imageAlt;

    lightboxCaption.textContent =
      imageAlt;


    lightbox.classList.add(
      "active"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add(
      "lightbox-open"
    );


    if (lightboxCloseButton) {

      window.setTimeout(
        () => {
          lightboxCloseButton.focus();
        },
        50
      );

    }

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }


    lightbox.classList.remove(
      "active"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove(
      "lightbox-open"
    );


    /*
      Wait until the closing
      transition begins before
      clearing the image.
    */

    window.setTimeout(
      () => {

        if (
          lightbox.classList.contains(
            "active"
          )
        ) {
          return;
        }


        if (lightboxImage) {

          lightboxImage.src = "";
          lightboxImage.alt = "";

        }


        if (lightboxCaption) {

          lightboxCaption.textContent =
            "";

        }

      },
      260
    );


    /*
      Return keyboard focus to
      the project that opened
      the lightbox.
    */

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus ===
        "function"
    ) {

      lastFocusedElement.focus();

    }


    lastFocusedElement = null;

  }


  lightboxTriggers.forEach(
    (trigger) => {

      trigger.addEventListener(
        "click",
        () => {

          openLightbox(
            trigger
          );

        }
      );

    }
  );


  lightboxCloseElements.forEach(
    (element) => {

      element.addEventListener(
        "click",
        () => {

          closeLightbox();

        }
      );

    }
  );


  /* ========================================
     LIGHTBOX FOCUS TRAP
     ======================================== */

  function trapLightboxFocus(
    event
  ) {

    if (
      !lightbox ||
      !lightbox.classList.contains(
        "active"
      )
    ) {
      return;
    }


    const focusableElements =
      lightbox.querySelectorAll(
        [
          "button:not([disabled])",
          "a[href]",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])'
        ].join(",")
      );


    if (
      focusableElements.length === 0
    ) {
      return;
    }


    const firstFocusable =
      focusableElements[0];

    const lastFocusable =
      focusableElements[
        focusableElements.length - 1
      ];


    if (
      event.shiftKey &&
      document.activeElement ===
        firstFocusable
    ) {

      event.preventDefault();

      lastFocusable.focus();

      return;

    }


    if (
      !event.shiftKey &&
      document.activeElement ===
        lastFocusable
    ) {

      event.preventDefault();

      firstFocusable.focus();

    }

  }


  /* ========================================
     KEYBOARD CONTROLS
     ======================================== */

  document.addEventListener(
    "keydown",
    (event) => {


      /*
        Escape closes whichever
        overlay is currently open.
      */

      if (
        event.key === "Escape"
      ) {

        if (
          lightbox &&
          lightbox.classList.contains(
            "active"
          )
        ) {

          closeLightbox();

          return;

        }


        if (
          navToggle &&
          navToggle.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {

          closeNavigation();

          navToggle.focus();

        }

      }


      /*
        Keep keyboard focus inside
        the open lightbox.
      */

      if (
        event.key === "Tab"
      ) {

        trapLightboxFocus(
          event
        );

      }

    }
  );


  /* ========================================
     SMOOTH INTERNAL LINKS
     ======================================== */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          let target;


          try {

            target =
              document.querySelector(
                targetId
              );

          } catch (error) {

            return;

          }


          if (!target) {
            return;
          }


          event.preventDefault();


          const prefersReducedMotion =
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;


          target.scrollIntoView({
            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth",

            block: "start"
          });


          /*
            Update URL without
            forcing another jump.
          */

          if (
            window.history &&
            typeof window.history.pushState ===
              "function"
          ) {

            window.history.pushState(
              null,
              "",
              targetId
            );

          }

        }
      );

    }
  );


  /* ========================================
     LIGHT PARALLAX ON HERO

     Very restrained.
     Desktop / pointer devices only.
     ======================================== */

  const heroImage =
    document.querySelector(
      ".hero-backdrop-image"
    );


  const motionAllowed =
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  function updateHeroParallax() {

    if (
      !heroImage ||
      !motionAllowed ||
      !finePointer
    ) {
      return;
    }


    const scrollPosition =
      window.scrollY;


    /*
      Stop calculating after the
      hero has left the viewport.
    */

    if (
      scrollPosition >
      window.innerHeight * 1.15
    ) {
      return;
    }


    const offset =
      Math.min(
        scrollPosition * 0.08,
        55
      );


    heroImage.style.transform =
      `scale(1.035)
       translate3d(
         0,
         ${offset}px,
         0
       )`;

  }


  if (
    heroImage &&
    motionAllowed &&
    finePointer
  ) {

    updateHeroParallax();


    window.addEventListener(
      "scroll",
      updateHeroParallax,
      {
        passive: true
      }
    );

  }


  /* ========================================
     IMAGE LOAD SAFETY

     If a project image cannot
     load, do not leave an empty
     clickable lightbox card.
     ======================================== */

  const projectImages =
    document.querySelectorAll(
      ".project-card img"
    );


  projectImages.forEach(
    (image) => {

      image.addEventListener(
        "error",
        () => {

          const card =
            image.closest(
              ".project-card"
            );


          if (!card) {
            return;
          }


          card.classList.add(
            "image-missing"
          );

        }
      );

    }
  );


});