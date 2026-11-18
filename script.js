/* ============================================================
   INSFP RAHMANIA — Script principal
   Auteur : Mme Maouche Meriem
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     1. RACCOURCIS & ÉTAT GLOBAL
     ------------------------------------------------------------ */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------
     2. DONNÉES DES BREVETS (7 filières)
     ------------------------------------------------------------ */
  const BREVETS = {
    "data-science": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Data Science",
      meta: [
        { icone: "i-clock", texte: "30 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac " },
        { icone: "i-layers", texte: "Stage en entreprise" }
      ],
      objectif:
        "Former des techniciens supérieurs capables de collecter, nettoyer, " +
        "analyser et valoriser des données massives afin d'éclairer les décisions " +
        "des organisations. La formation combine statistiques, programmation et " +
        "visualisation de données.",
      competences: [
        "Collecter et préparer des jeux de données hétérogènes",
        "Programmer en Python et manipuler les bibliothèques d'analyse",
        "Interroger des bases de données relationnelles (SQL)",
        "Construire des tableaux de bord et des visualisations",
        "Appliquer des modèles statistiques et de machine learning",
        "Restituer les résultats à un public non technique"
      ],
      debouches: [
        "Technicien supérieur en data science",
        "Analyste de données (data analyst)",
        "Assistant chef de projet data",
        "Technicien business intelligence",
        "Poursuite d'études en licence professionnelle"
      ]
    },

    "metaverse": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Métaverse",
      meta: [
        { icone: "i-clock", texte: "30 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac " },
        { icone: "i-layers", texte: "Ateliers 3D / VR" }
      ],
      objectif:
        "Préparer des techniciens spécialisés dans la conception et le développement " +
        "d'environnements virtuels immersifs : modélisation 3D, réalité augmentée " +
        "et réalité virtuelle, au service du divertissement, de la formation ou de " +
        "la simulation industrielle.",
      competences: [
        "Modéliser des objets et des environnements en 3D",
        "Utiliser les moteurs de rendu temps réel (Unity, Unreal)",
        "Concevoir des expériences en réalité augmentée et virtuelle",
        "Optimiser les scènes pour les casques et plateformes VR",
        "Intégrer des interactions et scénariser des parcours immersifs",
        "Prendre en compte l'ergonomie et le confort utilisateur"
      ],
      debouches: [
        "Développeur 3D / XR",
        "Technicien en réalité virtuelle et augmentée",
        "Assistant chef de projet métaverse",
        "Modeleur 3D temps réel",
        "Poursuite d'études en licence professionnelle"
      ]
    },

    "fibre-optique": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Fibre optique",
      meta: [
        { icone: "i-clock", texte: "30 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac" },
        { icone: "i-layers", texte: "Ateliers réseaux" }
      ],
      objectif:
        "Former des techniciens de terrain capables de déployer, raccorder et " +
        "maintenir les réseaux de fibre optique (FTTH, FTTx) conformément aux " +
        "normes et aux règles de sécurité.",
      competences: [
        "Lire et interpréter des plans de réseaux optiques",
        "Réaliser des soudures et des raccordements fibre",
        "Mesurer et qualifier une liaison optique (réflectométrie)",
        "Installer et configurer les équipements d'accès",
        "Diagnostiquer et réparer une panne sur le réseau",
        "Appliquer les règles d'hygiène et de sécurité"
      ],
      debouches: [
        "Technicien fibre optique",
        "Installateur raccordeur FTTH",
        "Technicien réseaux d'accès",
        "Agent de maintenance télécom",
        "Insertion en entreprise ou en collectivité"
      ]
    },

    "maintenance-it": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Maintenance IT",
      meta: [
        { icone: "i-clock", texte: "24 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac" },
        { icone: "i-layers", texte: "Ateliers matériels" }
      ],
      objectif:
        "Préparer des techniciens capables d'installer, de configurer, de " +
        "diagnostiquer et de maintenir les équipements informatiques et le parc " +
        "logiciel d'une organisation.",
      competences: [
        "Assembler et configurer des postes de travail",
        "Installer et administrer des systèmes d'exploitation",
        "Diagnostiquer une panne matérielle ou logicielle",
        "Configurer un réseau local et les équipements associés",
        "Assurer la maintenance préventive et curative",
        "Gérer le parc et documenter les interventions"
      ],
      debouches: [
        "Technicien de maintenance informatique",
        "Technicien support utilisateurs",
        "Technicien réseaux locaux",
        "Assistant administrateur systèmes",
        "Insertion en entreprise ou en ESN"
      ]
    },

    "ia-telecoms": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Intelligence Artificielle & Télécommunications",
      meta: [
        { icone: "i-clock", texte: "30 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac +2" },
        { icone: "i-layers", texte: "Laboratoire IA" }
      ],
      objectif:
        "Former des techniciens supérieurs capables de mettre en œuvre des " +
        "solutions d'intelligence artificielle au service des réseaux de " +
        "télécommunications : optimisation, supervision et sécurité des infrastructures.",
      competences: [
        "Comprendre les architectures des réseaux télécoms",
        "Appliquer des modèles d'IA à la supervision réseau",
        "Exploiter les données de trafic pour la prédiction",
        "Configurer des équipements de télécommunication",
        "Analyser et sécuriser les flux de communication",
        "Documenter et restituer les résultats d'analyse"
      ],
      debouches: [
        "Technicien supérieur IA & télécoms",
        "Technicien réseaux intelligents",
        "Assistant ingénieur télécom",
        "Exploitant de plateformes de supervision",
        "Poursuite d'études en licence professionnelle"
      ]
    },

    "cloud-computing": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Cloud Computing",
      meta: [
        { icone: "i-clock", texte: "24 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac " },
        { icone: "i-layers", texte: "Plateformes virtualisées" }
      ],
      objectif:
        "Préparer des techniciens capables d'installer, d'administrer et de " +
        "sécuriser des infrastructures virtualisées et des services cloud, " +
        "publics ou privés.",
      competences: [
        "Virtualiser des serveurs et des postes de travail",
        "Déployer des services cloud (IaaS, PaaS, SaaS)",
        "Administrer un système Linux et un annuaire",
        "Automatiser le déploiement d'applications",
        "Mettre en place la sauvegarde et la haute disponibilité",
        "Appliquer les bonnes pratiques de sécurité cloud"
      ],
      debouches: [
        "Technicien supérieur cloud",
        "Administrateur systèmes et réseaux",
        "Technicien virtualisation",
        "Exploitant de plateforme cloud",
        "Poursuite d'études en licence professionnelle"
      ]
    },

    "cybersecurite": {
      brevet: "Brevet de Technicien Supérieur — BTS",
      titre: "Cybersécurité",
      meta: [
        { icone: "i-clock", texte: "30 mois" },
        { icone: "i-award", texte: "Brevet d'État" },
        { icone: "i-cap",   texte: "Niveau Bac " },
        { icone: "i-layers", texte: "Laboratoire sécurité" }
      ],
      objectif:
        "Former des techniciens supérieurs capables de prévenir, détecter et " +
        "traiter les incidents de sécurité des systèmes d'information, dans le " +
        "respect des politiques de sécurité et des cadres réglementaires.",
      competences: [
        "Analyser les risques et appliquer une politique de sécurité",
        "Configurer un pare-feu et des équipements de filtrage",
        "Détecter et qualifier les incidents de sécurité",
        "Mettre en œuvre les mesures de remédiation",
        "Sécuriser les systèmes, réseaux et applications",
        "Sensibiliser les utilisateurs aux bonnes pratiques"
      ],
      debouches: [
        "Technicien supérieur en cybersécurité",
        "Analyste SOC (niveau 1)",
        "Technicien sécurité des systèmes",
        "Assistant RSSI",
        "Poursuite d'études en licence professionnelle"
      ]
    }
  };

  /* ------------------------------------------------------------
     3. MENU MOBILE
     ------------------------------------------------------------ */
  const burger = $("#burger");
  const nav    = $("#nav");

  function closeMenu() {
    if (!nav || !burger) return;
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  function toggleMenu() {
    if (!nav || !burger) return;
    const isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  }

  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }

  if (nav) {
    // Fermer le menu au clic sur un lien
    $$("a", nav).forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!nav || !burger) return;
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    closeMenu();
  });

  // Fermer le menu avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Fermer le menu lors d'un redimensionnement vers desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ------------------------------------------------------------
     4. HEADER AU SCROLL & BOUTON RETOUR EN HAUT
     ------------------------------------------------------------ */
  const header = $("#header");
  const toTop  = $("#toTop");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle("is-scrolled", y > 40);
    }

    if (toTop) {
      toTop.classList.toggle("is-visible", y > 500);
    }
  }

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        onScroll();
        scrollTicking = false;
      });
    },
    { passive: true }
  );

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }

  /* ------------------------------------------------------------
     5. LIEN DE NAVIGATION ACTIF AU SCROLL
     ------------------------------------------------------------ */
  const navLinks = nav ? $$("a[href^='#']", nav) : [];
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveLink() {
    if (!navLinks.length || !sections.length) return;

    const scrollPos = window.scrollY + 140;
    let currentId = sections[0].id;

    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      requestAnimationFrame(setActiveLink);
    },
    { passive: true }
  );

  /* ------------------------------------------------------------
     6. ANIMATIONS D'APPARITION (REVEAL)
     ------------------------------------------------------------ */
  const revealEls = $$(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback : tout afficher immédiatement
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ------------------------------------------------------------
     7. COMPTEURS ANIMÉS
     ------------------------------------------------------------ */
  const counters = $$("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString("fr-FR") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      el.textContent = target.toLocaleString("fr-FR") + suffix;
    });
  }

  /* ------------------------------------------------------------
     8. MODALE DES BREVETS
     ------------------------------------------------------------ */
  const modal          = $("#modal");
  const modalBrevet    = $("#modalBrevet");
  const modalTitle     = $("#modalTitle");
  const modalMeta      = $("#modalMeta");
  const modalObjectif  = $("#modalObjectif");
  const modalCompet    = $("#modalCompetences");
  const modalDebouches = $("#modalDebouches");

  let lastFocusedElement = null;

  function buildMeta(metaList) {
    if (!modalMeta) return;
    modalMeta.innerHTML = "";
    metaList.forEach((item) => {
      const span = document.createElement("span");
      span.innerHTML =
        '<svg aria-hidden="true"><use href="#' +
        item.icone +
        '"></use></svg>' +
        item.texte;
      modalMeta.appendChild(span);
    });
  }

  function buildList(container, items) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      container.appendChild(li);
    });
  }

  function openModal(key) {
    const data = BREVETS[key];
    if (!data || !modal) return;

    lastFocusedElement = document.activeElement;

    if (modalBrevet)    modalBrevet.textContent    = data.brevet;
    if (modalTitle)     modalTitle.textContent     = data.titre;
    if (modalObjectif)  modalObjectif.textContent  = data.objectif;

    buildMeta(data.meta);
    buildList(modalCompet, data.competences);
    buildList(modalDebouches, data.debouches);

    modal.hidden = false;
    document.body.classList.add("modal-open");

    // Focus sur le bouton de fermeture
    const closeBtn = $(".modal__close", modal);
    if (closeBtn) {
      // Léger délai pour laisser le rendu se faire
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  // Boutons d'ouverture
  $$("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.open);
    });
  });

  // Boutons de fermeture (backdrop, croix, CTA)
  $$("[data-close]", modal || document).forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  // Fermeture au clavier
  document.addEventListener("keydown", (e) => {
    if (!modal || modal.hidden) return;
    if (e.key === "Escape") closeModal();

    // Piège de focus (accessibilité)
    if (e.key === "Tab") {
      const focusables = $$(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        modal
      ).filter((el) => !el.disabled && el.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ------------------------------------------------------------
     9. ANNÉE DYNAMIQUE
     ------------------------------------------------------------ */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     10. INITIALISATION
     ------------------------------------------------------------ */
  onScroll();
  setActiveLink();
})();