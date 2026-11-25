/* ------------------------------------------------------------------
   JMPYR concept site: settings and catalogue.
   Change the values in CONFIG to update the whole site.
------------------------------------------------------------------ */
window.CONFIG = {
  brand: "JMPYR",
  // WhatsApp number with country code, digits only, e.g. "919876543210".
  // Left empty, WhatsApp opens with the message ready and lets the visitor pick the chat.
  whatsapp: "",
  phone: "",
  instagram: "https://www.instagram.com/jmpyr_/",
  instagramHandle: "@jmpyr_",
  community: "https://chat.whatsapp.com/BZ8Dwi6XXoyE4x2nI6Jfdg",
  address: "Madhav Nagar, Katni, Madhya Pradesh 483504",
  area: "Madhav Nagar, Katni",
  hours: "Open until 10 PM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=JMPYR+The+Jewelries+Empire+Madhav+Nagar+Katni",
  mapsEmbed: "https://www.google.com/maps?q=JMPYR+The+Jewelries+Empire,+Madhav+Nagar,+Katni&output=embed",
  googleRating: "4.9",
  googleReviews: 19,
  followers: "8.6K",
  agency: "MAYUR"
};

window.CATEGORIES = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
  handchains: "Hand chains",
  anklets: "Anklets",
  waist: "Waist chains",
  watches: "Watches",
  hair: "Hair accessories",
  charms: "Charms and keychains"
};

/* [slug, name, category, price, original price] */
window.PRODUCTS = [
  ["aurora-butterfly-crystal-necklace", "Aurora Butterfly Crystal Necklace", "necklaces", 1499, 2199],
  ["luna-pearl-hoop-earrings", "Luna Pearl Hoop Earrings", "earrings", 899, 1299],
  ["starlight-crown-ring", "Starlight Crown Ring", "rings", 1199, 1699],
  ["aurora-butterfly-handcuff", "Aurora Butterfly Handcuff", "handchains", 1499, 1999],
  ["nova-star-layered-necklace", "Nova Star Layered Necklace", "necklaces", 1699, 2499],
  ["stella-crystal-drop-earrings", "Stella Crystal Drop Earrings", "earrings", 999, 1499],
  ["luna-square-vintage-watch", "Luna Square Vintage Watch", "watches", 2299, 3799],
  ["teddy-hug-keychain", "Teddy Hug Keychain", "charms", 399, 699],
  ["aurora-butterfly-stud-earrings", "Aurora Butterfly Stud Earrings", "earrings", 699, 999],
  ["celestial-pearl-pendant-necklace", "Celestial Pearl Pendant Necklace", "necklaces", 1299, 1899],
  ["emerald-whisper-open-ring", "Emerald Whisper Open Ring", "rings", 999, 1499],
  ["midnight-serpent-ring", "Midnight Serpent Ring", "rings", 1299, 1799],
  ["aurora-link-chain-bracelet", "Aurora Link Chain Bracelet", "bracelets", 899, 1299],
  ["nova-crystal-chain-bracelet", "Nova Crystal Chain Bracelet", "bracelets", 999, 1499],
  ["celeste-heart-chain-bracelet", "Celeste Heart Chain Bracelet", "bracelets", 749, 1099],
  ["celeste-crystal-handcuff", "Celeste Crystal Handcuff", "handchains", 1299, 1799],
  ["luna-pearl-handcuff", "Luna Pearl Handcuff", "handchains", 1199, 1699],
  ["luna-pearl-anklet", "Luna Pearl Anklet", "anklets", 699, 999],
  ["ocean-breeze-shell-anklet", "Ocean Breeze Shell Anklet", "anklets", 799, 1199],
  ["crystal-cascade-waist-chain", "Crystal Cascade Waist Chain", "waist", 1699, 2499],
  ["ibiza-pearl-waist-chain", "Ibiza Pearl Waist Chain", "waist", 1199, 1799],
  ["sahara-coin-waist-chain", "Sahara Coin Waist Chain", "waist", 1499, 2199],
  ["verona-mesh-watch", "Verona Mesh Watch", "watches", 2499, 3999],
  ["monaco-luxe-chronograph", "Monaco Luxe Chronograph", "watches", 3299, 4999],
  ["aurora-butterfly-claw-clip", "Aurora Butterfly Claw Clip", "hair", 649, 899],
  ["blossom-pearl-claw-clip", "Blossom Pearl Claw Clip", "hair", 549, 799],
  ["velvet-bloom-claw-clip", "Velvet Bloom Claw Clip", "hair", 699, 999],
  ["blush-satin-scrunchie", "Blush Satin Scrunchie", "hair", 299, 499],
  ["daisy-bloom-oversized-scrunchie", "Daisy Bloom Oversized Scrunchie", "hair", 449, 699],
  ["midnight-velvet-scrunchie", "Midnight Velvet Scrunchie", "hair", 349, 599],
  ["cherry-pop-phone-charm", "Cherry Pop Phone Charm", "charms", 599, 899],
  ["midnight-luxe-phone-charm", "Midnight Luxe Phone Charm", "charms", 799, 1199],
  ["ocean-mist-phone-charm", "Ocean Mist Phone Charm", "charms", 699, 999],
  ["initial-luxe-keychain", "Initial Luxe Keychain", "charms", 649, 999],
  ["wanderlust-airplane-keychain", "Wanderlust Airplane Keychain", "charms", 499, 799]
].map(function (p) {
  return { slug: p[0], name: p[1], cat: p[2], price: p[3], mrp: p[4], img: "assets/img/products/" + p[0] + ".webp" };
});

/* Hamper add-ons: priced on WhatsApp because they change with size and season. */
window.EXTRAS = [
  "Forever-flower rose stem",
  "Mini forever-flower bouquet",
  "Chocolates",
  "Scented candle",
  "Personalised photo frame",
  "Customised mini magazine",
  "Balloons",
  "Snack bouquet"
];
