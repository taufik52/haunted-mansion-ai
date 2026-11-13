/* Haunted Mansion AI — static data: mansion rooms + trick-or-treat houses.
 * All houses are fictional, centred on Salem, MA (42.5195, -70.8967). */
(function (root) {
  'use strict';

  var ROOMS = [
    { id: 'foyer', name: 'Foyer', icon: '🕯️',
      description: 'A grand staircase curls up into darkness. The chandelier sways though no wind blows.',
      clue: 'A guest book lies open. Your name is already signed in it.',
      item: 'Brass Key' },
    { id: 'library', name: 'Library', icon: '📚',
      description: 'Dusty books whisper when you pass. One spine reads "How to Escape a Haunted House".',
      clue: 'A book is missing from the shelf — its outline glows faintly.',
      item: 'Silver Bookmark' },
    { id: 'kitchen', name: 'Kitchen', icon: '🎃',
      description: 'A pot bubbles on the stove with nobody tending it. The smell is cinnamon — and something else.',
      clue: 'The recipe on the wall calls for "one brave heart".',
      item: 'Candy Corn Charm' },
    { id: 'cellar', name: 'Cellar', icon: '🍷',
      description: 'Cold, damp, and full of barrels. Something down here is counting your footsteps.',
      clue: 'Chalk marks count to thirteen, then start over.',
      item: 'Black Candle' },
    { id: 'attic', name: 'Attic', icon: '👻',
      description: 'Sheet-covered furniture looms like ghosts. A rocking horse rocks by itself.',
      clue: 'A music box plays a lullaby you almost remember.',
      item: 'Music Box Key' },
    { id: 'ballroom', name: 'Ballroom', icon: '💃',
      description: 'Dusty dancers waltz to silent music. The mirrors show a ballroom full of guests.',
      clue: 'One dancer is missing her partner — and she is looking at you.',
      item: 'Masquerade Mask' }
  ];

  var HOUSES = [
    { id: 'h1', name: 'The Pumpkin Palace', lat: 42.5210, lng: -70.8980, candy: 5, scare: 3, treats: 'Full-size chocolate bars', hours: '5–9 PM' },
    { id: 'h2', name: 'Witch Hazel Cottage', lat: 42.5190, lng: -70.8950, candy: 4, scare: 4, treats: 'Candy corn + spooky cookies', hours: '5–8 PM' },
    { id: 'h3', name: 'Ghost Light Manor', lat: 42.5230, lng: -70.9000, candy: 5, scare: 5, treats: 'King-size bars, fog machine show', hours: '6–10 PM' },
    { id: 'h4', name: 'The Friendly Skeleton', lat: 42.5180, lng: -70.8970, candy: 3, scare: 1, treats: 'Gummy worms, stickers', hours: '4–8 PM' },
    { id: 'h5', name: 'Vampire Villa', lat: 42.5200, lng: -70.8930, candy: 4, scare: 4, treats: 'Red velvet cupcakes', hours: '6–9 PM' },
    { id: 'h6', name: 'Mummy\'s Corner', lat: 42.5170, lng: -70.8990, candy: 2, scare: 2, treats: 'Hard candy, pencils', hours: '5–7 PM' },
    { id: 'h7', name: 'Haunted Hollow', lat: 42.5240, lng: -70.8960, candy: 5, scare: 5, treats: 'Full-size bars + haunted maze', hours: '6–10 PM' },
    { id: 'h8', name: 'The Bat House', lat: 42.5160, lng: -70.8940, candy: 3, scare: 3, treats: 'Chocolate bats, juice boxes', hours: '5–8 PM' },
    { id: 'h9', name: 'Candy Cauldron', lat: 42.5220, lng: -70.8920, candy: 4, scare: 2, treats: 'Candy apples, popcorn balls', hours: '4–9 PM' },
    { id: 'h10', name: 'The Old Crypt', lat: 42.5150, lng: -70.8975, candy: 1, scare: 5, treats: 'One black jelly bean. If you dare.', hours: '7–9 PM' }
  ];

  var MAP_CENTER = { lat: 42.5195, lng: -70.8967, zoom: 15 };

  var api = { ROOMS: ROOMS, HOUSES: HOUSES, MAP_CENTER: MAP_CENTER };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.HauntedData = api;
})(typeof window !== 'undefined' ? window : globalThis);
