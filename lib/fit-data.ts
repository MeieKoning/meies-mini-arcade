export type FitPairing = {
  id: string;
  object: { label: string; emoji: string };
  container: { label: string; emoji: string };
  /** How many objects fit (approximate, using ~64% random packing unless noted). */
  count: number;
  explanation: string;
  funFact?: string;
};

// Volumes used (for reference):
// Tennis ball: ø6.7cm, V=157.5cm³ → effective 246cm³ @ 64% packing
// Golf ball: ø4.27cm, V=40.7cm³ → effective 63.6cm³
// Ping-pong ball: ø4cm, V=33.5cm³ → effective 52.4cm³
// Basketball (size 7): ø23.8cm, V=7,074cm³ → effective 11,053cm³
// School bus interior: ~2.5m×6m×1.7m = 25.5m³
// 40ft shipping container: 67.7m³
// Boeing 747 interior: ~876m³
// Olympic pool: 50×25×2m = 2,500m³
// Grand Canyon: ~10km³ = 10×10⁹m³
// Great Pyramid: ~2.6×10⁶m³
// Empire State Building: ~1×10⁶m³
// Titanic interior: ~50,000m³
// Pacific Ocean: ~7.1×10¹⁷m³
// Sun: 1.41×10¹⁸km³ | Earth: 1.083×10¹²km³ | Jupiter: 1.431×10¹⁵km³ | Moon: 2.19×10¹⁰km³

export const pairings: FitPairing[] = [
  {
    id: "tennis-747",
    object: { label: "tennis ball", emoji: "🎾" },
    container: { label: "Boeing 747", emoji: "✈️" },
    count: 3_500_000,
    explanation:
      "A 747's cabin + cargo hold spans ~876 m³. At 64% random packing, each tennis ball needs ~246 cm³.",
    funFact: "That's one tennis ball per person in the Los Angeles metro area.",
  },
  {
    id: "golf-school-bus",
    object: { label: "golf ball", emoji: "⛳" },
    container: { label: "school bus", emoji: "🚌" },
    count: 425_000,
    explanation:
      "A school bus interior is ~25.5 m³. Golf balls (ø4.27 cm) pack at ~64%, so each takes ~63.6 cm³.",
    funFact: "The classic job-interview puzzle — now with the actual answer.",
  },
  {
    id: "pingpong-pool",
    object: { label: "ping-pong ball", emoji: "🏓" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 47_700_000,
    explanation:
      "The pool holds 2,500 m³. Ping-pong balls (ø4 cm, 64% packing) each need ~52.4 cm³.",
    funFact: "Nearly 48 million — one for every person in Spain.",
  },
  {
    id: "basketball-container",
    object: { label: "basketball", emoji: "🏀" },
    container: { label: "shipping container (40 ft)", emoji: "📦" },
    count: 6_000,
    explanation:
      "A 40 ft container holds 67.7 m³. Basketballs (ø23.8 cm) pack at 64%, each taking ~11,053 cm³.",
  },
  {
    id: "mm-2liter",
    object: { label: "M&M", emoji: "🍬" },
    container: { label: "2-liter bottle", emoji: "🧃" },
    count: 2_000,
    explanation:
      "M&Ms are oblate spheroids (~0.6 cm³ each) and pack at ~68% efficiency. A 2,000 mL bottle holds about 2,000.",
    funFact: "Researchers actually studied this. M&Ms pack better than spheres.",
  },
  {
    id: "penny-bathtub",
    object: { label: "penny", emoji: "🪙" },
    container: { label: "bathtub", emoji: "🛁" },
    count: 500_000,
    explanation:
      "A bathtub holds ~300,000 cm³. Pennies (ø1.9 cm, 0.15 cm thick, ~0.43 cm³) pack randomly at ~64%.",
    funFact: "About $5,000 worth — enough to buy a lot of gum.",
  },
  {
    id: "human-pyramid",
    object: { label: "human body", emoji: "🧍" },
    container: { label: "Great Pyramid of Giza", emoji: "🔺" },
    count: 24_000_000,
    explanation:
      "The pyramid's 2.6 million m³ holds ~24M humans (~66 liters per person, 60% packing).",
    funFact: "That's roughly the population of Australia — twice over.",
  },
  {
    id: "rice-pool",
    object: { label: "grain of rice", emoji: "🍚" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 65_000_000_000,
    explanation:
      "A grain of rice is ~0.025 cm³. The 2,500 m³ pool at 65% packing holds ~65 billion grains.",
    funFact: "That's more than 8 bowls of rice for every person alive.",
  },
  {
    id: "earth-sun",
    object: { label: "Earth", emoji: "🌍" },
    container: { label: "the Sun", emoji: "☀️" },
    count: 1_300_000,
    explanation:
      "Sun volume: 1.41×10¹⁸ km³. Earth: 1.083×10¹² km³. That's 1.3 million Earths — packed spherically.",
    funFact: "And yet the Sun is just an average-sized star.",
  },
  {
    id: "moon-earth",
    object: { label: "Moon", emoji: "🌕" },
    container: { label: "the Earth", emoji: "🌍" },
    count: 49,
    explanation:
      "Earth: 1.083×10¹² km³. Moon: 2.19×10¹⁰ km³. Only 49 Moons fit — our Moon is enormous relative to Earth.",
    funFact: "No other planet-moon pair in the solar system is this lopsided in size.",
  },
  {
    id: "earth-jupiter",
    object: { label: "Earth", emoji: "🌍" },
    container: { label: "Jupiter", emoji: "🪐" },
    count: 1_321,
    explanation:
      "Jupiter: 1.431×10¹⁵ km³. Earth: 1.083×10¹² km³. 1,321 Earths fit inside the gas giant.",
    funFact: "Jupiter is so big it technically has more volume than all other planets combined.",
  },
  {
    id: "sugar-mug",
    object: { label: "sugar cube", emoji: "🍬" },
    container: { label: "coffee mug", emoji: "☕" },
    count: 224,
    explanation:
      "A mug holds ~350 cm³. Sugar cubes (~1 cm³ each) pack randomly at 64% — so about 224.",
  },
  {
    id: "iphone-fridge",
    object: { label: "iPhone", emoji: "📱" },
    container: { label: "refrigerator", emoji: "🧊" },
    count: 3_400,
    explanation:
      "A fridge holds ~400,000 cm³. An iPhone 15 is 147.6×71.6×7.8 mm ≈ 82 cm³, packing at ~70%.",
    funFact: "A refrigerator full of iPhones is worth about $3.4 million.",
  },
  {
    id: "whale-titanic",
    object: { label: "blue whale", emoji: "🐋" },
    container: { label: "the Titanic's hull", emoji: "🚢" },
    count: 500,
    explanation:
      "The Titanic's usable interior volume was ~50,000 m³. A blue whale is ~100 m³.",
    funFact: "The Titanic was enormous — but blue whales are, too.",
  },
  {
    id: "beetle-canyon",
    object: { label: "VW Beetle", emoji: "🚗" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 1_000_000_000,
    explanation:
      "Grand Canyon: ~10 km³ = 10×10⁹ m³. A Beetle's bounding box is ~9.8 m³. That's 1 billion cars.",
    funFact: "One billion Beetles — more than all cars ever manufactured in history.",
  },
  {
    id: "banana-trunk",
    object: { label: "banana", emoji: "🍌" },
    container: { label: "car trunk", emoji: "🚗" },
    count: 2_000,
    explanation:
      "A car trunk holds ~400,000 cm³. A banana is ~120 cm³, packing at ~60% (curved shape).",
  },
  {
    id: "hotdog-hottub",
    object: { label: "hot dog", emoji: "🌭" },
    container: { label: "hot tub", emoji: "🛁" },
    count: 9_000,
    explanation:
      "A hot tub holds ~1,500,000 cm³. Hot dogs (ø3 cm, 18 cm long) are cylinders — ~127 cm³, packing at 75%.",
    funFact: "A hot tub full of hot dogs. The dream.",
  },
  {
    id: "lego-bathtub",
    object: { label: "Lego 2×4 brick", emoji: "🧱" },
    container: { label: "bathtub", emoji: "🛁" },
    count: 32_000,
    explanation:
      "A bathtub holds ~300,000 cm³. A Lego 2×4 brick is ~8 cm³ and stacks at ~85% efficiency.",
    funFact: "Step on even one barefoot. You'll feel all 32,000.",
  },
  {
    id: "blueberry-pool",
    object: { label: "blueberry", emoji: "🫐" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 900_000_000,
    explanation:
      "Blueberries (ø1.5 cm, ~1.77 cm³) at 64% packing each need ~2.77 cm³. In 2,500 m³: ~900 million.",
    funFact: "That's 900 million blueberries — the US consumes about 800 million pounds per year.",
  },
  {
    id: "ant-mug",
    object: { label: "ant", emoji: "🐜" },
    container: { label: "coffee mug", emoji: "☕" },
    count: 50_000,
    explanation:
      "An ant is roughly 3×1×1 mm ≈ 0.003 cm³. At 40% packing (very irregular), a 350 cm³ mug holds ~50,000.",
    funFact: "A full ant colony — in your morning coffee.",
  },
  {
    id: "watermelon-truck",
    object: { label: "watermelon", emoji: "🍉" },
    container: { label: "pickup truck bed", emoji: "🛻" },
    count: 90,
    explanation:
      "A pickup truck bed is ~0.9 m³. A medium watermelon (ø23 cm, ~6,370 cm³) at 64% packing → ~90.",
  },
  {
    id: "dollar-esb",
    object: { label: "$100 bill", emoji: "💵" },
    container: { label: "Empire State Building", emoji: "🏙️" },
    count: 870_000_000_000,
    explanation:
      "The ESB's enclosed volume is ~10¹² cm³. A $100 bill is 15.6×6.6×0.01 cm ≈ 1.03 cm³, stacking at 90%.",
    funFact: "870 billion bills × $100 = $87 trillion — the entire world GDP.",
  },
  {
    id: "bowling-container",
    object: { label: "bowling ball", emoji: "🎳" },
    container: { label: "shipping container (40 ft)", emoji: "📦" },
    count: 8_200,
    explanation:
      "A bowling ball (ø21.6 cm, ~5,278 cm³) at 64% packing takes ~8,247 cm³. Container: 67.7 m³.",
  },
  {
    id: "cat-pool",
    object: { label: "cat", emoji: "🐈" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 375_000,
    explanation:
      "An average cat is ~4 liters = 4,000 cm³. At 60% packing in 2,500 m³: ~375,000 cats.",
    funFact: "They'd all hate it. Every single one.",
  },
  {
    id: "tennis-moon",
    object: { label: "tennis ball", emoji: "🎾" },
    container: { label: "the Moon", emoji: "🌕" },
    count: 8.9e22,
    explanation:
      "The Moon's volume is 2.19×10¹⁰ km³ = 2.19×10²⁵ cm³. Each tennis ball takes ~246 cm³.",
    funFact: "89 sextillion tennis balls. Numbers stop feeling real at some point.",
  },
  {
    id: "golf-pool",
    object: { label: "golf ball", emoji: "⛳" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 39_000_000,
    explanation:
      "Golf balls at 64% packing each need ~63.6 cm³. In the pool's 2,500 m³: ~39 million.",
  },
  {
    id: "brain-cabinet",
    object: { label: "human brain", emoji: "🧠" },
    container: { label: "filing cabinet", emoji: "🗄️" },
    count: 91,
    explanation:
      "A 2-drawer filing cabinet is ~189,000 cm³. A human brain is ~1,350 cm³ at 65% packing → 91.",
    funFact: "One filing cabinet's worth of human intelligence. Think about your office.",
  },
  {
    id: "bus-canyon",
    object: { label: "school bus", emoji: "🚌" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 71_000_000,
    explanation:
      "Grand Canyon: 10 km³. A school bus bounding box is ~105 m³. At 75% packing: ~71 million buses.",
    funFact: "71 million school buses — one for every child enrolled in US public schools, times ten.",
  },
  {
    id: "pool-pacific",
    object: { label: "Olympic swimming pool", emoji: "🏊" },
    container: { label: "the Pacific Ocean", emoji: "🌊" },
    count: 284_000_000_000_000,
    explanation:
      "Pacific Ocean: ~7.1×10¹⁷ m³. An Olympic pool is 2,500 m³. That's 284 trillion pools.",
    funFact: "You'd need 284 trillion lanes to swim across the Pacific.",
  },
  {
    id: "cheerio-box",
    object: { label: "Cheerio", emoji: "⭕" },
    container: { label: "cereal box", emoji: "📦" },
    count: 1_200,
    explanation:
      "A cereal box is ~4,800 cm³. A Cheerio torus is ~1.7 cm³, packing at ~45% due to the hole.",
    funFact: "About 1,200 — which is roughly what's actually in a family-size box.",
  },
  {
    id: "airpod-shoebox",
    object: { label: "AirPods case", emoji: "🎧" },
    container: { label: "shoebox", emoji: "👟" },
    count: 55,
    explanation:
      "A shoebox is ~4,500 cm³. An AirPods Pro case is 6.1×4.5×2.1 cm ≈ 57.6 cm³, packing at ~70%.",
    funFact: "$55 × $249 = ~$13,695 worth of AirPods per shoebox.",
  },
  {
    id: "soccer-hangar",
    object: { label: "soccer ball", emoji: "⚽" },
    container: { label: "airplane hangar", emoji: "🏭" },
    count: 18_000_000,
    explanation:
      "A large hangar is ~160,000 m³. Soccer balls (ø22 cm) at 64% packing take ~8,711 cm³ each.",
    funFact: "18 million balls — enough for every registered soccer player on Earth.",
  },
  {
    id: "human-bus",
    object: { label: "person (standing)", emoji: "🧍" },
    container: { label: "school bus", emoji: "🚌" },
    count: 100,
    explanation:
      "A school bus floor is ~15 m². A standing person takes ~0.15 m². One layer = 100 people.",
    funFact: "The legal maximum for a school bus is 48 seated. Standing: a different story.",
  },
  {
    id: "sand-pool",
    object: { label: "grain of sand", emoji: "🏖️" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 24_000_000_000_000,
    explanation:
      "A medium sand grain (ø0.5 mm) has V ≈ 6.5×10⁻⁵ cm³. At 64% packing in 2,500 m³: ~24 trillion.",
    funFact: "Scientists estimate there are ~7.5 quintillion grains of sand on all Earth's beaches.",
  },
  {
    id: "diamond-mug",
    object: { label: "1-carat diamond", emoji: "💎" },
    container: { label: "coffee mug", emoji: "☕" },
    count: 4_000,
    explanation:
      "1 carat = 0.2 g. Diamond density: 3.51 g/cm³ → each stone is 0.057 cm³. Mug: 350 cm³ at 64%.",
    funFact: "4,000 diamonds × ~$5,000/carat = $20 million per mug.",
  },
  {
    id: "rubik-trunk",
    object: { label: "Rubik's cube", emoji: "🧩" },
    container: { label: "car trunk", emoji: "🚗" },
    count: 1_900,
    explanation:
      "A car trunk is ~400,000 cm³. A Rubik's cube is 5.6³ = 175.6 cm³, cubes stack at ~85%.",
  },
  {
    id: "pizza-fridge",
    object: { label: "pizza box (12″)", emoji: "🍕" },
    container: { label: "refrigerator", emoji: "🧊" },
    count: 95,
    explanation:
      "A fridge holds ~400,000 cm³. A 12-inch pizza box is 30×30×4 = 3,600 cm³, stacking at ~85%.",
    funFact: "95 pizzas is a lot. Until you remember it's one fridge.",
  },
  {
    id: "labrador-canyon",
    object: { label: "Labrador Retriever", emoji: "🐕" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 200_000_000_000,
    explanation:
      "A Labrador is ~30 liters = 0.03 m³. Grand Canyon: 10 km³. At 60% packing: ~200 billion dogs.",
    funFact: "200 billion dogs. There are currently ~900 million dogs on Earth.",
  },
  {
    id: "piano-canyon",
    object: { label: "grand piano", emoji: "🎹" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 3_300_000_000,
    explanation:
      "A grand piano bounding box is ~150×150×100 cm = 2.25 m³. Grand Canyon at 75%: 3.3 billion.",
    funFact: "Beethoven composed 9 symphonies. He would've needed many more to fill this.",
  },
  {
    id: "balloon-astrodome",
    object: { label: "hot air balloon", emoji: "🎈" },
    container: { label: "Houston Astrodome", emoji: "🏟️" },
    count: 600,
    explanation:
      "The Astrodome has ~1.7 million m³ interior. A standard hot air balloon envelope is ~2,800 m³.",
    funFact: "600 hot air balloons in one stadium. Fire marshal: sweating.",
  },
  {
    id: "toilet-container",
    object: { label: "toilet paper roll", emoji: "🧻" },
    container: { label: "shipping container (40 ft)", emoji: "📦" },
    count: 58_000,
    explanation:
      "Toilet paper rolls (ø10.8 cm, h=10 cm) are cylinders — ~916 cm³, packing at 78%.",
    funFact: "58,000 rolls × 200 sheets each = 11.6 million sheets. The 2020 shortage explained.",
  },
  {
    id: "esb-canyon",
    object: { label: "Empire State Building", emoji: "🏙️" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 10_000,
    explanation:
      "ESB volume: ~1 million m³. Grand Canyon: ~10 km³ = 10,000 ESBs — exactly.",
    funFact: "If you stacked them, the ESBs would reach 4 million meters high — 400× taller than Everest.",
  },
  {
    id: "apple-bathtub",
    object: { label: "apple", emoji: "🍎" },
    container: { label: "bathtub", emoji: "🛁" },
    count: 716,
    explanation:
      "A medium apple (ø8 cm) has V ≈ 268 cm³, effective 419 cm³ at 64% packing. Bathtub: 300,000 cm³.",
  },
  {
    id: "boeing737-canyon",
    object: { label: "Boeing 737", emoji: "✈️" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 420_000,
    explanation:
      "A 737 bounding box is 39×34×12.5 m = 16,575 m³. Grand Canyon at 70% packing: ~420,000 planes.",
    funFact: "There are only ~10,000 active 737s in service worldwide.",
  },
  {
    id: "book-container",
    object: { label: "paperback book", emoji: "📚" },
    container: { label: "shipping container (40 ft)", emoji: "📦" },
    count: 100_000,
    explanation:
      "A paperback is ~21×13.5×2 cm = 567 cm³, stacking at 85%. Container: 67.7 m³.",
    funFact: "100,000 books is about the size of a small public library.",
  },
  {
    id: "bathtub-pacific",
    object: { label: "bathtub of water", emoji: "🛁" },
    container: { label: "the Pacific Ocean", emoji: "🌊" },
    count: 2.4e18,
    explanation:
      "Pacific Ocean: 7.1×10¹⁷ m³. One bathtub: 0.3 m³. That's 2.4 quintillion bathtubs.",
    funFact: "Even if every person on Earth filled a bathtub every second, it'd take millions of years.",
  },
  {
    id: "sand-canyon",
    object: { label: "grain of sand", emoji: "🏖️" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 9.8e19,
    explanation:
      "Grand Canyon: 10 km³ = 10¹⁶ cm³. A sand grain is ~6.5×10⁻⁵ cm³. At 64%: ~98 quintillion.",
    funFact: "All Earth's beaches are estimated to have ~7.5×10¹⁸ grains — 13× fewer than this.",
  },
  {
    id: "hamburger-bus",
    object: { label: "hamburger (boxed)", emoji: "🍔" },
    container: { label: "school bus", emoji: "🚌" },
    count: 15_000,
    explanation:
      "A hamburger box is ~12×12×8 cm = 1,152 cm³. Bus interior: 25.5 m³ at 70%: ~15,000.",
    funFact: "McDonald's serves 70 million customers a day. This bus holds a 5-second supply.",
  },
  {
    id: "tennis-stomach",
    object: { label: "tennis ball", emoji: "🎾" },
    container: { label: "human stomach", emoji: "🫃" },
    count: 4,
    explanation:
      "A distended stomach holds ~1 liter = 1,000 cm³. A tennis ball is ~246 cm³ effective. Barely 4 fit.",
    funFact: "Please don't try this.",
  },
  {
    id: "suitcase-container",
    object: { label: "full-size suitcase", emoji: "🧳" },
    container: { label: "shipping container (40 ft)", emoji: "📦" },
    count: 450,
    explanation:
      "A large suitcase is 75×50×30 cm = 112,500 cm³. Container: 67.7 m³ at 75%: ~450 bags.",
    funFact: "Spirit Airlines charges $79 each. That's $35,550 in bag fees for one container.",
  },
  {
    id: "basketball-sun",
    object: { label: "basketball", emoji: "🏀" },
    container: { label: "the Sun", emoji: "☀️" },
    count: 1.28e29,
    explanation:
      "Sun volume: 1.41×10³³ cm³. Basketball effective volume: ~11,053 cm³. Result: 1.28×10²⁹.",
    funFact: "128 octillion basketballs. An NBA season has 1,230 games. Just for context.",
  },
  {
    id: "mm-tennis",
    object: { label: "M&M", emoji: "🍬" },
    container: { label: "tennis ball", emoji: "🎾" },
    count: 178,
    explanation:
      "A tennis ball is 157.5 cm³. M&Ms (~0.6 cm³) pack at 68%: 157.5×0.68/0.6 ≈ 178.",
    funFact: "A tennis ball is basically a fun-size bag of M&Ms.",
  },
  {
    id: "basketball-pyramid",
    object: { label: "basketball", emoji: "🏀" },
    container: { label: "the Great Pyramid", emoji: "🔺" },
    count: 235_000_000,
    explanation:
      "Great Pyramid: 2.6×10⁶ m³ = 2.6×10¹² cm³. Basketball at 64%: ~11,053 cm³ each → 235 million.",
    funFact: "235 million basketballs — one for every person in Brazil, plus some extras.",
  },
  {
    id: "soda-pool",
    object: { label: "can of soda", emoji: "🥤" },
    container: { label: "Olympic swimming pool", emoji: "🏊" },
    count: 4_700_000,
    explanation:
      "A 12 oz can is ~417 cm³ (cylinder, ø6.6 cm × 12.2 cm), packing at 78%. Pool: 2,500 m³.",
    funFact: "4.7 million cans × 355 mL = 1.67 billion mL. Still less sugar than Americans drink daily.",
  },
  {
    id: "coffee-tahoe",
    object: { label: "cup of coffee", emoji: "☕" },
    container: { label: "Lake Tahoe", emoji: "🏞️" },
    count: 4.5e14,
    explanation:
      "Lake Tahoe: ~156 km³ = 1.56×10¹⁷ cm³. A coffee cup is 350 cm³. That's 450 trillion cups.",
    funFact:
      "Humanity drinks ~3 billion cups of coffee per day. Lake Tahoe would supply 411 years' worth.",
  },
  {
    id: "human-earth-ocean",
    object: { label: "human body", emoji: "🧍" },
    container: { label: "Earth's oceans", emoji: "🌊" },
    count: 1.2e19,
    explanation:
      "Earth's oceans: 1.335×10²⁴ cm³. A human body is ~66,000 cm³ at 60% packing → 12 quintillion.",
    funFact:
      "Every human who has ever lived, times a billion — still not enough to fill the oceans.",
  },
  {
    id: "cab-canyon",
    object: { label: "NYC yellow cab", emoji: "🚕" },
    container: { label: "the Grand Canyon", emoji: "🏜️" },
    count: 430_000_000,
    explanation:
      "A Crown Vic cab bounding box: ~5.4×2.0×1.5 m = 16.2 m³. Canyon at 70%: ~430 million.",
    funFact: "There are only ~13,500 yellow cabs in NYC. This is 32,000× that.",
  },
  {
    id: "humans-earth",
    object: { label: "human body", emoji: "🧍" },
    container: { label: "the Earth", emoji: "🌍" },
    count: 1.6e19,
    explanation:
      "Earth: 1.08×10²⁴ cm³. A human is ~66,000 cm³ at 60% packing → 1.6×10¹⁹ people.",
    funFact:
      "16 quintillion humans. 8 billion live here now — we've barely scratched the surface.",
  },
];
