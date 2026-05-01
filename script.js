// Data structures for dynamic content
const portfolioData = {
  skills: [
    { name: "MongoDB", iconClass: "devicon-mongodb-plain colored", type: "devicon" },
    { name: "Express.js", iconClass: "devicon-express-original", type: "devicon" },
    { name: "React", iconClass: "devicon-react-original colored", type: "devicon" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored", type: "devicon" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored", type: "devicon" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored", type: "devicon" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored", type: "devicon" },
    { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain colored", type: "devicon" },
    {
      name: "Shopify",
      iconSrc: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
      type: "img"
    },
    {
      name: "WordPress",
      iconSrc: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
      type: "img"
    },
    {
      name: "Wix",
      iconSrc: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg",
      type: "img"
    },
    {
      name: "Zapier",
      iconSrc: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
      type: "img"
    },
    {
      name: "n8n",
      iconSrc: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4",
      type: "img"
    },
    {
      name: "Make",
      iconSrc: "https://images.ctfassets.net/qqlj6g4ee76j/1kFCvHFGIQGUe9U6ynKQ7r/9b77cc5d8003a2ed0c7e5e0d85db3a63/make-logo-large.png",
      type: "img"
    },
  ],

  experiences: [
    {
      company: "Scentalier Fragrances",
      title: "Shopify Developer",
      duration: "Present | Remote",
      icon: "fa-brands fa-shopify",
      responsibilities: [
        "Developing and customizing a Shopify storefront for a premium fragrance brand.",
        "Building and fine-tuning Liquid templates, sections, and blocks for a bespoke shopping experience.",
        "Integrating third-party apps and custom metafields to enhance product presentation and functionality.",
        "Optimizing store performance, page load speed, and mobile responsiveness.",
        "Implementing conversion-focused UI/UX improvements across product pages, collections, and checkout flow.",
      ],
      aosDelay: 0
    },
  ],

  // Projects intentionally left empty — add your projects here
  projects: [],

  contact: [
    {
      type: "Email",
      value: "sandhuusmanasif@gmail.com",
      icon: "fas fa-envelope",
      iconClass: "text-danger",
      link: "mailto:sandhuusmanasif@gmail.com",
      aosDelay: 0
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/usmanasif-sandhu",
      icon: "fab fa-linkedin",
      iconClass: "text-primary",
      link: "https://www.linkedin.com/in/usmanasif-sandhu/",
      aosDelay: 60
    },
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({ duration: 900, once: true, offset: 80 });
  initLoadingOverlay();
  initNavigation();
  initSkills();
  initExperience();
  initProjects();
  initContact();
  initLazyLoading();
  initParticles();
});

function initLoadingOverlay() {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const overlay = document.querySelector(".loading-overlay");
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.transition = "opacity 0.6s ease";
        setTimeout(() => overlay.remove(), 600);
      }
    }, 800);
  });
}

function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // close mobile menu
        const navCollapse = document.querySelector(".navbar-collapse");
        if (navCollapse && navCollapse.classList.contains("show")) {
          const toggler = document.querySelector(".navbar-toggler");
          if (toggler) toggler.click();
        }
        document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY + 160;
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        let sectionId = section.getAttribute("id");
        document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add("active");
      }
    });
  });

  // Subtle parallax on hero
  window.addEventListener("scroll", function () {
    const hero = document.querySelector(".hero");
    if (hero) {
      const scrollY = window.pageYOffset;
      hero.style.transform = `translateY(${scrollY * -0.18}px)`;
    }
  });

  // Typewriter effect
  setTimeout(function () {
    const heroTitle = document.querySelector(".hero-title .gradient-text");
    if (heroTitle) {
      typeEffect(heroTitle, "Usman Asif Sandhu", 65);
    }
  }, 900);
}

function typeEffect(element, text, speed = 80) {
  let i = 0;
  element.textContent = "";
  element.style.borderRight = "3px solid rgba(255,255,255,0.7)";
  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // Remove cursor after typing
      setTimeout(() => { element.style.borderRight = "none"; }, 800);
    }
  }
  typeWriter();
}

function initSkills() {
  const skillsContainer = document.getElementById("skills-container");
  if (!skillsContainer) return;

  // Group label for MERN
  const mernGroup = ["MongoDB", "Express.js", "React", "Node.js"];

  portfolioData.skills.forEach((skill, index) => {
    let iconHtml = "";
    if (skill.type === "devicon") {
      iconHtml = `<i class="${skill.iconClass}" style="font-size: 2.6rem;" aria-hidden="true"></i>`;
    } else if (skill.type === "img") {
      iconHtml = `<img src="${skill.iconSrc}" alt="${skill.name}" style="height: 2.6rem; object-fit: contain;" loading="lazy" />`;
    }

    const isMERN = mernGroup.includes(skill.name);
    const delay = 50 * index;

    const skillHtml = `
      <div class="col-6 col-sm-4 col-md-3 col-lg-2 skill-card ${isMERN ? 'mern-skill' : ''}"
           data-aos="fade-up" data-aos-delay="${delay}">
        <div class="skill-inner">
          <div class="skill-icon-wrap">
            ${iconHtml}
          </div>
          <span class="skill-name">${skill.name}</span>
          ${isMERN ? '<span class="mern-dot"></span>' : ''}
        </div>
      </div>
    `;
    skillsContainer.innerHTML += skillHtml;
  });
}

function initExperience() {
  const experienceContainer = document.getElementById("experience-container");
  if (!experienceContainer) return;
  portfolioData.experiences.forEach(exp => {
    const responsibilitiesList = exp.responsibilities.map(resp =>
      `<li class="exp-item">${resp}</li>`
    ).join('');
    const experienceCardHtml = `
      <div class="exp-card" data-aos="fade-up" data-aos-delay="${exp.aosDelay}">
        <div class="exp-card-accent"></div>
        <div class="exp-card-content">
          <div class="exp-header">
            <div class="exp-icon-wrap">
              <i class="${exp.icon}" aria-hidden="true"></i>
            </div>
            <div>
              <h4 class="exp-title">${exp.title}</h4>
              <span class="exp-company">${exp.company}</span>
            </div>
          </div>
          <div class="exp-duration">
            <i class="fa-regular fa-calendar me-1"></i>${exp.duration}
          </div>
          <ul class="exp-list">
            ${responsibilitiesList}
          </ul>
        </div>
      </div>
    `;
    experienceContainer.innerHTML += experienceCardHtml;
  });
}

function initProjects() {
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;
  projectsContainer.innerHTML = '';

  if (portfolioData.projects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="col-12 projects-empty" data-aos="fade-up">
        <div class="empty-projects-card">
          <div class="empty-icon">
            <i class="fa-solid fa-rocket"></i>
          </div>
          <h4>Projects Coming Soon</h4>
          <p>Exciting work is in progress. Check back soon!</p>
        </div>
      </div>
    `;
    return;
  }

  portfolioData.projects.forEach((project) => {
    const badgesHtml = project.badges.map(badge =>
      `<span class="proj-badge">${badge}</span>`
    ).join('');
    const featuredBadge = project.featured ?
      `<span class="proj-featured-badge">${project.featured}</span>` : '';

    let actionBtns = '';
    if (project.video && project.link) {
      actionBtns = `
        <div class="project-action-row">
          <button class="project-action-btn" data-video="${project.video}" data-title="${project.title}">
            <i class="fa fa-play-circle"></i> Demo
          </button>
          <a href="${project.link}" class="project-action-btn" target="_blank" rel="noopener">
            <i class="fa fa-link"></i> Live
          </a>
        </div>`;
    } else if (project.video) {
      actionBtns = `
        <div class="project-action-row">
          <button class="project-action-btn" data-video="${project.video}" data-title="${project.title}">
            <i class="fa fa-play-circle"></i> Demo
          </button>
        </div>`;
    } else if (project.link) {
      actionBtns = `
        <div class="project-action-row">
          <a href="${project.link}" class="project-action-btn" target="_blank" rel="noopener">
            <i class="fa fa-link"></i> Live
          </a>
        </div>`;
    }

    const projectHtml = `
      <div class="col" data-aos="zoom-in" data-aos-delay="${project.aosDelay || 0}">
        <div class="proj-card h-100">
          <div class="proj-img-wrapper">
            <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                 data-src="${project.image}" alt="${project.title}" class="lazyload">
            ${featuredBadge}
          </div>
          <div class="proj-body">
            <h4 class="proj-title">${project.title}</h4>
            <div class="proj-badges">${badgesHtml}</div>
            <p class="proj-desc">${project.description}</p>
            ${actionBtns}
          </div>
        </div>
      </div>
    `;
    projectsContainer.innerHTML += projectHtml;
  });

  document.querySelectorAll('.project-action-btn[data-video]').forEach(btn => {
    btn.addEventListener('click', function () {
      openVideoModal(this.getAttribute('data-video'), this.getAttribute('data-title'));
    });
  });
}

function openVideoModal(videoUrl, title) {
  let embedUrl = '';
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    let videoId = '';
    if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1].split(/[?&]/)[0];
    } else if (videoUrl.includes('v=')) {
      videoId = videoUrl.split('v=')[1].split('&')[0];
    }
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } else {
    embedUrl = videoUrl;
  }
  const modalBody = document.getElementById('videoModalBody');
  modalBody.innerHTML = `
    <div class="ratio ratio-16x9">
      <iframe src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
    </div>`;
  document.getElementById('videoModalLabel').textContent = title || "Project Demo";
  const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
  videoModal.show();
  document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    modalBody.innerHTML = '';
    document.getElementById('videoModalLabel').textContent = '';
  }, { once: true });
}

function initContact() {
  const contactContainer = document.getElementById("contact-container");
  if (!contactContainer) return;
  portfolioData.contact.forEach(contact => {
    const contactHtml = `
      <div class="col-md-5" data-aos="zoom-in" data-aos-delay="${contact.aosDelay}">
        <a href="${contact.link}" target="_blank" class="text-decoration-none">
          <div class="contact-card">
            <div class="contact-icon-wrap">
              <i class="${contact.icon} ${contact.iconClass}" aria-hidden="true"></i>
            </div>
            <div class="contact-info">
              <h5>${contact.type}</h5>
              <p>${contact.value}</p>
            </div>
            <i class="fa-solid fa-arrow-up-right-from-square contact-arrow"></i>
          </div>
        </a>
      </div>
    `;
    contactContainer.innerHTML += contactHtml;
  });
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img.lazyload");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        if (image.dataset.src) {
          image.src = image.dataset.src;
          image.onload = () => image.classList.remove("lazyload");
        }
        observer.unobserve(image);
      }
    });
  }, { rootMargin: "200px" });
  lazyImages.forEach((image) => imageObserver.observe(image));
}

function initParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement("div");
    dot.classList.add("hero-particle");
    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      animation-delay: ${Math.random() * 8}s;
      animation-duration: ${Math.random() * 10 + 8}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    hero.appendChild(dot);
  }
}