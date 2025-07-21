document.addEventListener("DOMContentLoaded", function () {
  // Image switching functionality
  const leftElems = document.querySelectorAll(".leftelem");
  const images = document.querySelectorAll("#fright .images img");

  // Show first image by default
  if (images.length > 0) {
    images[0].classList.add("active");
  }

  // Hover functionality for desktop and tablet
  leftElems.forEach((elem, index) => {
    elem.addEventListener("mouseenter", () => {
      images.forEach((img) => img.classList.remove("active"));
      if (images[index]) {
        images[index].classList.add("active");
      }
    });

    // Touch functionality for mobile
    elem.addEventListener("touchstart", () => {
      images.forEach((img) => img.classList.remove("active"));
      if (images[index]) {
        images[index].classList.add("active");
      }
    });

    // Click functionality for all devices
    elem.addEventListener("click", () => {
      images.forEach((img) => img.classList.remove("active"));
      if (images[index]) {
        images[index].classList.add("active");
      }
    });
  });

  // Basic Shery effects (only for desktop to avoid mobile performance issues)
  if (typeof Shery !== "undefined" && window.innerWidth > 768) {
    try {
      Shery.mouseFollower();
      Shery.makeMagnet(".magnet");
    } catch (error) {
      console.log("Shery effects error:", error);
    }
  }

  // GSAP Scroll animations (optimize for mobile)
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // Main scroll animation (only for desktop/tablet)
      if (window.innerWidth > 768) {
        gsap.to(".leftelem", {
          scrollTrigger: {
            trigger: ".fimages",
            pin: true,
            start: "top top",
            end: "bottom bottom",
            endTrigger: ".last",
            scrub: 1,
          },
          y: "-300%",
          ease: "power1.inOut",
        });
      }

      // Scroll-based image switching for all devices
      leftElems.forEach((elem, index) => {
        ScrollTrigger.create({
          trigger: elem,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            images.forEach((img) => img.classList.remove("active"));
            if (images[index]) {
              images[index].classList.add("active");
            }
          },
        });
      });
    } catch (error) {
      console.log("GSAP error:", error);
    }
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
