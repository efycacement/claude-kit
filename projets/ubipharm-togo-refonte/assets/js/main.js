/* UbiPharm Togo — interactions communes (sans dépendance) */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- En-tête : ombre au défilement ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var panel = document.getElementById("mobile-panel");
  function setMenu(open) {
    if (!toggle || !panel) return;
    if (open) panel.style.top = Math.max(0, header.getBoundingClientRect().bottom) + "px";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    panel.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 980) setMenu(false); });
  }

  /* ---------- Statut ouvert / fermé (heure de Lomé = GMT) ---------- */
  var SCHEDULE = {
    1: [[480, 750], [840, 1020]], 2: [[480, 750], [840, 1020]], 3: [[480, 750], [840, 1020]],
    4: [[480, 750], [840, 1020]], 5: [[480, 750], [840, 1020]], 6: [[540, 720]], 0: []
  };
  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return h + "h" + (mm ? String(mm).padStart(2, "0") : ""); }
  var now = new Date();
  var day = now.getUTCDay(), minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  var slot = (SCHEDULE[day] || []).filter(function (s) { return minutes >= s[0] && minutes < s[1]; })[0];
  var statusEl = document.querySelector("[data-open-status]");
  var dotEl = document.querySelector("[data-open-dot]");
  if (statusEl) {
    if (slot) {
      statusEl.textContent = "Ouvert · jusqu'à " + fmt(slot[1]);
      if (dotEl) dotEl.classList.add("is-open");
    } else {
      var next = (SCHEDULE[day] || []).filter(function (s) { return s[0] > minutes; })[0];
      statusEl.textContent = next ? "Fermé · ouvre à " + fmt(next[0]) : "Fermé · Lun–Ven 8h–17h, Sam 9h–12h";
    }
  }
  var hours = document.getElementById("hours");
  if (hours) {
    Array.prototype.forEach.call(hours.querySelectorAll("tr"), function (tr) {
      if (tr.getAttribute("data-days").split(",").indexOf(String(day)) !== -1) tr.classList.add("today");
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var reveal = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    doc.classList.add("js");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveal.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Compteurs animés ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = +el.getAttribute("data-count"), start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Formulaires (démo : pas d'envoi réel) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("#contact-form, #apply-form"), function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var hp = form.querySelector(".hp input");
      if (hp && hp.value) return; // anti-spam
      var ok = form.querySelector(".form-success");
      if (ok) { ok.classList.add("is-visible"); ok.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); }
      form.reset();
    });
  });

  /* Pré-remplissage de l'objet du contact (?objet=acces) */
  var objet = document.getElementById("objet");
  if (objet) {
    var o = new URLSearchParams(location.search).get("objet");
    if (o && objet.querySelector('option[value="' + o + '"]')) objet.value = o;
  }

  /* ---------- Onglets carrières ---------- */
  var tabs = document.querySelectorAll("[data-tab]");
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener("click", function () {
      Array.prototype.forEach.call(tabs, function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.setAttribute("aria-pressed", String(on));
        var p = document.querySelector('[data-panel="' + t.getAttribute("data-tab") + '"]');
        if (p) p.classList.toggle("is-visible", on);
      });
    });
  });

  /* ---------- Année ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) { el.textContent = now.getFullYear(); });
})();
