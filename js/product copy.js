// Parse query param
const params = new URLSearchParams(window.location.search);
const productKey = params.get("product") || "one";

// Aluminum product catalog and images
const productData = {
  one: {
    name: "Aluminum Foil Rolls (AL-FR)",
    desc: "Food service aluminum foil rolls available in 12/18/24 inches and multiple microns.",
    images: [
      "./assets/images/aluminium/al-foil-roll.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Description",
        "Length (feet)",
        "Width (inches)",
        "Thickness (micron)",
        "Roll per Case",
        "Weight/piece (kg)",
        "Weight/piece (lb)",
      ],
      rows: [
        [
          "AL-FR-01",
          "Aluminum Foil Roll - 1000 ft X 12 in X 12 micron",
          1000,
          12,
          12,
          1,
          3.01,
          6.62,
        ],
        [
          "AL-FR-02",
          "Aluminum Foil Roll - 1000 ft X 12 in X 14 micron",
          1000,
          12,
          14,
          1,
          3.51,
          7.73,
        ],
        [
          "AL-FR-03",
          "Aluminum Foil Roll - 1000 ft X 12 in X 16 micron",
          1000,
          12,
          16,
          1,
          4.01,
          8.83,
        ],
        [
          "AL-FR-04",
          "Aluminum Foil Roll - 1000 ft X 18 in X 14 micron",
          1000,
          18,
          14,
          1,
          5.27,
          11.59,
        ],
        [
          "AL-FR-05",
          "Aluminum Foil Roll - 1000 ft X 18 in X 16 micron",
          1000,
          18,
          16,
          1,
          6.02,
          13.24,
        ],
        [
          "AL-FR-06",
          "Aluminum Foil Roll - 1000 ft X 18 in X 17 micron",
          1000,
          18,
          17,
          1,
          6.4,
          14.07,
        ],
        [
          "AL-FR-07",
          "Aluminum Foil Roll - 1000 ft X 18 in X 24 micron",
          1000,
          18,
          24,
          1,
          9.03,
          19.87,
        ],
        [
          "AL-FR-08",
          "Aluminum Foil Roll - 1000 ft X 24 in X 21 micron",
          1000,
          24,
          21,
          1,
          10.54,
          23.18,
        ],
        [
          "AL-FR-09",
          "Aluminum Foil Roll - 500 ft X 12 in X 23 micron",
          500,
          12,
          23,
          1,
          2.88,
          6.35,
        ],
        [
          "AL-FR-10",
          "Aluminum Foil Roll - 500 ft X 18 in X 14 micron",
          500,
          18,
          14,
          1,
          2.63,
          5.79,
        ],
        [
          "AL-FR-11",
          "Aluminum Foil Roll - 500 ft X 18 in X 16 micron",
          500,
          18,
          16,
          1,
          3.01,
          6.62,
        ],
        [
          "AL-FR-12",
          "Aluminum Foil Roll - 500 ft X 18 in X 18 micron",
          500,
          18,
          18,
          1,
          3.39,
          7.45,
        ],
        [
          "AL-FR-13",
          "Aluminum Foil Roll - 500 ft X 18 in X 20 micron",
          500,
          18,
          20,
          1,
          3.76,
          8.28,
        ],
        [
          "AL-FR-14",
          "Aluminum Foil Roll - 500 ft X 18 in X 24 micron",
          500,
          18,
          24,
          1,
          4.52,
          9.93,
        ],
      ],
    },
  },
  two: {
    name: "Aluminum Foil Sheets (AL-FS)",
    desc: "Pre-cut aluminum foil sheets for quick service and prep.",
    images: [
      "./assets/images/aluminium/al-foil-sheets.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Description",
        "Length (inches)",
        "Width (inches)",
        "Thickness (micron)",
        "Packs per case",
        "No. of Sheets Per Case",
        "Weight/case (kg)",
        "Weight/case (lb)",
      ],
      rows: [
        [
          "AL-FS-01",
          "Aluminum Foil Sheet - 9 in X 10.75 in X 12 micron - 6X500",
          9,
          10.75,
          12,
          "6 X 500",
          3000,
          6.07,
          13.35,
        ],
        [
          "AL-FS-02",
          "Aluminum Foil Sheet - 9 in X 10.75 in X 14 micron - 12X200",
          9,
          10.75,
          14,
          "12 X 200",
          2400,
          5.66,
          12.46,
        ],
        [
          "AL-FS-03",
          "Aluminum Foil Sheet - 12 in X 10.75 in X 14 micron - 12X200",
          12,
          10.75,
          14,
          "12 X 200",
          2400,
          7.55,
          16.61,
        ],
        [
          "AL-FS-04",
          "Aluminum Foil Sheet - 12 in X 10.75 in X 16 micron - 6X500",
          12,
          10.75,
          16,
          "6 X 500",
          3000,
          10.79,
          23.73,
        ],
      ],
    },
  },
  three: {
    name: "Aluminum Cushion Foil (AL-CF)",
    desc: "Cushion foil sheets for takeout containers and food protection.",
    images: [
      "./assets/images/aluminium/al-cushiom-foil.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Description",
        "Length (inches)",
        "Width (inches)",
        "Thickness (micron)",
        "Packs per case",
        "No. of Sheets Per Case",
        "Weight/case (kg)",
        "Weight/case (lb)",
      ],
      rows: [
        [
          "AL-CF-01",
          "Aluminum Cushion Foil - 14 in X 10.75 in X 16 micron - 5X500",
          14,
          10.75,
          16,
          "5X500",
          2500,
          10.49,
          23.07,
        ],
        [
          "AL-CF-02",
          "Aluminum Cushion Foil - 14 in X 16 in X 16 micron - 2X500",
          14,
          16,
          16,
          "2X500",
          1000,
          6.24,
          13.73,
        ],
      ],
    },
  },
  four: {
    name: "Aluminum Foil Trays - Rectangular (AL-FT-RCT)",
    desc: "Rectangular aluminum steam pans and loaf pans in multiple gauges.",
    images: [
      "./assets/images/aluminium/al-foil-trays-rectangular.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Description",
        "Common Name",
        "Max Length (inches)",
        "Max Width (inches)",
        "Max Depth (inches)",
        "Thickness (micron)",
        "Packs per case",
        "Weight/case (kg)",
        "Weight/case (lb)",
      ],
      rows: [
        [
          "AL-FT-RCT-01",
          "Steam Pan Full Deep - 154 micron - 50 units",
          "Steam Pan Full Deep",
          20.7,
          12.9,
          3,
          154,
          50,
          6.29,
          13.83,
        ],
        [
          "AL-FT-RCT-02",
          "Steam Pan Full Deep - 140 micron - 50 units",
          "Steam Pan Full Deep",
          20.7,
          12.9,
          3,
          140,
          50,
          5.71,
          12.57,
        ],
        [
          "AL-FT-RCT-03",
          "Steam Pan Full Medium - 154 micron - 50 units",
          "Steam Pan Full Medium",
          20.7,
          12.9,
          2.1,
          154,
          50,
          5.47,
          12.04,
        ],
        [
          "AL-FT-RCT-04",
          "Steam Pan Half Deep - 94 micron - 100 units",
          "Steam Pan Half Deep",
          12.6,
          10.6,
          2.6,
          94,
          100,
          4.16,
          9.16,
        ],
        [
          "AL-FT-RCT-05",
          "Steam Pan Half Deep - 84 micron - 100 units",
          "Steam Pan Half Deep",
          12.6,
          10.6,
          2.6,
          84,
          100,
          3.72,
          8.18,
        ],
        [
          "AL-FT-RCT-06",
          "Steam Pan Half Medium - 107 micron - 100 units",
          "Steam Pan Half Medium",
          12.6,
          10.6,
          2.1,
          107,
          100,
          4.31,
          9.47,
        ],
        [
          "AL-FT-RCT-07",
          "Steam Pan Half Shallow - 110 micron - 100 units",
          "Steam Pan Half Shallow",
          12.6,
          10.6,
          1.6,
          110,
          100,
          3.98,
          8.76,
        ],
        [
          "AL-FT-RCT-08",
          "Loaf Pan 1lb - 82 micron - 200 units",
          "Loaf Pan 1 lb",
          6.125,
          3.75,
          2,
          82,
          200,
          1.78,
          3.93,
        ],
      ],
    },
  },
  five: {
    name: "Aluminum Foil Trays - Round (AL-FT-RND)",
    desc: "Round aluminum pans in 7, 8, and 9 inch sizes.",
    images: [
      "./assets/images/aluminium/al-trays-round.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Description",
        "Common Name",
        "Max Diameter (inches)",
        "Max Depth (inches)",
        "Thickness (micron)",
        "Packs per case",
        "Weight/case (kg)",
        "Weight/case (lb)",
      ],
      rows: [
        [
          "AL-FT-RND-01",
          "Round Pan - 7 in - 60 micron - 500 units",
          'Round Pan 7"',
          7,
          1.6,
          60,
          500,
          3.85,
          8.47,
        ],
        [
          "AL-FT-RND-02",
          "Round Pan - 7 in - 85 micron - 500 units",
          'Round Pan 7"',
          7,
          1.6,
          85,
          500,
          5.46,
          12.0,
        ],
        [
          "AL-FT-RND-03",
          "Round Pan - 8 in - 78 micron - 500 units",
          'Round Pan 8"',
          8,
          1.6,
          78,
          500,
          6.15,
          13.53,
        ],
        [
          "AL-FT-RND-04",
          "Round Pan - 9 in - 81 micron - 500 units",
          'Round Pan 9"',
          9,
          1.8,
          81,
          500,
          8.08,
          17.78,
        ],
        [
          "AL-FT-RND-05",
          "Round Pan - 9 in - 65 micron - 500 units",
          'Round Pan 9"',
          9,
          1.8,
          65,
          500,
          6.49,
          14.27,
        ],
      ],
    },
  },
  six: {
    name: "Aluminum Tray Lids - Rectangular (AL-FT-RCT-LD)",
    desc: "Aluminum foil lids for full and half steam pans.",
    images: [
      "./assets/images/aluminium/al-foil-lids.png",
      "https://webpackagingsolutions.com/assets/images/packaging-product-img/BOPET-FILM.jpg",
      "assets/images/foil-img.jpg",
    ],
    specs: {
      columns: [
        "SKU",
        "Product Description",
        "Common Name",
        "Max Length (inches)",
        "Max Width (inches)",
        "Max Depth (inches)",
        "Thickness (micron)",
        "Packs per case",
        "Weight/case (kg)",
        "Weight/case (lb)",
      ],
      rows: [
        [
          "AL-FT-RCT-LD-01",
          "Lid for Full Steam Pan - 103 micron - 50 units",
          "Lid For Full Steam Pan",
          21.3,
          13.3,
          0.72,
          103,
          50,
          2.99,
          6.57,
        ],
        [
          "AL-FT-RCT-LD-02",
          "Lid for Half Steam Pan - 85 micron - 100 units",
          "Lid For Half Steam Pan",
          13,
          10.7,
          0.82,
          85,
          100,
          2.64,
          5.8,
        ],
        [
          "AL-FT-RCT-LD-03",
          "Lid for Full Steam Pan - 60 micron - 100 units",
          "Lid For Full  Steam Pan",
          20.6,
          12.8,
          0.28,
          60,
          100,
          2.95,
          6.49,
        ],
        [
          "AL-FT-RCT-LD-04",
          "Lid for Half Steam Pan - 85 micron - 100 units",
          "Lid For Half Steam Pan",
          12.7,
          10.4,
          0.28,
          85,
          100,
          2.15,
          4.72,
        ],
      ],
    },
  },

  // Compostable: Take-Out Containers
  cptc: {
    name: "Compostable Take-Out Containers (CP-TC)",
    desc: "Bagasse, plant fiber, MFPP clamshells in multiple sizes and compartments.",
    images: [
      "./assets/images/compost/compost-take-out-con.png",
      "assets/images/take-out-lids.jpg", 
    ],
    specs: {
      columns: [
        " SKU",
        "Product Type",
        "Material",
        "Shape",
        "Hinge",
        "Length (inches)",
        "Width (inches)",
        "Height (inches)",
        "No. of Compartment",
        "Style",
        "Color",
        "Case Quantity",
        "Weight per piece (g)",
        "Case Pack",
      ],
      rows: [
        [
          "CP-TC-02",
          'Take out container - Square - 8" - 1 Comp - White - Bagasse Fiber',
          "Bagasse Fiber (Sugarcane)",
          "Square",
          "Regular",
          8,
          8,
          3,
          1,
          "Clamshell & Hinged",
          "White",
          200,
          37,
          "4X50",
        ],
        [
          "CP-TC-03",
          'Take out container - Square - 8" - 3 Comp - White - Bagasse Fiber',
          "Bagasse Fiber (Sugarcane)",
          "Square",
          "Regular",
          8,
          8,
          3,
          3,
          "Clamshell & Hinged",
          "White",
          200,
          37,
          "4X50",
        ],
        [
          "CP-TC-04",
          'Take out container - Square - 9" - 1 Comp - White - Plant Fiber',
          "Plant Fiber",
          "Square",
          "Regular",
          9,
          9,
          3,
          1,
          "Clamshell & Hinged",
          "White",
          200,
          41,
          "4X50",
        ],
        [
          "CP-TC-05",
          'Take out container - Rectangular - 9"X6" - 1 Comp - White - Plant Fiber',
          "Plant Fiber",
          "Rectangular",
          "Hoagie Hinged",
          9,
          6,
          3,
          1,
          "Clamshell & Hinged",
          "White",
          250,
          30,
          "5X50",
        ],
        [
          "CP-TC-14",
          'Take out container - Square - 9" - 3 Comp - White - MFPP',
          "Mineral-Filled Polypropylene (MFPP)",
          "Square",
          "Regular",
          9,
          9,
          3,
          3,
          "Clamshell & Hinged",
          "White",
          120,
          60,
          "120",
        ],
      ],
    },
  },

  // Compostable: Plates
  cppt: {
    name: "Compostable Plates (CP-PT)",
    desc: "Round and oval plates in pulp and bagasse, multiple sizes and compartments.",
    images: [
      "./assets/images/compost/Compostable-plates.png",
      "assets/images/plate.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Type",
        "Material",
        "Shape",
        "Length (inches)",
        "Width (inches)",
        "No. of Compartment",
        "Color",
        "Case Quantity",
      ],
      rows: [
        [
          "CP-PT-01",
          'Plate - Round - 6" - 1 Comp - White - 1000 piece - Pulp Fiber',
          "Pulp Fiber",
          "Round",
          6,
          6,
          1,
          "White",
          1000,
        ],
        [
          "CP-PT-03",
          'Plate - Round - 9" - 1 Comp - White - 500 piece - Pulp Fiber',
          "Pulp Fiber",
          "Round",
          9,
          9,
          1,
          "White",
          500,
        ],
        [
          "CP-PT-07",
          'Plate - Round - 9" - 3 Comp - White - 500 piece - Pulp Fiber',
          "Pulp Fiber",
          "Round",
          9,
          9,
          3,
          "White",
          500,
        ],
        [
          "CP-PT-10",
          'Plate - Oval - 7"X10" - 1 Comp - White - 500 piece - Pulp Fiber',
          "Pulp Fiber",
          "Oval",
          7,
          10,
          1,
          "White",
          500,
        ],
        [
          "CP-PT-11",
          'Plate - Oval - 7"X10" - 1 Comp - Brown - 500 piece - Pulp Fiber',
          "Pulp Fiber",
          "Oval",
          7,
          10,
          1,
          "Brown",
          500,
        ],
        [
          "CP-PT-13",
          'Plate - Round - 9" - 1 Comp - White - 500 piece - Bagasse Fiber',
          "Bagasse Fiber",
          "Round",
          9,
          9,
          1,
          "White",
          500,
        ],
      ],
    },
  },
  // Compostable: Bowls
  cpbl: {
    name: "Compostable Bowls (CP-BL)",
    desc: "Fiber and paper bowls in 12–32 oz with matching lids.",
    images: [
      "./assets/images/compost/compost-bowls.png",
      "assets/images/bowls.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Type",
        "Material",
        "Shape",
        "Height (in)",
        "Max Width (in)",
        "Capacity (Oz)",
        "Color",
        "No. of Compartment",
        "Case Quantity",
      ],
      rows: [
        [
          "CP-BL-01",
          "Take out bowl - Round - 12oz - White - 1000 piece - Pulp Fiber",
          "Pulp Fiber",
          "Round",
          1.38,
          6.3,
          12,
          "White",
          1,
          1000,
        ],
        [
          "CP-BL-03",
          "Take out bowl - Round - 12oz - Kraft - 1000 piece - Bagasse Fiber",
          "Bagasse Fiber (Sugarcane)\nBamboo",
          "Round",
          1.38,
          6.3,
          12,
          "Kraft",
          1,
          1000,
        ],
        [
          "CP-BL-04",
          "Take out bowl - Round - 24oz - Kraft - 300 piece - Bagasse Fiber",
          "Bagasse Fiber (Sugarcane)\nBamboo",
          "Round",
          2.4,
          7.2,
          24,
          "Kraft",
          1,
          300,
        ],
        [
          "CP-BL-05",
          "Take out bowl - Round - 32oz - Kraft - 250 piece - Bagasse Fiber",
          "Bagasse Fiber (Sugarcane)\nBamboo",
          "Round",
          2.6,
          8,
          32,
          "Kraft",
          1,
          250,
        ],
      ],
    },
  },
  // PET Lids
  ptld: {
    name: "PET Lids (PT-LD)",
    desc: "Clear PET lids for 12–32 oz bowls and portion cups.",
    images: [
      "./assets/images/compost/pet-lids.png",
      "assets/images/lids.jpg",
    ],
    specs: {
      columns: [
        " SKU",
        "Product Type",
        "Material",
        "Shape",
        "Height (in)",
        "Diameter (in)",
        "Lid Compatible For (Oz)",
        "Color",
        "Case Quantity",
      ],
      rows: [
        [
          "PT-LD-01",
          'Lid for Bowl - Dome - 5.5" - Clear - 500 piece - PET',
          "PET",
          "Dome",
          1.25,
          5.5,
          "12",
          "Clear",
          500,
        ],
        [
          "PT-LD-02",
          'Lid for Bowl - Dome - 8.3" - Clear - 300 piece - PET',
          "PET",
          "Dome",
          1.18,
          8.3,
          "24-32",
          "Clear",
          300,
        ],
        [
          "PT-LD-03",
          'Lid for Portion Cup - Flat - 2.3" - Clear - 1000 piece - PET',
          "PET",
          "Flat",
          0.25,
          "2.375 - 2.625",
          "2-4",
          "Clear",
          1000,
        ],
      ],
    },
  },

  clm: {
    name: "Clamshell Containers",
    desc: "Punnets, heat-seal packs, flowpacks, open-window trays, on-the-go packs, tamper-evident, and hinged containers.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      "./assets/images/products-banner.jpeg",
    ],
    specs: {
      columns: [
        "SKU",
        "Family",
        "Length (in)",
        "Width (in)",
        "Height (in)",
        "Weight (oz)",
        "Pieces per Carton",
      ],
      rows: [
        ["WPSCS01", "Clamshell Punnets", 4.528, 4.528, 1.575, 0.406, 1050],
        ["WPSCS02", "Clamshell Punnets", 5.125, 4.437, 1.5625, 0.459, 1150],
        ["WPSCS03", "Clamshell Punnets", 5.125, 4.437, 2.75, 0.617, 1050],
        ["WPSCS04", "Clamshell Punnets", 7.638, 5.039, 2.559, 0.388, 1225],
        ["WPSCS05", "Clamshell Punnets", 4.528, 4.528, 2.756, 0.335, 1500],
        ["WPSCS06", "Clamshell Punnets", 5.039, 3.701, 2.165, 0.317, 1260],
        ["WPSCS07", "Clamshell Punnets", 4.528, 4.528, 2.756, 0.335, 1500],
        ["WPSCS08", "Clamshell Punnets", 5.039, 3.701, 2.165, 0.317, 1225],
        ["WPSCS09", "Clamshell Punnets", 7.5, 4.5, 2.187, 0.564, 840],
        ["WPSCS10", "Clamshell Punnets", 7.5, 4.5, 2.375, 0.6, 840],
        ["WPSHSP01", "Heat-seal Punnets", 5.551, 4.646, 1.024, 0.23, 2100],
        ["WPSHSP02", "Heat-seal Punnets", 5.709, 4.724, 1.772, 0.282, 2100],
        ["WPSHSP03", "Heat-seal Punnets", 5.709, 4.724, 2.953, "0.317/0.353/0.388", "1800/1775/1680"],
        ["WPSHSP04", "Heat-seal Punnets", 5.709, 4.724, 3.15, "0.423/0.014", 1585],
        ["WPSHSP05", "Heat-seal Punnets", 7.244, 4.606, 1.575, 0.381, 1375],
        ["WPSHSP06", "Heat-seal Punnets", 7.244, 4.606, 1.969, 0.448, 1350],
        ["WPSHSP07", "Heat-seal Punnets", 7.244, 4.606, 2.362, 0.448, 1300],
        ["WPSHSP08", "Heat-seal Punnets", 7.244, 4.606, 2.756, 0.448, 1100],
        ["WPSHSP09", "Heat-seal Punnets", 7.244, 4.606, 2.953, 0.529, 1050],
        ["WPSHSP10", "Heat-seal Punnets", 5.63, 4.764, 0.787, 0.247, 1050],
        ["WPSFP01", "Flowpacks", 7.244, 4.606, 1.969, 0.3, 1440],
        ["WPSFP02", "Flowpacks", 7.244, 4.606, 2.362, 0.317, 1420],
        ["WPSFP03", "Flowpacks", 7.244, 4.606, 2.953, "0.388/0.459", "1280/1260"],
        ["WPSFP04", "Flowpacks", 7.244, 4.606, 4.055, 0.547, 1120],
        ["WPSOWT01", "Open Window Trays", 6.89, 4.921, 0.748, "0.282/0.282", 2400],
        ["WPSOWT02", "Open Window Trays", 6.89, 4.921, 0.827, "0.247/0.282", 2400],
        ["WPSOWT03", "Open Window Trays", 6.89, 4.921, 1.063, "0.335/0.494/0.529", "2000/1360/1320"],
        ["WPSOWT04", "Open Window Trays", 6.89, 4.921, 1.496, 0.198, 4000],
        ["WPSOWT05", "Open Window Trays", 6.89, 4.921, 1.693, 0.335, 1800],
        ["WPSOWT06", "Open Window Trays", 4.606, 4.606, 0.709, 0.229, 3400],
        ["WPSOWT07", "Open Window Trays", 6.888, 4.921, 0.866, 0.388, 2000],
        ["WPSOWT08", "Open Window Trays", 9.252, 3.74, 0.984, 0.388, 2100],
        ["WPSOTGP01", "On-the-go Packs", 4.606, 4.606, 0.63, 0.265, 1000],
        ["WPSOTGP02", "On-the-go Packs", 4.488, 4.488, 2.047, 4.488, 2000],
        ["WPSOTGP03", "On-the-go Packs", 4.488, 4.488, 1.575, 0.3, 1000],
        ["WPSOTGP04", "On-the-go Packs", 4.488, 4.488, 2.047, 0.399, 1000],
        ["WPSOTGP05", "On-the-go Packs", 4.488, 4.488, 2.953, 0.564, 1000],
        ["WPSOTGP06", "On-the-go Packs", 4.488, 4.488, 4.173, 0.646, 1350],
        ["WPSTEC01", "Tamper-evident", 5.709, 5.039, 1.575, 0.6, 655],
        ["WPSTEC02", "Tamper-evident", 5.709, 5.039, 1.969, 0.635, 640],
        ["WPSTEC03", "Tamper-evident", 5.709, 5.039, 2.559, 0.776, 600],
        ["WPSTEC04", "Tamper-evident", 7.441, 5.709, 1.969, 1.058, 320],
        ["WPSTEC05", "Tamper-evident", 7.441, 5.709, 2.362, 1.199, 310],
        ["WPSTEC06", "Tamper-evident", 7.441, 5.709, 2.835, 1.34, 300],
        ["WPSHC01", "Hinged Containers", 7.402, 5.709, 1.772, 0.741, 630],
        ["WPSHC02", "Hinged Containers", 8.583, 6.102, 1.969, 1.093, 430],
        ["WPSHC03", "Hinged Containers", 7.402, 5.709, 3.15, 0.97, 610],
        ["WPSHC04", "Hinged Containers", 7.402, 5.709, 3.74, 0.988, 600],
        ["WPSHC05", "Hinged Containers", 8.583, 6.102, 1.969, 1.093, 430],
        ["WPSHC06", "Hinged Containers", 8.583, 6.102, 2.362, 1.164, 420],
        ["WPSHC07", "Hinged Containers", 8.582, 6.102, 2.953, 1.305, 410],
        ["WPSHC08", "Hinged Containers", 8.583, 6.102, 3.346, 1.376, 400],
      ],
    },
  },
};

const data = productData[productKey] || productData.one;

// Populate details
document.title = `${data.name} - SreeVee`;
document.getElementById("productName").textContent = data.name;
document.getElementById("crumbName").textContent = data.name;
document.getElementById("productDesc").textContent = data.desc;

// Images
const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

function setMain(src) {
  mainImage.src = src;
}

thumbs.innerHTML = "";
data.images.forEach((src, i) => {
  if (i === 0) setMain(src);
  const col = document.createElement("div");
  col.className = "col";
  col.innerHTML = `
    <button class="btn p-0 w-100 border rounded overflow-hidden bg-white" aria-label="Preview image">
      <img src="${src}" alt="Thumbnail ${
    i + 1
  }" class="w-100" style="aspect-ratio: 4/3; object-fit: cover;">
    </button>
  `;
  const btn = col.querySelector("button");
  btn.addEventListener("click", () => setMain(src));
  thumbs.appendChild(col);
});

// Build dynamic specs table into the Specs tab
const specsHost = document.getElementById("specs");
if (specsHost && data.specs) {
  const { columns, rows } = data.specs;
  const skipSku =
    columns.length && columns[0].toLowerCase().includes("sku") ? 1 : 0;
  const visibleColumns = columns.slice(skipSku);
  const visibleRows = rows.map((r) => (skipSku ? r.slice(skipSku) : r));
  const thead = `<thead><tr>${visibleColumns
    .map((c) => `<th scope="col">${c}</th>`)
    .join("")}</tr></thead>`;
  const tbody = `<tbody>${visibleRows
    .map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  specsHost.innerHTML = `
    <div class="table-responsive">
      <table class="table table-striped align-middle mb-0">${thead}${tbody}</table>
    </div>
  `;
}

// Configure controls: show selectors for all products and populate from catalog
const lengthSelect = document.getElementById("lengthSelect");
const widthSelect = document.getElementById("widthSelect");
const thicknessSelect = document.getElementById("thicknessSelect");
const controlsRow = lengthSelect ? lengthSelect.closest(".row") : null;

function setOptions(sel, arr) {
  if (!sel) return;
  sel.innerHTML = arr.map((v) => `<option value="${v}">${v}</option>`).join("");
}

const lenLabel = document.querySelector('label[for="lengthSelect"]');
const widLabel = document.querySelector('label[for="widthSelect"]');
const thkLabel = document.querySelector('label[for="thicknessSelect"]');

let lenIdx, widIdx, thkIdx;
let thirdLabel = "Thickness (micron)";
// Default labels
if (lenLabel) lenLabel.textContent = "Length (inches)";
if (widLabel) widLabel.textContent = "Width (inches)";
if (thkLabel) thkLabel.textContent = "Thickness (micron)";

switch (productKey) {
  case "one": // Rolls
    lenIdx = 2;
    widIdx = 3;
    thkIdx = 4;
    if (lenLabel) lenLabel.textContent = "Length (feet)";
    if (widLabel) widLabel.textContent = "Width (inches)";
    break;
  case "two": // Sheets
  case "three": // Cushion foil
    lenIdx = 2;
    widIdx = 3;
    thkIdx = 4;
    if (lenLabel) lenLabel.textContent = "Length (inches)";
    break;
  case "four": // Rectangular trays
  case "six": // Rectangular lids
    lenIdx = 3;
    widIdx = 4;
    thkIdx = 6;
    if (lenLabel) lenLabel.textContent = "Max Length (inches)";
    if (widLabel) widLabel.textContent = "Max Width (inches)";
    break;
  case "five": // Round trays
    lenIdx = 3;
    widIdx = 4;
    thkIdx = 5;
    if (lenLabel) lenLabel.textContent = "Diameter (inches)";
    if (widLabel) widLabel.textContent = "Depth (inches)";
    break;
  case "clm": // Clamshells, use Height as the third dimension
    lenIdx = 2;
    widIdx = 3;
    thkIdx = 4;
    thirdLabel = "Height (inches)";
    if (lenLabel) lenLabel.textContent = "Length (inches)";
    if (widLabel) widLabel.textContent = "Width (inches)";
    if (thkLabel) thkLabel.textContent = thirdLabel;
    break;
  // Compostable families: remap labels to Material/Shape/Case Quantity
  case "cptc": // Take-out containers
    lenIdx = 2; // Material
    widIdx = 3; // Shape
    thkIdx = 11; // Case Quantity
    if (lenLabel) lenLabel.textContent = "Material";
    if (widLabel) widLabel.textContent = "Shape";
    if (thkLabel) thkLabel.textContent = "Case Quantity";
    break;
  case "cppt": // Plates
    lenIdx = 2; // Material
    widIdx = 3; // Shape
    thkIdx = 8; // Case Quantity
    if (lenLabel) lenLabel.textContent = "Material";
    if (widLabel) widLabel.textContent = "Shape";
    if (thkLabel) thkLabel.textContent = "Case Quantity";
    break;
  case "cpbl": // Bowls
    lenIdx = 2; // Material
    widIdx = 3; // Shape
    thkIdx = 9; // Case Quantity
    if (lenLabel) lenLabel.textContent = "Material";
    if (widLabel) widLabel.textContent = "Shape";
    if (thkLabel) thkLabel.textContent = "Case Quantity";
    break;
  case "ptld": // PET lids
    lenIdx = 2; // Material
    widIdx = 3; // Shape
    thkIdx = 8; // Case Quantity
    if (lenLabel) lenLabel.textContent = "Material";
    if (widLabel) widLabel.textContent = "Shape";
    if (thkLabel) thkLabel.textContent = "Case Quantity";
    break;
  default:
    lenIdx = 2;
    widIdx = 3;
    thkIdx = 4;
}

if (controlsRow) controlsRow.style.display = "";
if (data.specs && Array.isArray(data.specs.rows)) {
  const lengths = [...new Set(data.specs.rows.map((r) => r[lenIdx]))]
    .filter((v) => v !== undefined)
    .sort((a, b) => a - b);
  const widths = [...new Set(data.specs.rows.map((r) => r[widIdx]))]
    .filter((v) => v !== undefined)
    .sort((a, b) => a - b);
  const microns = [...new Set(data.specs.rows.map((r) => r[thkIdx]))]
    .filter((v) => v !== undefined)
    .sort((a, b) => a - b);
  setOptions(lengthSelect, lengths);
  setOptions(widthSelect, widths);
  setOptions(thicknessSelect, microns);
}

// Quote flow
document.getElementById("getQuoteBtn").addEventListener("click", () => {
  const length = lengthSelect ? lengthSelect.value : "";
  const width = widthSelect ? widthSelect.value : "";
  const thickness = thicknessSelect ? thicknessSelect.value : "";
  let quoteProduct = productKey;
  let sku = "";
  let family = "";

  if (productKey === "clm" && data.specs && Array.isArray(data.specs.rows)) {
    const eq = (a, b) =>
      a !== undefined &&
      b !== undefined &&
      Math.abs(parseFloat(a) - parseFloat(b)) < 0.0001;
    const match = data.specs.rows.find(
      (r) => eq(r[lenIdx], length) && eq(r[widIdx], width) && eq(r[thkIdx], thickness)
    );
    if (match) {
      sku = match[0];
      family = match[1];
    } else {
      quoteProduct = "custom";
    }
  }

  const url = new URL(
    "get-quote.html",
    window.location.origin + window.location.pathname.replace(/[^/]*$/, "")
  );
  url.searchParams.set("product", quoteProduct);
  if (quoteProduct === "custom" && productKey === "clm") {
    url.searchParams.set("category", "clamshell");
  }
  if (length) url.searchParams.set("length", length);
  if (width) url.searchParams.set("width", width);
  if (productKey === "clm") {
    if (thickness) url.searchParams.set("height", thickness);
    if (sku) url.searchParams.set("sku", sku);
    if (family) url.searchParams.set("family", family);
  } else {
    if (thickness) url.searchParams.set("thickness", thickness);
  }
  window.location.href = url.toString();
});
