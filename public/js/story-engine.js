/* Haunted Mansion AI — deterministic story engine.
 * Pure functions only. No Math.random() inside generation: every story is
 * derived from a seeded PRNG (mulberry32) fed by an FNV-1a hash of the
 * seed string. Same input -> byte-identical story. Works in the browser
 * (window.HauntedEngine) and in Node (module.exports). */
(function (root) {
  'use strict';

  var SETTINGS = [
    { id: 'mansion', name: 'Abandoned Mansion', openings: [
      'Rain hammered the shutters of Blackwood Mansion as you pushed the iron gate open. It had stood empty for forty years — or so the town claimed.',
      'The mansion on the hill had not seen a living guest since 1984. Tonight, the front door stood open, and a single candle burned in the foyer.',
      'You found the key under the stone gargoyle, exactly where the old letter said it would be. Blackwood Mansion waited, patient as a spider.' ] },
    { id: 'forest', name: 'Haunted Forest', openings: [
      'The forest path swallowed the moonlight behind you. Somewhere between the crooked pines, something was humming your name.',
      'Fog curled around your ankles as you stepped past the warning sign. The trees here grew in the shape of people who had stopped walking.',
      'Every jack-o\'-lantern on the forest trail was lit — but there was no one around to have lit them. The pumpkins were watching you.' ] },
    { id: 'graveyard', name: 'Old Graveyard', openings: [
      'The graveyard gate creaked shut behind you, though no wind blew. The oldest headstone bore your name — and today\'s date.',
      'Midnight in Hallowfield Cemetery. The fog parted around the angel statue, and you realised its stone eyes were following you.',
      'You came to leave flowers for your grandmother. The fresh footprints in the damp earth led away from her grave — and they were yours.' ] },
    { id: 'carnival', name: 'Cursed Carnival', openings: [
      'The carnival had been closed for decades, but tonight every ride was running and the calliope played a tune you almost remembered.',
      'Tickets were free, the man at the gate said, grinning too wide. Behind him the Ferris wheel turned slowly — with no one aboard.',
      'The haunted house at the carnival was the only attraction with a queue. The people in line did not move, did not blink, did not breathe.' ] }
  ];

  var MONSTERS = [
    { id: 'ghost', name: 'The Weeping Ghost', intros: [
      'A pale figure drifted down the staircase, weeping black tears that never reached the floor. "You took my room," it whispered.',
      'The temperature dropped. In the mirror you saw her: a woman in a torn wedding dress, pointing at you with a shaking finger.',
      'A cold hand closed around your wrist. The ghost of the bride stood beside you, and her voice sounded like wind through a keyhole.' ] },
    { id: 'pumpkin', name: 'Pumpkin King', intros: [
      'The largest jack-o\'-lantern grinned, and its grin kept growing. "Trick or treat?" it boomed — and the ground trembled.',
      'Vines burst from the pumpkin patch and wove themselves into a towering figure with a burning crown. The Pumpkin King had woken.',
      'Every carved pumpkin in the place lit up at once, and the biggest one spoke: "The King demands a tribute of candy — or courage."' ] },
    { id: 'witch', name: 'The Hollow Witch', intros: [
      'A rocking chair moved by itself. The witch unfolded from the shadows like a paper doll, her smile full of too many teeth.',
      '"Come in, dearie," croaked the Hollow Witch, stirring a pot that bubbled with tiny screaming faces. "Dinner is almost ready."',
      'The witch\'s black cat watched you with human eyes. "She collects brave children," it said, in perfect English.' ] },
    { id: 'vampire', name: 'Count Midnight', intros: [
      'A tall figure in a high-collared cloak bowed. "Count Midnight, at your service. I do hope you brought... something sweet."',
      'The candles guttered out one by one. When they relit, a pale count stood in the doorway, smiling at your neck.',
      'Bats poured through the broken window and folded themselves into the shape of a man. "Welcome to my home," said Count Midnight.' ] }
  ];

  var TWISTS = [
    { id: 'mirror', name: 'The Mirror Twin', hints: [
      'In a dusty mirror you caught your reflection — a half-second late, and smiling when you were not.',
      'A portrait on the wall showed your face. It was painted a hundred years ago.',
      'Your shadow detached from your feet and waved at you. Politely.' ] },
    { id: 'loop', name: 'The Endless Night', hints: [
      'Your watch showed midnight. It had shown midnight for an hour. The same black cat crossed your path for the third time.',
      'You passed the same pumpkin three times. On the third pass, it had your face carved into it.',
      'The clock struck thirteen. Somewhere, a version of you was already running.' ] },
    { id: 'candy', name: 'The Cursed Candy', hints: [
      'The candy in your bag was warm. One wrapper was already open — from the inside.',
      'Each sweet you had collected whispered a different name. The last one whispered yours.',
      'The chocolate coins in your pocket had melted into the shape of a tiny key.' ] },
    { id: 'invitation', name: 'The Invitation', hints: [
      'You found an invitation in your pocket, addressed to you, dated tonight, signed in handwriting you recognised as your own.',
      'A place was already set for you at the table — your name on a card, your favourite food, a chair pulled out.',
      'The guest book by the door was open. Your signature was already in it, in ink that was still wet.' ] }
  ];

  var COMPLICATIONS = [
    'The lights went out all at once. When they came back, every door in the place had moved.',
    'A whisper ran through the walls like water through pipes: "One of you is not real." You were alone.',
    'The floorboards spelled out a warning, one creak at a time: L-E-A-V-E.'
  ];

  var CLIMAXES = [
    'The monster stood between you and the only exit, and the whole house held its breath.',
    'Everything converged at once — the mirror, the whisper, the cold — and you understood, finally, what the house wanted.',
    'The final door swung open on its own. Beyond it: the truth, wearing your face.'
  ];

  var ENDINGS = {
    Escape: [
      'You ran — and this time the gate let you through. Dawn broke over the town, and your bag was full of candy. You never told anyone what chased you out. Some doors, you decided, are better left closed.'
    ],
    Haunted: [
      'You escaped the house, but something followed you home. Now every mirror shows you a half-second late, and every pumpkin grins a little too wide. The house lets you visit, any Halloween, any year. It is waiting.'
    ],
    Tricked: [
      'You reached for the candy — and the world tilted. The last thing you heard was laughter, and the first thing you saw was your own face on a jack-o\'-lantern. The house has a new decoration now. It looks just like you.'
    ]
  };

  var CHOICE_SETS = [
    [ { text: 'Stand your ground and shout back.', courage: 1 },
      { text: 'Hide and hold your breath.', courage: -1 } ],
    [ { text: 'Follow the whisper deeper inside.', courage: 1 },
      { text: 'Back away toward the exit, slowly.', courage: -1 } ],
    [ { text: 'Take the strange object — it might help.', courage: 1 },
      { text: 'Leave it where it lies. Some things are traps.', courage: -1 } ],
    [ { text: 'Confront the monster face to face.', courage: 1 },
      { text: 'Run for the nearest door and slam it shut.', courage: -1 } ]
  ];

  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

  function findById(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  function computeEnding(courage) {
    if (courage >= 2) return 'Escape';
    if (courage <= -2) return 'Tricked';
    return 'Haunted';
  }

  function generateStory(opts) {
    opts = opts || {};
    var setting = findById(SETTINGS, opts.setting || 'mansion');
    var monster = findById(MONSTERS, opts.monster || 'ghost');
    var twist = findById(TWISTS, opts.twist || 'mirror');
    var numericSeed = (opts.seed === undefined || opts.seed === null) ? 0 : opts.seed;
    var seedString = setting.id + '|' + monster.id + '|' + twist.id + '|' + numericSeed;
    var rng = mulberry32(fnv1a(seedString));

    var chapters = [
      { n: 1, title: 'The Arrival',
        text: pick(rng, setting.openings),
        choices: CHOICE_SETS[0] },
      { n: 2, title: 'Something Stirs',
        text: pick(rng, monster.intros),
        choices: CHOICE_SETS[1] },
      { n: 3, title: 'The Twist',
        text: pick(rng, twist.hints) + ' ' + pick(rng, COMPLICATIONS),
        choices: CHOICE_SETS[2] },
      { n: 4, title: 'No Way Back',
        text: pick(rng, COMPLICATIONS) + ' ' + pick(rng, monster.intros),
        choices: CHOICE_SETS[3] },
      { n: 5, title: 'The Final Door',
        text: pick(rng, CLIMAXES) + ' The ' + monster.name + ' waited, and the secret of the ' +
          twist.name + ' was finally clear: this night was never an accident.',
        choices: null }
    ];
    return {
      seedString: seedString,
      setting: setting, monster: monster, twist: twist,
      numericSeed: numericSeed,
      chapters: chapters
    };
  }

  function endingForChoices(choiceIndexes) {
    var courage = 0;
    for (var i = 0; i < choiceIndexes.length; i++) {
      courage += CHOICE_SETS[i][choiceIndexes[i]].courage;
    }
    var name = computeEnding(courage);
    return { name: name, courage: courage, text: ENDINGS[name][0] };
  }

  var api = {
    SETTINGS: SETTINGS, MONSTERS: MONSTERS, TWISTS: TWISTS,
    fnv1a: fnv1a, mulberry32: mulberry32,
    generateStory: generateStory,
    computeEnding: computeEnding,
    endingForChoices: endingForChoices,
    ENDINGS: ENDINGS
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.HauntedEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
