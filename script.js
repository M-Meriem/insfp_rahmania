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
     1b. LANGUE (FR / EN / AR)
     ------------------------------------------------------------ */
  const I18N = window.I18N || {};
  const LANGS = ["fr", "en", "ar"];
  const LOCALES = { fr: "fr-FR", en: "en-US", ar: "ar-u-nu-latn" };
  let LANG = "fr";
  try {
    const saved = localStorage.getItem("insfp-lang");
    if (LANGS.indexOf(saved) !== -1) LANG = saved;
  } catch (e) { /* stockage indisponible */ }
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (LANGS.indexOf(urlLang) !== -1) LANG = urlLang;

  const langHooks = [];                       // fonctions rappelées au changement de langue
  const t = (key, vars) => {
    let v = (I18N[LANG] && I18N[LANG][key]) || (I18N.fr && I18N.fr[key]) || key;
    if (vars) Object.keys(vars).forEach((k) => { v = v.replace("{" + k + "}", vars[k]); });
    return v;
  };
  const fmtNum = (n) => n.toLocaleString(LOCALES[LANG]);
  const fmtSuffix = (sfx) => (LANG === "ar" ? sfx.trim() : sfx);

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

  // Version localisée d'une fiche brevet (le français reste la source)
  function brevet(key, lang) {
    lang = lang || LANG;
    const base = BREVETS[key];
    const tr = lang !== "fr" && I18N.brevets && I18N.brevets[lang] && I18N.brevets[lang][key];
    if (!base || !tr) return base;
    return {
      brevet: tr.brevet,
      titre: tr.titre,
      objectif: tr.objectif,
      competences: tr.competences,
      debouches: tr.debouches,
      meta: base.meta.map((m, i) => ({ icone: m.icone, texte: tr.meta[i] }))
    };
  }

  /* ------------------------------------------------------------
     2b. STATISTIQUES (effectifs par spécialité + total institut)
     ------------------------------------------------------------
     ➜ Modifiez UNIQUEMENT les nombres ci-dessous : le total de
       l'institut, les pourcentages et les barres sont calculés
       automatiquement.
     ------------------------------------------------------------ */
  const STATS = {
    unite: "stagiaires",
    specialites: [
      { nom: "Data Science",            icone: "i-chart",   nombre: 45 },
      { nom: "Métaverse",               icone: "i-vr",      nombre: 32 },
      { nom: "Fibre optique",           icone: "i-fibre",   nombre: 38 },
      { nom: "Maintenance IT",          icone: "i-wrench",  nombre: 52 },
      { nom: "IA & Télécommunications", icone: "i-antenna", nombre: 28 },
      { nom: "Cloud Computing",         icone: "i-cloud",   nombre: 41 },
      { nom: "Cybersécurité",           icone: "i-shield",  nombre: 47 }
    ]
  };

  const statName = (i, lang) => {
    lang = lang || LANG;
    return lang !== "fr" && I18N.statNames && I18N.statNames[lang]
      ? I18N.statNames[lang][i] : STATS.specialites[i].nom;
  };

  function renderStats(instant) {
    const grid = $("#statsGrid");
    if (!grid) return;

    const total = STATS.specialites.reduce((s, x) => s + x.nombre, 0);
    const nb    = STATS.specialites.length;

    const svg = (id) =>
      '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>';
    const esc = (x) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const unit = t("stats.unit");
    const show = (n) => (instant ? fmtNum(n) : "0");
    const inCls = instant ? " is-in" : "";

    // Carte TOTAL INSTITUT
    let html =
      '<article class="stat stat--total reveal' + inCls + '">' +
        '<span class="stat__icon">' + svg("i-users") + '</span>' +
        '<h3>' + t("stats.total") + '</h3>' +
        '<strong class="stat__num" data-count="' + total + '">' + show(total) + '</strong>' +
        '<span class="stat__unit">' + unit + ' · ' + t("stats.specs", { n: nb }) + '</span>' +
      '</article>';

    // Cartes par spécialité
    STATS.specialites.forEach((sp, i) => {
      const pct = total ? Math.round((sp.nombre / total) * 100) : 0;
      html +=
        '<article class="stat reveal' + inCls + '" style="--d:' + ((i % 4) * 0.06).toFixed(2) + 's">' +
          '<span class="stat__icon">' + svg(sp.icone) + '</span>' +
          '<h3>' + esc(statName(i)) + '</h3>' +
          '<strong class="stat__num" data-count="' + sp.nombre + '">' + show(sp.nombre) + '</strong>' +
          '<span class="stat__unit">' + unit + '</span>' +
          '<div class="stat__bar" role="img" aria-label="' + t("stats.aria", { p: pct }) + '">' +
            '<span style="--w:' + pct + '%"></span>' +
          '</div>' +
          '<span class="stat__pct">' + t("stats.pct", { p: pct }) + '</span>' +
        '</article>';
    });

    grid.innerHTML = html;
  }

  renderStats();
  langHooks.push(() => renderStats(true));

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
    burger.setAttribute("aria-label", t("menu.open"));
  }

  function toggleMenu() {
    if (!nav || !burger) return;
    const isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute(
      "aria-label",
      isOpen ? t("menu.close") : t("menu.open")
    );
  }

  if (burger) {
    burger.addEventListener("click", toggleMenu);
    langHooks.push(() =>
      burger.setAttribute("aria-label", nav && nav.classList.contains("is-open") ? t("menu.close") : t("menu.open")));
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
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(target * eased);
      el.textContent = fmtNum(value) + fmtSuffix(el.dataset.suffix || "");
      if (progress < 1) { requestAnimationFrame(tick); } else { el.dataset.done = "1"; }
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
      el.textContent = fmtNum(target) + fmtSuffix(suffix);
      el.dataset.done = "1";
    });
  }
  // Au changement de langue : reformater les compteurs déjà animés
  langHooks.push(() => {
    $$(".hero__stats [data-count]").forEach((el) => {
      if (el.dataset.done) {
        el.textContent = fmtNum(parseInt(el.dataset.count, 10) || 0) + fmtSuffix(el.dataset.suffix || "");
      }
    });
  });

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
  let currentModalKey = null;

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

  function fillModal(key) {
    const data = brevet(key);
    if (!data) return;
    if (modalBrevet)    modalBrevet.textContent    = data.brevet;
    if (modalTitle)     modalTitle.textContent     = data.titre;
    if (modalObjectif)  modalObjectif.textContent  = data.objectif;

    buildMeta(data.meta);
    buildList(modalCompet, data.competences);
    buildList(modalDebouches, data.debouches);
  }

  function openModal(key) {
    if (!BREVETS[key] || !modal) return;

    lastFocusedElement = document.activeElement;
    currentModalKey = key;
    fillModal(key);

    modal.hidden = false;
    document.body.classList.add("modal-open");

    // Focus sur le bouton de fermeture
    const closeBtn = $(".modal__close", modal);
    if (closeBtn) {
      // Léger délai pour laisser le rendu se faire
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  langHooks.push(() => {
    if (modal && !modal.hidden && currentModalKey) fillModal(currentModalKey);
  });

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
     9b. ASSISTANT (CHATBOT) — répond à partir du contenu du site
         Comprend le français, l'anglais et l'arabe.
     ------------------------------------------------------------ */
  (function initChatbot() {
    const root   = $("#chat");
    const fab    = $("#chatFab");
    const panel  = $("#chatPanel");
    const log    = $("#chatLog");
    const chips  = $("#chatChips");
    const form   = $("#chatForm");
    const input  = $("#chatInput");
    const btnX   = $("#chatClose");
    if (!root || !fab || !panel || !log || !form || !input) return;

    const KW = (I18N && I18N.kw) || { alias: {} };
    const chatStr = (lang) => (I18N.chat && (I18N.chat[lang] || I18N.chat.fr)) || {};

    /* ---------- Coordonnées ---------- */
    const CONTACT = {
      tel:  "020 36 21 12",
      mail: "insfp.rahmania@gmail.com",
      fb:   "https://www.facebook.com/profile.php?id=100089009375724",
      ig:   "https://www.instagram.com/insfp_rahmania/"
    };

    /* ---------- Outils de texte ---------- */
    const hasArabic = (x) => /[\u0600-\u06FF]/.test(x);

    // Minuscules, sans accents latins ni voyelles brèves arabes ;
    // alef/ya/ta marbouta unifiés pour comparer des mots arabes.
    const norm = (x) =>
      x.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
        .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
        .replace(/[^a-z0-9\u0621-\u064A\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // Jetons de la question + variantes sans article/préfixe arabe (ال، وال، بال…)
    function tokenize(q) {
      const out = [];
      q.split(" ").filter(Boolean).forEach((tk) => {
        out.push(tk);
        const bare = tk.replace(/^(وال|بال|كال|فال|لل|ال)/, "");
        if (bare !== tk && bare.length > 1) out.push(bare);
      });
      return out;
    }

    // Un mot-clé correspond s'il est un mot (ou début de mot) de la question,
    // ou, s'il contient un espace, une expression présente dans la question.
    function has(q, tokens, kw) {
      const k = norm(kw);
      if (!k) return false;
      if (k.indexOf(" ") !== -1) return q.indexOf(k) !== -1;
      const minLen = hasArabic(k) ? 3 : 4;
      return tokens.some((tk) => tk === k || (k.length >= minLen && tk.indexOf(k) === 0));
    }
    const anyOf = (q, tokens, list) => (list || []).some((kw) => has(q, tokens, kw));

    function detectSpec(q, tokens) {
      const keys = Object.keys(KW.alias);
      for (let i = 0; i < keys.length; i++) {
        if (anyOf(q, tokens, KW.alias[keys[i]])) return keys[i];
      }
      return null;
    }

    const brevetKeys = () => Object.keys(BREVETS);
    const metaOf = (b, icone) => {
      const m = b.meta.find((x) => x.icone === icone);
      return m ? m.texte.trim() : "";
    };
    const li = (arr) => "<ul>" + arr.map((x) => "<li>" + x + "</li>").join("") + "</ul>";
    const openBtn = (C, key) =>
      '<button type="button" class="chat__link" data-chat-open="' + key + '">' + C.fiche + "</button>";

    const statIdx = (k) => brevetKeys().indexOf(k);
    const totalStagiaires = () => STATS.specialites.reduce((x, y) => x + y.nombre, 0);
    const unitOf = (L) => (L === "fr" ? STATS.unite : ((I18N[L] && I18N[L]["stats.unit"]) || STATS.unite));

    /* ---------- Réponses (C = textes de la langue, L = langue) ---------- */
    const A = {
      accueil: (C) => C.hello,
      institut: (C) => C.institut,

      filieres: (C, L) =>
        C.filieres(li(brevetKeys().map((k) => brevet(k, L).titre))),

      specGeneral: (C, L, k) => {
        const b = brevet(k, L);
        const code = b.brevet.split("—").pop().trim();
        return "<strong>" + b.titre + "</strong> — " + code + " · " + metaOf(b, "i-clock") + ".<br>" +
          b.objectif + "<br><br>" + C.more + "<br>" + openBtn(C, k);
      },
      specDebouches: (C, L, k) => {
        const b = brevet(k, L);
        return C.deb(b.titre) + li(b.debouches) + openBtn(C, k);
      },
      specCompetences: (C, L, k) => {
        const b = brevet(k, L);
        return C.comp(b.titre) + li(b.competences) + openBtn(C, k);
      },
      specDuree: (C, L, k) => {
        const b = brevet(k, L);
        return C.duree1(b.titre, metaOf(b, "i-clock"), metaOf(b, "i-cap"));
      },
      specStat: (C, L, k) => {
        const b = brevet(k, L);
        const s = STATS.specialites[statIdx(k)];
        if (!s) return A.stats(C, L);
        return C.stat1(b.titre, s.nombre, totalStagiaires(), unitOf(L));
      },

      stats: (C, L) =>
        C.statsAll(totalStagiaires(), unitOf(L)) +
        li(STATS.specialites.map((s, i) => statName(i, L) + " : <strong>" + s.nombre + "</strong>")) +
        '<a href="#statistiques">' + C.linkStats + "</a>",

      duree: (C, L) =>
        C.dureeAll + li(brevetKeys().map((k) => brevet(k, L).titre + " : " + metaOf(brevet(k, L), "i-clock"))),

      debouches: (C) => C.debGen,
      diplome: (C) => C.diplome,

      inscription: (C) =>
        C.inscription + "<br>📞 " +
        '<a href="tel:+21320362112" dir="ltr">' + CONTACT.tel + "</a><br>✉️ " +
        '<a href="mailto:' + CONTACT.mail + '" dir="ltr">' + CONTACT.mail + "</a>",

      directrice: (C) => C.directrice,

      contact: (C) =>
        C.contactIntro + "<br>" +
        '📞 <a href="tel:+21320362112" dir="ltr">' + CONTACT.tel + "</a><br>" +
        '✉️ <a href="mailto:' + CONTACT.mail + '" dir="ltr">' + CONTACT.mail + "</a><br>" +
        '👍 <a href="' + CONTACT.fb + '" target="_blank" rel="noopener noreferrer">Facebook</a> · ' +
        '📷 <a href="' + CONTACT.ig + '" target="_blank" rel="noopener noreferrer">Instagram</a>',

      adresse: (C) => C.adresse,
      merci: (C) => C.merci,
      aurevoir: (C) => C.bye,
      inconnu: (C) => C.unknown(CONTACT.tel, CONTACT.mail)
    };

    /* ---------- Moteur de réponse ---------- */
    // Retourne { html, lang } : on répond en arabe si la question est écrite en arabe,
    // sinon dans la langue actuellement affichée sur le site.
    function reply(raw) {
      const L = hasArabic(raw) ? "ar" : LANG;
      const C = chatStr(L);
      const q = norm(raw);
      const tokens = tokenize(q);
      const out = (html) => ({ html: html, lang: L });
      if (!tokens.length) return out(A.inconnu(C));

      const is = (list) => anyOf(q, tokens, list);
      const longQ  = is(KW.longQ);
      const isStat  = !longQ && is(KW.stat);
      const isDuree = longQ || is(KW.duree);
      const isDeb   = is(KW.deb);
      const isComp  = is(KW.comp);

      // 1. Politesse
      if (is(KW.merci) && tokens.length <= 4) return out(A.merci(C));
      if (is(KW.bye)) return out(A.aurevoir(C));
      if (is(KW.hello) && tokens.length <= 3) return out(A.accueil(C));

      // 2. Question sur une spécialité précise
      const spec = detectSpec(q, tokens);
      if (spec) {
        if (isDuree) return out(A.specDuree(C, L, spec));
        if (isDeb)   return out(A.specDebouches(C, L, spec));
        if (isComp)  return out(A.specCompetences(C, L, spec));
        if (isStat)  return out(A.specStat(C, L, spec));
        return out(A.specGeneral(C, L, spec));
      }

      // 3. Sujets généraux
      if (is(KW.inscr))      return out(A.inscription(C));
      if (is(KW.directrice)) return out(A.directrice(C));
      if (is(KW.adresse))    return out(A.adresse(C));
      if (is(KW.contact))    return out(A.contact(C));
      if (isStat)            return out(A.stats(C, L));
      if (isDuree)           return out(A.duree(C, L));
      if (isDeb)             return out(A.debouches(C));
      if (is(KW.diplome))    return out(A.diplome(C));
      if (is(KW.filieres))   return out(A.filieres(C, L));
      if (is(KW.institut))   return out(A.institut(C));
      if (is(KW.aide))       return out(A.accueil(C));

      return out(A.inconnu(C));
    }

    /* ---------- Interface ---------- */
    function addMsg(html, who, isHTML, lang) {
      const div = document.createElement("div");
      div.className = "chat__msg chat__msg--" + who;
      if (lang) div.dir = lang === "ar" ? "rtl" : "ltr";
      else if (who === "user") div.dir = "auto";
      if (isHTML) div.innerHTML = html; else div.textContent = html;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }

    function botSay(html, lang) {
      const typing = addMsg('<span class="chat__dots"><i></i><i></i><i></i></span>', "bot", true, lang);
      setTimeout(() => {
        typing.innerHTML = html;
        log.scrollTop = log.scrollHeight;
      }, prefersReducedMotion ? 0 : 450);
    }

    function ask(text) {
      const v = text.trim();
      if (!v) return;
      addMsg(v, "user", false);
      const r = reply(v);
      botSay(r.html, r.lang);
    }

    function buildChips() {
      chips.innerHTML = "";
      (chatStr(LANG).chips || []).forEach((label) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chat__chip";
        b.textContent = label;
        b.addEventListener("click", () => ask(label));
        chips.appendChild(b);
      });
    }
    buildChips();

    let greeted = false;
    const fabLabel = () => fab.setAttribute("aria-label", panel.hidden ? t("chat.open") : t("chat.closeLbl"));

    function openChat() {
      panel.hidden = false;
      root.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      fabLabel();
      if (!greeted) { greeted = true; addMsg(A.accueil(chatStr(LANG)), "bot", true, LANG); }
      setTimeout(() => input.focus(), 60);
    }
    function closeChat() {
      panel.hidden = true;
      root.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      fabLabel();
    }

    // Changement de langue : suggestions + libellé du bouton
    langHooks.push(() => { buildChips(); fabLabel(); });

    fab.addEventListener("click", () => (panel.hidden ? openChat() : closeChat()));
    if (btnX) btnX.addEventListener("click", () => { closeChat(); fab.focus(); });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = "";
      ask(v);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden && (!modal || modal.hidden)) {
        closeChat();
        fab.focus();
      }
    });

    // Liens dans les réponses : ouvrir la fiche brevet / fermer sur mobile pour les ancres
    log.addEventListener("click", (e) => {
      const openBtnEl = e.target.closest("[data-chat-open]");
      if (openBtnEl) { openModal(openBtnEl.dataset.chatOpen); return; }
      const a = e.target.closest("a[href^='#']");
      if (a && window.innerWidth <= 640) closeChat();
    });
  })();

  /* ------------------------------------------------------------
     10. INITIALISATION
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     11. GESTION DE LA LANGUE (FR / EN / AR)
     ------------------------------------------------------------ */
  const frText  = new WeakMap();   // élément -> texte français d'origine
  const frAttrs = new WeakMap();   // élément -> { attribut: valeur française }
  const frMeta = {
    title: document.title,
    desc: (document.querySelector('meta[name="description"]') || {}).content || ""
  };

  $$("[data-i18n]").forEach((el) => frText.set(el, el.innerHTML.replace(/\s+/g, " ").trim()));
  $$("[data-i18n-attr]").forEach((el) => {
    const map = {};
    el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
      const attr = pair.split(":")[0];
      map[attr] = el.getAttribute(attr);
    });
    frAttrs.set(el, map);
  });

  function applyLanguage(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = "fr";
    LANG = lang;
    const dict = I18N[lang] || {};
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach((el) => {
      const v = lang !== "fr" && dict[el.getAttribute("data-i18n")];
      el.innerHTML = v || frText.get(el);
    });

    $$("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
        const parts = pair.split(":");
        const v = lang !== "fr" && dict[parts[1]];
        el.setAttribute(parts[0], v || frAttrs.get(el)[parts[0]]);
      });
    });

    document.title = (lang !== "fr" && dict["meta.title"]) || frMeta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = (lang !== "fr" && dict["meta.desc"]) || frMeta.desc;

    $$(".lang-switch [data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    langHooks.forEach((fn) => fn());

    if (persist) {
      try { localStorage.setItem("insfp-lang", lang); } catch (e) { /* ignoré */ }
    }
    setActiveLink();
  }

  $$(".lang-switch [data-lang]").forEach((b) =>
    b.addEventListener("click", () => applyLanguage(b.dataset.lang, true)));

  if (LANG !== "fr") applyLanguage(LANG, false);
  onScroll();
  setActiveLink();
})();
