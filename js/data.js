// DC Complex Hamirpur - Central Data Store
export const COMPLEX_INFO = {
  name: "DC Complex Hamirpur",
  shortName: "DC Rooms",
  tagline: "Roadside Living & Retail • Thoughtful Living in Hamirpur",
  phone: "+916230013209",
  phoneDisplay: "+91 62300 13209",
  whatsappUrl: "https://wa.me/916230013209?text=Hi%2C%20I%20am%20inquiring%20about%20rooms%20and%20amenities%20at%20DC%20Complex%20Hamirpur",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=31.6833974,76.5488218",
  appleMapsUrl: "maps://?daddr=31.6833974,76.5488218&q=DIWAN+GENERAL+STORE&dirflg=d",
  address: "DIWAN GENERAL STORE, Tauni Devi Kakdiyar Rd, Hamirpur, Himachal Pradesh 177001",
  govtRegistered: "HP Govt. Registered",
  vacancies: "3 Rooms Left",
  avatarUrl: "./images/owner.jpg"
};

export const ROOMS_DATA = [
  {
    id: "deluxe",
    title: "Deluxe Room with Balcony",
    badge: "Most Popular Choice",
    price: "₹8,500",
    period: "/month",
    status: "Available (2 Left)",
    statusColor: "emerald",
    image: "./images/deluxe_room.jpg",
    description: "Sunlit mountain-view room in Hamirpur with a spacious walkout balcony framing lush pine green mountains, premium carved teak wood bed with Himachali runner, modern warm ambiance with soft indoor lighting, and private ensuite.",
    features: [
      "Private Walkout Pine-View Balcony",
      "Attached Western Washroom with Wall Geyser",
      "Carved Teak Wood Double Bed with Mattress",
      "Dedicated High-Speed JioFiber Wi-Fi",
      "Separate HPSEBL Electricity Submeter",
      "Spacious Wardrobe & Study Desk"
    ],
    highlights: ["Private Balcony", "Mountain View", "Ensuite Geyser", "Power Backup"]
  },
  {
    id: "standard",
    title: "Standard Furnished Room",
    badge: "Budget Friendly",
    price: "₹6,500",
    period: "/month",
    status: "Available (1 Left)",
    statusColor: "emerald",
    image: "./images/standard_room.jpg",
    description: "Cozy standard furnished bedroom in Hamirpur featuring a sturdy dark oak storage box bed, neat cotton quilt, private clean tiled washroom with wall geyser, natural sunlight through large window with warm drapes.",
    features: [
      "Sturdy Dark Oak Storage Bed with Mattress",
      "Private Attached Clean Washroom with Geyser",
      "Large Sunny Window with Mountain Breeze",
      "High-Speed JioFiber Internet Included",
      "Individual Electricity Submeter",
      "Study Table, Chair & Steel Almirah"
    ],
    highlights: ["Ensuite Geyser", "Box Storage Bed", "High-Speed Wi-Fi", "Separate Submeter"]
  },
  {
    id: "studio",
    title: "Studio Suite with Kitchenette",
    badge: "Self-Contained Living",
    price: "₹11,000",
    period: "/month",
    status: "Waitlist for Next Month",
    statusColor: "amber",
    image: "./images/studio_room.jpg",
    description: "Spacious studio suite apartment with an open polished granite kitchenette counter, induction stove setup, wooden shelving, attached hill-view terrace window, and comfortable study desk workstation.",
    features: [
      "Granite Kitchenette with Induction Friendly Setup",
      "Private Hill-View Terrace Balcony Window",
      "Attached Premium Ensuite Washroom",
      "Ergonomic Study / Remote Workstation",
      "Kitchen Exhaust Fan & Storage Cabinets",
      "Separate Submeter & 24/7 Power Backup"
    ],
    highlights: ["Private Kitchenette", "Terrace Window", "Workstation", "Inverter Backup"]
  }
];

export const CONVENIENCES = [
  { icon: "electric_bolt", title: "Govt. HPSEBL Submeter", desc: "Pay strictly for exact usage with your own digital submeter." },
  { icon: "wifi", title: "High-Speed JioFiber", desc: "Reliable, unthrottled fiber Wi-Fi for video calls, work & study." },
  { icon: "water_heater", title: "24/7 Hot Water Geyser", desc: "Instant wall geysers installed in all attached bathrooms." },
  { icon: "local_shipping", title: "Swiggy & Zomato Doorstep", desc: "All prominent food apps deliver directly to your room door." },
  { icon: "local_parking", title: "Dedicated Roadside Parking", desc: "Safe parking for two-wheelers & cars right at the complex." },
  { icon: "security", title: "24/7 CCTV & Security", desc: "Round-the-clock common surveillance & secure digital entrance." },
  { icon: "water_drop", title: "Multi-Stage RO Water", desc: "Unlimited clean, filtered drinking water available on every floor." },
  { icon: "lock_open", title: "No Rigid Curfews", desc: "Biometric keyless access suited for working professionals." }
];

export const GYM_DATA = {
  title: "DC Fitness Club",
  locationBadge: "1st & 2nd Floor • In-House",
  tagline: "Zero Winter Commute Fitness in Hamirpur",
  hours: "6:00 AM – 9:00 AM • 5:00 PM – 9:00 PM",
  heroImage: "./images/gym_interior.jpg",
  overview: "A modern, well-lit residential fitness center inside DC Complex Hamirpur featuring commercial cardio treadmills, cross-trainers, heavy dumbbell racks (2.5kg – 35kg), squat racks, clean black rubber gym flooring, and expansive mountain pine daylight views.",
  equipment: [
    { title: "Commercial Treadmills & Ellipticals", desc: "Shock-absorbing motorized running decks with digital tracking" },
    { title: "Olympic Barbell & Squat Cage", desc: "Sturdy rack with bumper plates and safety catchers for power lifting" },
    { title: "Heavy Dumbbell Zone (2.5 – 35 kg)", desc: "Rubberized hex dumbbells with flat, incline, and decline utility benches" },
    { title: "Multi-Station Dual Cable Cross", desc: "Adjustable pulley columns for complete upper and lower body workouts" },
    { title: "Stretching & Yoga Mat Zone", desc: "Anti-slip mats, foam rollers, resistance bands, and kettlebells" },
    { title: "Audio & Climate Controlled", desc: "Surround sound Bluetooth audio and fresh mountain cross-ventilation" }
  ],
  pricing: [
    {
      title: "Resident Day Pass",
      price: "₹50",
      period: "per session",
      badge: "Pay As You Go",
      desc: "Instant access for residents on days they wish to workout without any long commitment.",
      features: ["Full gym access for the day", "Shower & locker facility", "No advance booking required"]
    },
    {
      title: "Resident Monthly",
      price: "₹500",
      period: "/month",
      badge: "Exclusive Resident Discount",
      popular: true,
      desc: "Heavily subsidized discount rate exclusive to tenants living in DC Complex rooms.",
      features: ["Unlimited 30-day access", "6:00 AM – 9:00 AM • 5:00 PM – 9:00 PM access", "Locker & filtered water", "Free routine guidance"]
    },
    {
      title: "Non-Resident Monthly",
      price: "₹1,200",
      period: "/month",
      badge: "Public Membership",
      desc: "For local professionals and university students living in adjacent Hamirpur areas.",
      features: ["All equipment access", "Morning & evening slots", "Shower & locker access"]
    }
  ]
};

export const GROCERY_DATA = {
  title: "Daily Grocery Mart",
  locationBadge: "Ground Floor • Active",
  tagline: "Zero-Commute Everyday Essentials",
  hours: "7:30 AM – 10:00 PM Daily",
  heroImage: "./images/grocery.jpg",
  overview: "Located right on the ground floor of DC Complex. Stocked daily with farm-fresh milk, Himachali curd, pantry staples, toiletries, and late-night snacks so you never have to walk to the main bazaar in the cold.",
  categories: [
    {
      icon: "local_cafe",
      name: "Dairy, Milk & Bakery",
      items: "Fresh milk (Verka / Amul), fresh paneer, curd, brown & white bread, farm eggs, Himachal apples & seasonal produce."
    },
    {
      icon: "ramen_dining",
      name: "Packaged Staples & Snacks",
      items: "Maggi, cup noodles, oats, rice, lentils, biscuits, chips, cold drinks, juices, instant coffee & premium tea blends."
    },
    {
      icon: "sanitizer",
      name: "Toiletries & Hygiene",
      items: "Soaps, shampoos, detergents, toothpaste, deodorants, shaving foam, feminine hygiene products, hand sanitizers."
    },
    {
      icon: "edit_note",
      name: "Stationery & Daily Needs",
      items: "Registers, notebooks, pens, exam pads, USB cables, batteries, quick photocopy & print service assistance."
    }
  ],
  residentPerks: [
    {
      icon: "chat",
      title: "10-Minute Room Delivery",
      desc: "Just send a WhatsApp list with your room number. Our ground floor team delivers right to your door."
    },
    {
      icon: "receipt_long",
      title: "Monthly Rent Ledger",
      desc: "Verified long-term residents can opt to bill their grocery tab alongside their monthly room rent invoice."
    },
    {
      icon: "access_time",
      title: "Open Till 10:00 PM",
      desc: "Convenient late evening hours so you never miss dinner ingredients or study snack essentials."
    }
  ]
};

export const HOUSE_RULES = [
  { icon: "bedtime", title: "Quiet Hours (10:30 PM – 6:30 AM)", desc: "Maintain low volume in corridors and rooms to respect residents studying and resting." },
  { icon: "group", title: "Daytime Guests Welcomed", desc: "Friends and family can visit during the day. Overnight guests must be registered with reception." },
  { icon: "delete_outline", title: "Waste Segregation", desc: "Segregated dry and wet bins provided on every floor. Please dispose of waste responsibly." },
  { icon: "smoke_free", title: "No Smoking Indoors", desc: "Smoking is strictly prohibited inside rooms and corridors. A designated outdoor area is available." },
  { icon: "build_circle", title: "Quick Maintenance Resolution", desc: "Any plumbing, Wi-Fi, or electrical complaints logged before 2:00 PM are resolved the same day." }
];
