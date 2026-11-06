(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector("#motion");
  const story = document.querySelector(".platform-story");
  const stage = document.querySelector(".architecture-stage");
  const chapterButtons = [...document.querySelectorAll("button[data-step]")];
  const chapters = [
    [
      "Internal developer platform",
      "An internal PaaS on OCI Kubernetes Engine brings application hosting, onboarding, and delivery into one place.",
    ],
    [
      "Authentication and authorization",
      "A reusable JWT/JWKS SDK and shared sign-in bring consistent identity and roles across three RAG services.",
    ],
    [
      "Deployment and release management",
      "Coordinated GitLab and Liquibase releases connect the portal, routing, APIs, and Oracle-backed registry.",
    ],
  ];
  let motion = !reduced.matches;
  let chapter = -1;
  let frame = 0;
  let observer;

  function setChapter(index) {
    if (chapter === index) return;
    chapter = index;
    document.querySelector("#story-title").textContent = chapters[index][0];
    document.querySelector("#story-body").textContent = chapters[index][1];
    document.querySelector(".step-count").textContent = `0${index + 1} / 03`;
    stage.dataset.step = index;
    chapterButtons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(Number(button.dataset.step) === index),
      ),
    );
  }
  function update() {
    frame = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    document.querySelector("#reading-progress").style.transform =
      `scaleX(${max > 0 ? scrollY / max : 0})`;
    const desktopMotion = motion && innerWidth > 760;
    const hero = document.querySelector(".hero");
    const progress = Math.max(
      0,
      Math.min(1, -hero.getBoundingClientRect().top / innerHeight),
    );
    const intro = document.querySelector(".hero-intro");
    const network = document.querySelector(".work-network");
    intro.style.transform = desktopMotion
      ? `translateY(${progress * 35}px)`
      : "";
    intro.style.opacity = desktopMotion ? String(1 - progress * 0.7) : "";
    network.style.transform = desktopMotion
      ? `translateY(${progress * -25}px) scale(${1 + progress * 0.035})`
      : "";
    if (desktopMotion) {
      const p = Math.max(
        0,
        Math.min(
          0.999,
          -story.getBoundingClientRect().top /
            Math.max(1, story.offsetHeight - innerHeight),
        ),
      );
      setChapter(Math.floor(p * 3));
      stage.style.setProperty("--diagram-shift", `${(p - 0.5) * -28}px`);
    } else {
      stage.style.removeProperty("--diagram-shift");
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function configureMotion() {
    document.body.classList.toggle("motion-off", !motion);
    toggle.setAttribute("aria-pressed", String(motion));
    toggle.textContent = motion ? "Motion on" : "Motion off";
    observer?.disconnect();
    if (motion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".reveal:not(.revealed)")
        .forEach((el) => observer.observe(el));
      document.documentElement.classList.add("js-motion");
    }
    schedule();
  }
  toggle.addEventListener("click", () => {
    motion = !motion;
    configureMotion();
  });
  reduced.addEventListener("change", (event) => {
    motion = !event.matches;
    configureMotion();
  });
  chapterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.step);
      if (!motion || innerWidth <= 760) setChapter(index);
      else
        scrollTo({
          top:
            scrollY +
            story.getBoundingClientRect().top +
            (story.offsetHeight - innerHeight) * (index / 3 + 0.12),
          behavior: "smooth",
        });
    }),
  );
  document.querySelectorAll("[data-product]").forEach((button) =>
    button.addEventListener("click", () => {
      const app = button.dataset.product;
      for (const part of ["copy", "object"]) {
        const template = document.querySelector(`#product-${app}-${part}`);
        document
          .querySelector(`#product-${part}`)
          .replaceChildren(template.content.cloneNode(true));
      }
      document
        .querySelectorAll("[data-product]")
        .forEach((other) =>
          other.setAttribute("aria-pressed", String(other === button)),
        );
    }),
  );
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  setChapter(0);
  configureMotion();
})();
