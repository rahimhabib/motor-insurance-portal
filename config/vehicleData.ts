/**
 * Vehicle Data Configuration
 * Contains makes, models, cities, and personal accident slabs
 */

export interface VehicleData {
  makes: string[];
  models: Record<string, string[]>;
  cities: string[];
  personalAccidentSlabs: string[];
}

export const vehicleData: VehicleData = {
  makes: [
    "Toyota",
    "Suzuki",
    "Honda",
    "Daihatsu",
    "KIA",
    "Hyundai",
    "Changan",
    "Haval",
    "MG",
    "FAW",
    "DFSK",
    "United",
    "Prince",
    "Proton",
    "Audi",
    "BMW",
    "Mercedes Benz",
    "Nissan",
    "Porsche",
    "Volkswagen",
    "Volvo",
    "Others"
  ],
  models: {
    "Toyota": [
      "Corolla",
      "Corolla Axio",
      "Corolla Fielder",
      "Corolla Hatchback",
      "Corolla Touring",
      "Corolla Cross",
      "Yaris Sedan",
      "Yaris Hatchback",
      "Yaris Cross",
      "Aqua",
      "Auris",
      "Camry",
      "Fortuner",
      "Hilux",
      "Land Cruiser",
      "Prado",
      "Harrier",
      "Rav4",
      "Rush",
      "Supra",
      "86",
      "Crown",
      "Voxy",
      "Vellfire",
      "Innova",
      "Passo",
      "Raize",
      "Roomy",
      "Pixis Epoch",
      "Town Ace",
      "Hiace",
      "Coaster",
      "Dyna",
      "Urban Cruiser",
      "Century",
      "Highlander",
      "bZ4X",
      "C+pod"
    ],
    "Suzuki": [
      "Alto",
      "Cultus",
      "Swift",
      "Wagon R",
      "Alto Lapin",
      "Every",
      "Every Wagon",
      "Hustler",
      "Ignis",
      "Jimny",
      "Landy",
      "Solio",
      "XL7",
      "Xbee",
      "S-Cross",
      "Ertiga",
      "Ravi"
    ],
    "Honda": [
      "Civic",
      "City",
      "BR-V",
      "HR-V",
      "Vezel",
      "CR-V",
      "Fit",
      "Freed",
      "Jazz",
      "Mobilio",
      "Brio",
      "N One",
      "N-Wgn",
      "N-Van",
      "Stepwgn",
      "Spike",
      "Passport",
      "Elysion"
    ],
    "Daihatsu": [
      "Mira",
      "Move Canbus",
      "Move",
      "Taft",
      "Bezza",
      "Cast",
      "Copen",
      "Gran Max",
      "Rocky",
      "Tanto",
      "Terios",
      "Wake",
      "Xenia",
      "Thor"
    ],
    "KIA": [
      "Picanto",
      "Sportage",
      "Sportage L",
      "Sorento",
      "Carnival",
      "EV5",
      "EV9",
      "Cerato",
      "Rio",
      "Stonic",
      "Niro",
      "Carens",
      "Frontier K2700",
      "Shehzore K2700",
      "K5",
      "Stinger",
      "Syros",
      "Tasman"
    ],
    "Hyundai": [
      "Tucson",
      "Santa Fe",
      "Elantra",
      "Sonata",
      "Staria",
      "Alcazar",
      "Bayon",
      "H-100",
      "Mighty",
      "i10",
      "Ioniq 5",
      "Ioniq 6",
      "Nexo"
    ],
    "Changan": [
      "Alsvin",
      "CS35",
      "CS75",
      "Eado",
      "Oshan X7"
    ],
    "Haval": [
      "H6",
      "Jolion",
      "F7"
    ],
    "MG": [
      "HS",
      "ZS",
      "5"
    ],
    "FAW": [
      "V2",
      "X40"
    ],
    "DFSK": [
      "Glory 580",
      "Fengon 5"
    ],
    "United": [
      "United Bravo",
      "United Alpha"
    ],
    "Prince": [
      "Prince Classic",
      "Prince Crown"
    ],
    "Proton": [
      "Saga",
      "Persona",
      "X50",
      "X70"
    ],
    "Audi": [
      "A3",
      "A4",
      "A5",
      "A6",
      "A8",
      "Q3",
      "Q5",
      "Q7",
      "Q8",
      "e-tron"
    ],
    "BMW": [
      "1 Series",
      "3 Series",
      "5 Series",
      "7 Series",
      "X1",
      "X3",
      "X5",
      "X7",
      "iX"
    ],
    "Mercedes Benz": [
      "A-Class",
      "C-Class",
      "E-Class",
      "S-Class",
      "GLA",
      "GLC",
      "GLE",
      "GLS",
      "EQC"
    ],
    "Nissan": [
      "Altima",
      "Sentra",
      "Maxima",
      "Rogue",
      "Pathfinder",
      "Armada",
      "Leaf"
    ],
    "Porsche": [
      "911",
      "Cayenne",
      "Macan",
      "Panamera",
      "Taycan"
    ],
    "Volkswagen": [
      "Golf",
      "Jetta",
      "Passat",
      "Tiguan",
      "Atlas",
      "ID.4"
    ],
    "Volvo": [
      "XC40",
      "XC60",
      "XC90",
      "S60",
      "S90"
    ],
    "Others": [
      "Other Model"
    ]
  },
  cities: [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Gujranwala",
    "Sialkot",
    "Hyderabad",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Larkana",
    "Sheikhupura",
    "Jhang",
    "Rahim Yar Khan",
    "Gujrat",
    "Kasur",
    "Other"
  ],
  personalAccidentSlabs: [
    "500,000",
    "1,000,000",
    "2,000,000",
    "3,000,000",
    "5,000,000"
  ]
};


