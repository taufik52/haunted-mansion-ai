/* Haunted Mansion AI — UI wiring. No framework. */
(function () {
  'use strict';
  var E = window.HauntedEngine;
  var D = window.HauntedData;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- Tabs ---------- */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      $('tab-' + tab.dataset.tab).classList.add('active');
      if (tab.dataset.tab === 'map') initMap();
    });
  });

  /* ---------- Sound toggle (state only) ---------- */
  var soundToggle = $('soundToggle');
  try { soundToggle.checked = localStorage.getItem('hmai-sound') === 'on'; } catch (e) {}
  soundToggle.addEventListener('change', function () {
    try { localStorage.setItem('hmai-sound', soundToggle.checked ? 'on' : 'off'); } catch (e) {}
  });

  /* ---------- Story ---------- */
  function fillSelect(sel, items) {
    items.forEach(function (it) {
      var o = document.createElement('option');
      o.value = it.id; o.textContent = it.name;
      sel.appendChild(o);
    });
  }
  fillSelect($('settingSelect'), E.SETTINGS);
  fillSelect($('monsterSelect'), E.MONSTERS);
  fillSelect($('twistSelect'), E.TWISTS);

  var currentStory = null;
  var currentChapter = 0;
  var pickedChoices = [];

  function renderChapter() {
    var out = $('storyOutput');
    var ch = currentStory.chapters[currentChapter];
    var html = '<h3>Chapter ' + ch.n + ': ' + esc(ch.title) + '</h3><p>' + esc(ch.text) + '</p>';
    if (ch.choices) {
      html += '<div class="choices">' + ch.choices.map(function (c, i) {
        return '<button class="btn" data-choice="' + i + '">' + esc(c.text) + '</button>';
      }).join('') + '</div>';
    } else {
      var ending = E.endingForChoices(pickedChoices);
      html += '<div class="ending"><h3>Ending: ' + esc(ending.name) +
        ' (courage ' + (ending.courage >= 0 ? '+' : '') + ending.courage + ')</h3><p>' +
        esc(ending.text) + '</p>' +
        '<button class="btn primary" id="againBtn">🔁 Play again</button></div>';
    }
    out.innerHTML = html;
    out.querySelectorAll('[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.choice, 10);
        pickedChoices.push(idx);
        var li = document.createElement('li');
        li.textContent = 'Ch. ' + currentStory.chapters[currentChapter].n + ': ' +
          currentStory.chapters[currentChapter].choices[idx].text;
        $('storyLog').appendChild(li);
        $('storyLogWrap').hidden = false;
        currentChapter++;
        renderChapter();
      });
    });
    var again = $('againBtn');
    if (again) again.addEventListener('click', startStory);
  }

  function startStory() {
    currentStory = E.generateStory({
      setting: $('settingSelect').value,
      monster: $('monsterSelect').value,
      twist: $('twistSelect').value,
      seed: parseInt($('seedInput').value, 10) || 0
    });
    currentChapter = 0;
    pickedChoices = [];
    $('storyLog').innerHTML = '';
    $('storyLogWrap').hidden = true;
    renderChapter();
  }

  $('generateBtn').addEventListener('click', startStory);
  $('surpriseBtn').addEventListener('click', function () {
    $('settingSelect').value = E.SETTINGS[Math.floor(Math.random() * E.SETTINGS.length)].id;
    $('monsterSelect').value = E.MONSTERS[Math.floor(Math.random() * E.MONSTERS.length)].id;
    $('twistSelect').value = E.TWISTS[Math.floor(Math.random() * E.TWISTS.length)].id;
    $('seedInput').value = Math.floor(Math.random() * 10000);
    startStory();
  });

  /* ---------- Mansion ---------- */
  var inventory = new Set();
  try {
    JSON.parse(localStorage.getItem('hmai-inventory') || '[]').forEach(function (i) { inventory.add(i); });
  } catch (e) {}
  var roomGrid = $('roomGrid');

  function renderInventory() {
    $('invCount').textContent = inventory.size;
    var ul = $('inventory');
    ul.innerHTML = '';
    if (inventory.size === 0) { ul.innerHTML = '<li class="hint">Nothing collected yet.</li>'; return; }
    inventory.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    $('badge').hidden = inventory.size < D.ROOMS.length;
  }

  D.ROOMS.forEach(function (room) {
    var btn = document.createElement('button');
    btn.className = 'room-card' + (inventory.has(room.item) ? ' looted' : '');
    btn.dataset.room = room.id;
    btn.innerHTML = '<span class="icon">' + room.icon + '</span>' + esc(room.name);
    btn.addEventListener('click', function () { showRoom(room); });
    roomGrid.appendChild(btn);
  });

  function showRoom(room) {
    var looted = inventory.has(room.item);
    $('roomDetail').innerHTML =
      '<h3>' + room.icon + ' ' + esc(room.name) + '</h3>' +
      '<p>' + esc(room.description) + '</p>' +
      '<p><strong>Clue:</strong> ' + esc(room.clue) + '</p>' +
      '<p><strong>Item:</strong> ' + esc(room.item) + (looted ? ' (already collected ✓)' : '') + '</p>' +
      (looted ? '' : '<button class="btn primary" id="collectBtn">🧺 Collect ' + esc(room.item) + '</button>');
    var collect = $('collectBtn');
    if (collect) collect.addEventListener('click', function () {
      inventory.add(room.item);
      try { localStorage.setItem('hmai-inventory', JSON.stringify(Array.from(inventory))); } catch (e) {}
      var card = roomGrid.querySelector('[data-room="' + room.id + '"]');
      if (card) card.classList.add('looted');
      renderInventory();
      showRoom(room);
    });
  }
  renderInventory();

  /* ---------- Map ---------- */
  var map = null;
  var markers = [];
  var routeMode = false;

  function visibleHouses() {
    var min = parseInt($('candyFilter').value, 10);
    return D.HOUSES.filter(function (h) { return h.candy >= min; });
  }

  function renderHouseList() {
    var list = visibleHouses().slice();
    if (routeMode) list.sort(function (a, b) { return b.candy - a.candy || a.name.localeCompare(b.name); });
    var ol = $('houseList');
    ol.innerHTML = '';
    list.forEach(function (h, i) {
      var li = document.createElement('li');
      li.innerHTML = (routeMode ? '<strong>Stop ' + (i + 1) + ':</strong> ' : '') +
        '<strong>' + esc(h.name) + '</strong> — <span class="pumpkins">' +
        '🎃'.repeat(h.candy) + '</span> candy ' + h.candy + '/5, scare ' + h.scare +
        '/5 — ' + esc(h.treats) + ' (' + esc(h.hours) + ')';
      ol.appendChild(li);
    });
    if (list.length === 0) ol.innerHTML = '<li class="hint">No houses match this filter.</li>';
  }

  function initMap() {
    renderHouseList();
    if (typeof L === 'undefined') {
      $('map').style.display = 'none';
      $('mapFallback').hidden = false;
      return;
    }
    $('map').style.display = '';
    $('mapFallback').hidden = true;
    if (map) { refreshMarkers(); return; }
    map = L.map('map').setView([D.MAP_CENTER.lat, D.MAP_CENTER.lng], D.MAP_CENTER.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    refreshMarkers();
  }

  function refreshMarkers() {
    if (!map) return;
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];
    visibleHouses().forEach(function (h) {
      var m = L.marker([h.lat, h.lng]).addTo(map);
      m.bindPopup('<strong>' + esc(h.name) + '</strong><br>🎃 Candy: ' + h.candy + '/5<br>😱 Scare: ' +
        h.scare + '/5<br>' + esc(h.treats) + '<br>🕐 ' + esc(h.hours));
      markers.push(m);
    });
  }

  $('candyFilter').addEventListener('change', function () { renderHouseList(); refreshMarkers(); });
  $('bestRouteBtn').addEventListener('click', function () {
    routeMode = !routeMode;
    $('bestRouteBtn').textContent = routeMode ? '🗺️ Show normal order' : '🗺️ Best route (top candy first)';
    renderHouseList();
  });

  renderHouseList();
})();
