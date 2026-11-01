/* Annuaire des pharmacies — recherche & filtres côté client.
   Échantillon tiré de l'annuaire public actuel (togo.ubipharm.com).
   En production : remplacer PHARMACIES par un appel à l'API / base de données. */
(function () {
  "use strict";

  var PHARMACIES = [
    { nom: "2000", resp: "Moevi épse Akakpo Kiki Adoude", adresse: "Bè Kpota", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["96 37 94 25"] },
    { nom: "À Dieu la Gloire", resp: "Kamassan Ame Elom", adresse: "Agoè Légbassito, route de Madikpéto", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: [] },
    { nom: "Abraham", resp: "Pelei Takouda E. Frédéric", adresse: "Agoè Logopé, route du camp G.P.", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["96 80 08 96"] },
    { nom: "Adonaï", resp: "Massougbodji Ahlonko Marc", adresse: "Agoènyivé, face Hôtel Plantation", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["22 50 04 05"] },
    { nom: "Adouni", resp: "Rasak Soukouratou", adresse: "Vakpossito Logogomé", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["70 39 39 39"] },
    { nom: "Agbalépédogan Groupe C", resp: "Domingo Djibril", adresse: "Agbalépédo, près EPP Agbalépé C", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["99 98 20 87"] },
    { nom: "Agbegnigan", resp: "D'Almeida Messan Auguste Hugo", adresse: "Av. de la Libération, Tokoin Ramco", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["70 20 00 00"] },
    { nom: "Zongo", resp: "Pere Aklesso", adresse: "Agoè Zongo, Route nationale n°1", ville: "Lomé", zone: "Lomé", pays: "Togo", tel: ["70 45 23 16"] },
    { nom: "Agbélouvé", resp: "Agbebiokou Marcel", adresse: "Non loin du grand marché d'Agbélouvé", ville: "Tsévié", zone: "Région Maritime", pays: "Togo", tel: ["90 13 17 84"] },
    { nom: "Zio", resp: "Adjokou Sewa Bruno", adresse: "Près de la Mission catholique", ville: "Tsévié", zone: "Région Maritime", pays: "Togo", tel: ["90 21 93 17"] },
    { nom: "Adéta", resp: "Kouassi Kokouvi", adresse: "", ville: "Kpélé Adéta", zone: "Région des Plateaux", pays: "Togo", tel: ["92 51 25 59"] },
    { nom: "Adéchina", resp: "Edgard Prudencio", adresse: "Quartier Sikèkodji", ville: "Cotonou", zone: "Cotonou", pays: "Bénin", tel: ["+229 21 32 15 65"] },
    { nom: "Adétona-Lomnava", resp: "Alimatou Laguide", adresse: "", ville: "Cotonou", zone: "Cotonou", pays: "Bénin", tel: ["+229 94 01 23 97"] },
    { nom: "4 Thérapies", resp: "Kinkingnéhun Lazare", adresse: "06-2605", ville: "Cotonou", zone: "Cotonou", pays: "Bénin", tel: ["+229 31 35 55"] },
    { nom: "Zogbo", resp: "E. Hounkponou", adresse: "03 BP 0103", ville: "Cotonou", zone: "Cotonou", pays: "Bénin", tel: ["+229 21 38 36 93"] },
    { nom: "Adjarra Docodji UPAO", resp: "Fagbemi Joël Martial", adresse: "Adjégounlé", ville: "Porto-Novo", zone: "Porto-Novo", pays: "Bénin", tel: ["+229 64 33 00 00"] },
    { nom: "Zinvié Abomey-Calavi", resp: "Gbaguidi Todede Murielle", adresse: "Zinvié centre", ville: "Abomey-Calavi", zone: "Abomey-Calavi", pays: "Bénin", tel: ["+229 64 65 07 20"] },
    { nom: "Zoé Santé", resp: "Mme Assogba Karell Armela M.", adresse: "", ville: "Abomey-Calavi", zone: "Abomey-Calavi", pays: "Bénin", tel: ["+229 99 89 81 81"] },
    { nom: "Zogbédji", resp: "Bah-Tassou Bagnan", adresse: "", ville: "Lokossa", zone: "Lokossa", pays: "Bénin", tel: ["+229 22 41 14 71"] },
    { nom: "Zongo 2", resp: "Koutouma Adda Imorou", adresse: "Quartier Zongo 2", ville: "Parakou", zone: "Parakou", pays: "Bénin", tel: ["+229 23 61 01 95"] },
    { nom: "2ème Forage", resp: "Mounkaila Fatoumata Djibo", adresse: "Quartier Yantala traditionnel", ville: "Niamey", zone: "Niamey", pays: "Niger", tel: ["+227 90 19 45 14"] },
    { nom: "Adoua", resp: "Adamou Amadou Hamza", adresse: "Tallagué, commune IV", ville: "Niamey", zone: "Niamey", pays: "Niger", tel: ["+227 88 99 34 46"] },
    { nom: "Aéroport Niger", resp: "Amadou Modieli Zabbaou", adresse: "Boulevard du 15 Avril", ville: "Niamey", zone: "Niamey", pays: "Niger", tel: ["+227 88 03 63 69"] },
    { nom: "Afzal Niger", resp: "Yahouza Ibrahim Djamila", adresse: "Gamkallé, parcelle W", ville: "Niamey", zone: "Niamey", pays: "Niger", tel: ["+227 91 31 31 11"] },
    { nom: "Adonaï", resp: "Balima Raïssa Nathalie", adresse: "", ville: "Kaya", zone: "Kaya", pays: "Burkina Faso", tel: ["+226 40 45 17 45"] },
    { nom: "Aéroport Bobo", resp: "Dr Éric Koussoubé", adresse: "3838 Bobo-Dioulasso 01", ville: "Bobo-Dioulasso", zone: "Bobo-Dioulasso", pays: "Burkina Faso", tel: [] },
    { nom: "Zoodo", resp: "Dr Bouda Moussa", adresse: "", ville: "Koudougou", zone: "Koudougou", pays: "Burkina Faso", tel: ["+226 25 44 07 05"] },
    { nom: "10 O'Clock Pharmacy", resp: "Fredua Agyemang", adresse: "", ville: "Kumasi", zone: "Kumasi", pays: "Ghana", tel: ["+233 24 395 1898"] }
  ];

  var COUNTRY_ORDER = ["Togo", "Bénin", "Niger", "Burkina Faso", "Ghana"];
  var PAGE = 12;

  var $ = function (s) { return document.querySelector(s); };
  var q = $("#q"), zone = $("#zone"), countries = $("#countries"), results = $("#results"),
      count = $("#count"), empty = $("#empty"), more = $("#more"), reset = $("#reset");

  var state = { q: "", pays: "", zone: "", shown: PAGE };

  function norm(s) {
    return (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function esc(s) {
    return (s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function telHref(t) {
    var digits = t.replace(/[^\d+]/g, "");
    if (digits.charAt(0) !== "+") digits = "+228" + digits;
    return "tel:" + digits;
  }
  function mapsHref(p) {
    var query = "Pharmacie " + p.nom + " " + (p.adresse || "") + " " + p.ville + " " + p.pays;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query.replace(/\s+/g, " ").trim());
  }

  function buildCountryPills() {
    var html = '<button type="button" class="pill" data-pays="" aria-pressed="true">Tous les pays<span class="count">' + PHARMACIES.length + "</span></button>";
    COUNTRY_ORDER.forEach(function (c) {
      var n = PHARMACIES.filter(function (p) { return p.pays === c; }).length;
      if (n) html += '<button type="button" class="pill" data-pays="' + esc(c) + '" aria-pressed="false">' + esc(c) + '<span class="count">' + n + "</span></button>";
    });
    countries.innerHTML = html;
  }

  function buildZones() {
    var list = PHARMACIES.filter(function (p) { return !state.pays || p.pays === state.pays; });
    var zones = [];
    list.forEach(function (p) { if (zones.indexOf(p.zone) === -1) zones.push(p.zone); });
    zones.sort(function (a, b) { return a.localeCompare(b, "fr"); });
    zone.innerHTML = '<option value="">' + (state.pays ? "Toutes les villes / régions" : "Toutes les régions") + "</option>" +
      zones.map(function (z) { return '<option value="' + esc(z) + '">' + esc(z) + "</option>"; }).join("");
    if (zones.indexOf(state.zone) === -1) state.zone = "";
    zone.value = state.zone;
  }

  function card(p) {
    var phones = p.tel.length
      ? p.tel.map(function (t) { return '<div><svg class="icon"><use href="#i-phone"/></svg><a href="' + telHref(t) + '">' + esc(t) + "</a></div>"; }).join("")
      : '<div><svg class="icon"><use href="#i-phone"/></svg><span>Téléphone non renseigné</span></div>';
    var callBtn = p.tel.length
      ? '<a class="btn btn-navy btn-sm" href="' + telHref(p.tel[0]) + '"><svg class="icon icon-sm"><use href="#i-phone"/></svg>Appeler</a>'
      : "";
    return '<article class="pharma">' +
      '<div class="pharma-top"><span class="pharma-icon"><svg class="icon"><use href="#i-cross"/></svg></span>' +
      '<div><h3>Pharmacie ' + esc(p.nom) + '</h3><span class="zone">' + esc(p.zone) + (p.pays !== "Togo" ? " · " + esc(p.pays) : "") + "</span></div></div>" +
      '<div class="pharma-info">' +
        '<div><svg class="icon"><use href="#i-pin"/></svg><span>' + esc([p.adresse, p.ville].filter(Boolean).join(", ")) + "</span></div>" +
        phones +
        '<div><svg class="icon"><use href="#i-users"/></svg><span>' + esc(p.resp) + "</span></div>" +
      "</div>" +
      '<div class="pharma-actions">' + callBtn +
        '<a class="btn btn-outline btn-sm" href="' + mapsHref(p) + '" target="_blank" rel="noopener"><svg class="icon icon-sm"><use href="#i-nav"/></svg>Itinéraire</a>' +
      "</div></article>";
  }

  function filtered() {
    var terms = norm(state.q).split(/\s+/).filter(Boolean);
    return PHARMACIES.filter(function (p) {
      if (state.pays && p.pays !== state.pays) return false;
      if (state.zone && p.zone !== state.zone) return false;
      if (!terms.length) return true;
      var hay = norm([p.nom, p.resp, p.adresse, p.ville, p.zone, p.pays].join(" "));
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    }).sort(function (a, b) {
      return COUNTRY_ORDER.indexOf(a.pays) - COUNTRY_ORDER.indexOf(b.pays) || a.nom.localeCompare(b.nom, "fr");
    });
  }

  function render() {
    var list = filtered();
    results.innerHTML = list.slice(0, state.shown).map(card).join("");
    count.innerHTML = "<strong>" + list.length + "</strong> pharmacie" + (list.length > 1 ? "s" : "") + " trouvée" + (list.length > 1 ? "s" : "");
    empty.classList.toggle("is-visible", list.length === 0);
    more.hidden = list.length <= state.shown;
    Array.prototype.forEach.call(countries.querySelectorAll(".pill"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-pays") === state.pays));
    });
    var params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.pays) params.set("pays", state.pays);
    if (state.zone) params.set("zone", state.zone);
    var qs = params.toString();
    try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "")); } catch (e) {}
  }

  // Événements
  var t;
  q.addEventListener("input", function () {
    clearTimeout(t);
    t = setTimeout(function () { state.q = q.value.trim(); state.shown = PAGE; render(); }, 120);
  });
  zone.addEventListener("change", function () { state.zone = zone.value; state.shown = PAGE; render(); });
  countries.addEventListener("click", function (e) {
    var b = e.target.closest(".pill"); if (!b) return;
    state.pays = b.getAttribute("data-pays"); state.zone = ""; state.shown = PAGE;
    buildZones(); render();
  });
  more.addEventListener("click", function () { state.shown += PAGE; render(); });
  reset.addEventListener("click", function () {
    state = { q: "", pays: "", zone: "", shown: PAGE };
    q.value = ""; buildZones(); render(); q.focus();
  });

  // État initial depuis l'URL (ex. pharmacies.html?q=Lomé ou ?pays=Bénin)
  var params = new URLSearchParams(location.search);
  state.q = params.get("q") || "";
  state.pays = COUNTRY_ORDER.indexOf(params.get("pays")) !== -1 ? params.get("pays") : "";
  state.zone = params.get("zone") || "";
  q.value = state.q;

  buildCountryPills();
  buildZones();
  render();
})();
