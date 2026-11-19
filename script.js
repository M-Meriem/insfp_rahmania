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

  function renderStats() {
    const grid = $("#statsGrid");
    if (!grid) return;

    const total = STATS.specialites.reduce((s, x) => s + x.nombre, 0);
    const nb    = STATS.specialites.length;

    const svg = (id) =>
      '<svg aria-hidden="true"><use href="#' + id + '"></use></svg>';
    const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

    // Carte TOTAL INSTITUT
    let html =
      '<article class="stat stat--total reveal">' +
        '<span class="stat__icon">' + svg("i-users") + '</span>' +
        '<h3>Total de l\'institut</h3>' +
        '<strong class="stat__num" data-count="' + total + '">0</strong>' +
        '<span class="stat__unit">' + STATS.unite + ' · ' + nb + ' spécialités</span>' +
      '</article>';

    // Cartes par spécialité
    STATS.specialites.forEach((sp, i) => {
      const pct = total ? Math.round((sp.nombre / total) * 100) : 0;
      html +=
        '<article class="stat reveal" style="--d:' + ((i % 4) * 0.06).toFixed(2) + 's">' +
          '<span class="stat__icon">' + svg(sp.icone) + '</span>' +
          '<h3>' + esc(sp.nom) + '</h3>' +
          '<strong class="stat__num" data-count="' + sp.nombre + '">0</strong>' +
          '<span class="stat__unit">' + STATS.unite + '</span>' +
          '<div class="stat__bar" role="img" aria-label="' + pct + ' % de l\'effectif total">' +
            '<span style="--w:' + pct + '%"></span>' +
          '</div>' +
          '<span class="stat__pct">' + pct + ' % de l\'effectif</span>' +
        '</article>';
    });

    grid.innerHTML = html;
  }

  renderStats();

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
     9b. ASSISTANT (CHATBOT) — répond à partir du contenu du site
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

    /* ---------- Coordonnées ---------- */
    const CONTACT = {
      tel:  "020 36 21 12",
      mail: "insfp.rahmania@gmail.com",
      fb:   "https://www.facebook.com/profile.php?id=100089009375724",
      ig:   "https://www.instagram.com/insfp_rahmania/"
    };

    /* ---------- Outils de texte ---------- */
    const norm = (s) =>
      s.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // Un mot-clé correspond s'il est un mot (ou début de mot) de la question,
    // ou, s'il contient un espace, une expression présente dans la question.
    function has(q, tokens, kw) {
      if (kw.indexOf(" ") !== -1) return q.indexOf(kw) !== -1;
      return tokens.some((t) => t === kw || (kw.length >= 4 && t.indexOf(kw) === 0));
    }
    const anyOf = (q, tokens, list) => list.some((kw) => has(q, tokens, kw));

    /* ---------- Spécialités (alias de reconnaissance) ---------- */
    const ALIAS = {
      "data-science":    ["data science", "data", "donnees", "data analyst"],
      "metaverse":       ["metaverse", "realite virtuelle", "realite augmentee", "vr", "3d", "xr"],
      "fibre-optique":   ["fibre", "ftth", "ftx", "optique"],
      "maintenance-it":  ["maintenance", "depannage", "support"],
      "ia-telecoms":     ["ia", "intelligence artificielle", "telecom", "telecoms", "telecommunication"],
      "cloud-computing": ["cloud", "virtualisation"],
      "cybersecurite":   ["cyber", "cybersecurite", "securite", "soc"]
    };

    function detectSpec(q, tokens) {
      const keys = Object.keys(ALIAS);
      for (let i = 0; i < keys.length; i++) {
        if (anyOf(q, tokens, ALIAS[keys[i]])) return keys[i];
      }
      return null;
    }

    const metaOf = (b, icone) => {
      const m = b.meta.find((x) => x.icone === icone);
      return m ? m.texte.trim() : "";
    };

    const li = (arr) =>
      "<ul>" + arr.map((x) => "<li>" + x + "</li>").join("") + "</ul>";

    const openBtn = (key) =>
      '<button type="button" class="chat__link" data-chat-open="' + key + '">' +
      "Voir la fiche complète du brevet</button>";

    const statFor = (titre) => {
      const key = norm(titre);
      return STATS.specialites.find((s) => norm(s.nom) === key ||
        norm(s.nom).indexOf(key.split(" ")[0]) === 0);
    };
    const totalStagiaires = () =>
      STATS.specialites.reduce((s, x) => s + x.nombre, 0);

    /* ---------- Réponses ---------- */
    const A = {
      accueil: () =>
        "Bonjour ! Je suis l'assistant de l'<strong>INSFP Rahmania</strong>. " +
        "Je peux vous renseigner sur les filières, les débouchés, les effectifs, " +
        "l'inscription et nos coordonnées. Que souhaitez-vous savoir ?",

      institut: () =>
        "L'<strong>INSFP Rahmania</strong> est un établissement public de formation " +
        "professionnelle rattaché au <strong>pôle de Sidi Abdellah</strong> (Rahmania, Alger). " +
        "Il forme des techniciens aux métiers du numérique, avec des ateliers pratiques, " +
        "des projets et des stages en entreprise. " +
        '<a href="#institut">Découvrir l\'institut</a>',

      filieres: () =>
        "Nous proposons <strong>7 filières</strong> du numérique :" +
        li(Object.keys(BREVETS).map((k) => BREVETS[k].titre)) +
        "Dites-moi laquelle vous intéresse pour en savoir plus. " +
        '<a href="#formations">Voir les formations</a>',

      specGeneral: (k) => {
        const b = BREVETS[k];
        return "<strong>" + b.titre + "</strong> — " + b.brevet.replace("Brevet de Technicien Supérieur — ", "") +
          " · " + metaOf(b, "i-clock") + ".<br>" + b.objectif +
          "<br><br>Demandez-moi aussi les <em>débouchés</em> ou les <em>compétences</em> de cette filière.<br>" +
          openBtn(k);
      },
      specDebouches: (k) => {
        const b = BREVETS[k];
        return "Débouchés en <strong>" + b.titre + "</strong> :" + li(b.debouches) + openBtn(k);
      },
      specCompetences: (k) => {
        const b = BREVETS[k];
        return "Compétences visées en <strong>" + b.titre + "</strong> :" + li(b.competences) + openBtn(k);
      },
      specDuree: (k) => {
        const b = BREVETS[k];
        return "La filière <strong>" + b.titre + "</strong> dure <strong>" + metaOf(b, "i-clock") +
          "</strong> (niveau d'accès : " + metaOf(b, "i-cap") + ").";
      },
      specStat: (k) => {
        const b = BREVETS[k];
        const s = statFor(b.titre);
        if (!s) return A.stats();
        return "<strong>" + b.titre + "</strong> compte <strong>" + s.nombre + " " + STATS.unite +
          "</strong>, sur un total de " + totalStagiaires() + " pour l'institut. " +
          '<a href="#statistiques">Voir les statistiques</a>';
      },

      stats: () =>
        "L'institut compte <strong>" + totalStagiaires() + " " + STATS.unite + "</strong> au total :" +
        li(STATS.specialites.map((s) => s.nom + " : <strong>" + s.nombre + "</strong>")) +
        '<a href="#statistiques">Voir la section statistiques</a>',

      duree: () =>
        "La durée dépend de la filière :" +
        li(Object.keys(BREVETS).map((k) => BREVETS[k].titre + " : " + metaOf(BREVETS[k], "i-clock"))),

      debouches: () =>
        "Les débouchés dépendent de la filière (technicien supérieur, analyste, installateur, " +
        "administrateur…), avec possibilité de poursuivre en licence professionnelle. " +
        "Indiquez-moi une filière pour voir ses débouchés précis.",

      diplome: () =>
        "Chaque filière prépare à un <strong>brevet d'État</strong> : le " +
        "<strong>BTS</strong> (Brevet de Technicien Supérieur) ou le " +
        "<strong>BP</strong> (Brevet Professionnel). " +
        '<a href="#formations">Voir les formations</a>',

      inscription: () =>
        "Pour vous inscrire ou connaître les conditions d'admission et les dates, " +
        "contactez directement l'institut : <br>📞 " +
        '<a href="tel:+21320362112">' + CONTACT.tel + "</a><br>✉️ " +
        '<a href="mailto:' + CONTACT.mail + '">' + CONTACT.mail + "</a>",

      directrice: () =>
        "L'institut est dirigé par <strong>Mme Mouna Benkhalifa</strong>, directrice de l'INSFP Rahmania. " +
        '<a href="#directrice">Lire son mot</a>',

      contact: () =>
        "Vous pouvez nous joindre ainsi :<br>" +
        "📞 <a href=\"tel:+21320362112\">" + CONTACT.tel + "</a><br>" +
        "✉️ <a href=\"mailto:" + CONTACT.mail + "\">" + CONTACT.mail + "</a><br>" +
        "👍 <a href=\"" + CONTACT.fb + "\" target=\"_blank\" rel=\"noopener noreferrer\">Facebook</a> · " +
        "📷 <a href=\"" + CONTACT.ig + "\" target=\"_blank\" rel=\"noopener noreferrer\">Instagram</a>",

      adresse: () =>
        "📍 INSFP Rahmania — Pôle de Sidi Abdellah, Rahmania, Alger, Algérie. " +
        '<a href="#contact">Voir la section contact</a>',

      merci: () => "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊",
      aurevoir: () => "Au revoir et à bientôt à l'INSFP Rahmania !",

      inconnu: () =>
        "Je n'ai pas trouvé de réponse précise à cette question dans le contenu du site. " +
        "Je peux vous parler des <em>filières</em>, des <em>débouchés</em>, des <em>effectifs</em>, " +
        "de l'<em>inscription</em> ou du <em>contact</em>. Pour toute autre demande, " +
        'appelez-nous au <a href="tel:+21320362112">' + CONTACT.tel + "</a> ou écrivez à " +
        '<a href="mailto:' + CONTACT.mail + '">' + CONTACT.mail + "</a>."
    };

    /* ---------- Moteur de réponse ---------- */
    function reply(raw) {
      const q = norm(raw);
      const tokens = q.split(" ").filter(Boolean);
      if (!tokens.length) return A.inconnu();

      const isStat    = anyOf(q, tokens, ["stagiaire", "effectif", "statistique", "chiffre", "inscrit", "combien", "total", "nombre", "etudiant"]);
      const isDuree   = anyOf(q, tokens, ["mois", "duree", "longtemps", "annee", "combien de temps"]);
      const isDeb     = anyOf(q, tokens, ["debouche", "metier", "emploi", "travail", "poste", "carriere", "salaire", "embauche"]);
      const isComp    = anyOf(q, tokens, ["competence", "apprend", "programme", "contenu", "module", "matiere", "objectif"]);

      // 1. Politesse
      if (anyOf(q, tokens, ["merci", "thanks", "parfait", "super"]) && tokens.length <= 4) return A.merci();
      if (anyOf(q, tokens, ["au revoir", "bye", "salut a bientot", "a bientot"])) return A.aurevoir();
      if (anyOf(q, tokens, ["bonjour", "salut", "bonsoir", "hello", "salam", "coucou"]) && tokens.length <= 3) return A.accueil();

      // 2. Question sur une spécialité précise
      const spec = detectSpec(q, tokens);
      if (spec) {
        if (isDuree) return A.specDuree(spec);
        if (isDeb)   return A.specDebouches(spec);
        if (isComp)  return A.specCompetences(spec);
        if (isStat)  return A.specStat(spec);
        return A.specGeneral(spec);
      }

      // 3. Sujets généraux
      if (anyOf(q, tokens, ["inscri", "admission", "candidature", "postuler", "dossier", "condition", "rejoindre", "comment integrer"])) return A.inscription();
      if (anyOf(q, tokens, ["directrice", "directeur", "responsable", "dirige", "benkhalifa", "mouna"])) return A.directrice();
      if (anyOf(q, tokens, ["adresse", "ou se trouve", "ou etes vous", "ou est", "ou etes", "localisation", "situe", "lieu", "plan", "alger", "sidi abdellah", "venir"]) ) return A.adresse();
      if (anyOf(q, tokens, ["contact", "telephone", "tel", "appeler", "numero", "mail", "email", "facebook", "instagram", "reseaux", "joindre"])) return A.contact();
      if (isStat)  return A.stats();
      if (isDuree) return A.duree();
      if (isDeb)   return A.debouches();
      if (anyOf(q, tokens, ["diplome", "brevet", "bts", "certificat", "attestation", "titre"])) return A.diplome();
      if (anyOf(q, tokens, ["filiere", "formation", "specialite", "cursus", "domaine", "propose", "offre", "enseigne"])) return A.filieres();
      if (anyOf(q, tokens, ["institut", "insfp", "ecole", "etablissement", "qui etes vous", "presentation", "propos", "public", "pole"])) return A.institut();
      if (anyOf(q, tokens, ["aide", "aider", "quoi", "que peux tu", "que pouvez vous"])) return A.accueil();

      return A.inconnu();
    }

    /* ---------- Interface ---------- */
    function addMsg(html, who, isHTML) {
      const div = document.createElement("div");
      div.className = "chat__msg chat__msg--" + who;
      if (isHTML) div.innerHTML = html; else div.textContent = html;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }

    function botSay(html) {
      const typing = addMsg("<span class=\"chat__dots\"><i></i><i></i><i></i></span>", "bot", true);
      setTimeout(() => {
        typing.innerHTML = html;
        log.scrollTop = log.scrollHeight;
      }, prefersReducedMotion ? 0 : 450);
    }

    function ask(text) {
      const t = text.trim();
      if (!t) return;
      addMsg(t, "user", false);
      botSay(reply(t));
    }

    const SUGGESTIONS = [
      "Quelles filières ?",
      "Combien de stagiaires ?",
      "Comment s'inscrire ?",
      "Quels débouchés ?",
      "Contact",
      "Où êtes-vous ?"
    ];
    SUGGESTIONS.forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chat__chip";
      b.textContent = s;
      b.addEventListener("click", () => ask(s));
      chips.appendChild(b);
    });

    let greeted = false;
    function openChat() {
      panel.hidden = false;
      root.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      fab.setAttribute("aria-label", "Fermer l'assistant");
      if (!greeted) { greeted = true; addMsg(A.accueil(), "bot", true); }
      setTimeout(() => input.focus(), 60);
    }
    function closeChat() {
      panel.hidden = true;
      root.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      fab.setAttribute("aria-label", "Ouvrir l'assistant");
    }

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
  onScroll();
  setActiveLink();
})();