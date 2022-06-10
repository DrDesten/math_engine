const solar_system_units = {
    name: "",
    radius: "m",
    volume: "m³",
    mass: "kg",
    area: "m²",
    density: "kg/m³",
    gravity: "m/s²",
    description: "",
    discovery: ""
}
const solar_system = [
    {
        name: "Sun",
        radius: 695508000, // m
        volume: 1.4093e+27, // m^3
        mass: 1.9891e+30, // kg
        area: 6078700000000000000, // m^2
        density: 1409, // kg/m^3
        gravity: 274, // m/s^2
        description: "G2V-class star",
        discovery: NaN,
    },
    {
        name: "Jupiter",
        radius: 69911000, // m
        volume: 1.43128e+24, // m^3
        mass: 1.898187e+27, // kg
        area: 61419000000000000, // m^2
        density: 1326.2, // kg/m^3
        gravity: 24.79, // m/s^2
        description: "gas giant planet; has rings",
        discovery: NaN,
    },
    {
        name: "Saturn",
        radius: 58232000, // m
        volume: 8.2713e+23, // m^3
        mass: 5.68317e+26, // kg
        area: 42612000000000000, // m^2
        density: 687.1, // kg/m^3
        gravity: 10.44, // m/s^2
        description: "gas giant planet; has rings",
        discovery: NaN,
    },
    {
        name: "Uranus",
        radius: 25362000, // m
        volume: 6.834e+22, // m^3
        mass: 8.6813e+25, // kg
        area: 8083100000000000, // m^2
        density: 1270, // kg/m^3
        gravity: 8.87, // m/s^2
        description: "ice giant planet; has rings",
        discovery: 1781,
    },
    {
        name: "Neptune",
        radius: 24622000, // m
        volume: 6.254e+22, // m^3
        mass: 1.02413e+26, // kg
        area: 7618300000000000, // m^2
        density: 1638, // kg/m^3
        gravity: 11.15, // m/s^2
        description: "ice giant planet; has rings",
        discovery: 1846,
    },
    {
        name: "Earth",
        radius: 6371008.399999999, // m
        volume: 1.08321e+21, // m^3
        mass: 5.9724e+24, // kg
        area: 510064470000000, // m^2
        density: 5513.6, // kg/m^3
        gravity: 9.8, // m/s^2
        description: "terrestrial planet",
        discovery: NaN,
    },
    {
        name: "Venus",
        radius: 6052000, // m
        volume: 928430000000000000000, // m^3
        mass: 4.8675e+24, // kg
        area: 460200000000000, // m^2
        density: 5243, // kg/m^3
        gravity: 8.87, // m/s^2
        description: "terrestrial planet",
        discovery: NaN,
    },
    {
        name: "Mars",
        radius: 3389500, // m
        volume: 163180000000000000000, // m^3
        mass: 6.4171e+23, // kg
        area: 144370000000000, // m^2
        density: 3934.1, // kg/m^3
        gravity: 3.71, // m/s^2
        description: "terrestrial planet",
        discovery: NaN,
    },
    {
        name: "Ganymede, Jupiter III",
        radius: 2634100, // m
        volume: 76300000000000000000, // m^3
        mass: 1.482e+23, // kg
        area: 86999000000000, // m^2
        density: 1936, // kg/m^3
        gravity: 1.428, // m/s^2
        description: "moon of Jupiter (icy)",
        discovery: 1610,
    },
    {
        name: "Titan, Saturn VI",
        radius: 2574730, // m
        volume: 71500000000000000000, // m^3
        mass: 1.345e+23, // kg
        area: 83305400000000, // m^2
        density: 1880, // kg/m^3
        gravity: 1.354, // m/s^2
        description: "moon of Saturn (icy)",
        discovery: 1655,
    },
    {
        name: "Mercury",
        radius: 2439400, // m
        volume: 60830000000000000000, // m^3
        mass: 3.3011e+23, // kg
        area: 74797000000000, // m^2
        density: 5429.1, // kg/m^3
        gravity: 3.7, // m/s^2
        description: "terrestrial planet",
        discovery: NaN,
    },
    {
        name: "Callisto, Jupiter IV",
        radius: 2410300, // m
        volume: 58650000000000000000, // m^3
        mass: 1.076e+23, // kg
        area: 73005000000000, // m^2
        density: 1834, // kg/m^3
        gravity: 1.23603, // m/s^2
        description: "moon of Jupiter (icy)",
        discovery: 1610,
    },
    {
        name: "Io, Jupiter I",
        radius: 1821600, // m
        volume: 25320000000000000000, // m^3
        mass: 8.932e+22, // kg
        area: 41698000000000, // m^2
        density: 3528, // kg/m^3
        gravity: 1.797, // m/s^2
        description: "moon of Jupiter (terrestrial)",
        discovery: 1610,
    },
    {
        name: "Moon (Luna), Earth I",
        radius: 1737500, // m
        volume: 21958000000000000000, // m^3
        mass: 7.346e+22, // kg
        area: 37937000000000, // m^2
        density: 3344, // kg/m^3
        gravity: 1.625, // m/s^2
        description: "moon of Earth (terrestrial)",
        discovery: NaN,
    },
    {
        name: "Europa, Jupiter II",
        radius: 1560800, // m
        volume: 15930000000000000000, // m^3
        mass: 4.8e+22, // kg
        area: 30613000000000, // m^2
        density: 3013, // kg/m^3
        gravity: 1.316, // m/s^2
        description: "moon of Jupiter (terrestrial)",
        discovery: 1610,
    },
    {
        name: "Triton, Neptune I",
        radius: 1353400, // m
        volume: 10380000000000000000, // m^3
        mass: 2.139e+22, // kg
        area: 23018000000000, // m^2
        density: 2061, // kg/m^3
        gravity: 0.782, // m/s^2
        description: "moon of Neptune (icy)",
        discovery: 1846,
    },
    {
        name: "Pluto, 134340",
        radius: 1188300, // m
        volume: 7057000000000000000, // m^3
        mass: 1.303e+22, // kg
        area: 17790000000000, // m^2
        density: 1854, // kg/m^3
        gravity: 0.62, // m/s^2
        description: "dwarf planet; plutino; multiple",
        discovery: 1930,
    },
    {
        name: "Eris, 136199",
        radius: 1163000, // m
        volume: 6590000000000000000, // m^3
        mass: 1.66e+22, // kg
        area: 17000000000000, // m^2
        density: 2520, // kg/m^3
        gravity: 0.824, // m/s^2
        description: "dwarf planet; SDO; binary",
        discovery: 2003,
    },
    {
        name: "Haumea, 136108",
        radius: 798000, // m
        volume: 1980000000000000000, // m^3
        mass: 4.01e+21, // kg
        area: 8140000000000, // m^2
        density: 2018, // kg/m^3
        gravity: 0.401, // m/s^2
        description: "dwarf planet; resonant KBO (7:12); trinary; has rings",
        discovery: 2004,
    },
    {
        name: "Titania, Uranus III",
        radius: 788900, // m
        volume: 2060000000000000000, // m^3
        mass: 3.4e+21, // kg
        area: 7820000000000, // m^2
        density: 1711, // kg/m^3
        gravity: 0.378, // m/s^2
        description: "moon of Uranus",
        discovery: 1787,
    },
    {
        name: "Rhea, Saturn V",
        radius: 763800, // m
        volume: 1870000000000000000, // m^3
        mass: 2.307e+21, // kg
        area: 7340000000000, // m^2
        density: 1236, // kg/m^3
        gravity: 0.26, // m/s^2
        description: "moon of Saturn",
        discovery: 1672,
    },
    {
        name: "Oberon, Uranus IV",
        radius: 761400, // m
        volume: 1850000000000000000, // m^3
        mass: 3.08e+21, // kg
        area: 7285000000000, // m^2
        density: 1630, // kg/m^3
        gravity: 0.347, // m/s^2
        description: "moon of Uranus",
        discovery: 1787,
    },
    {
        name: "Iapetus, Saturn VIII",
        radius: 735600, // m
        volume: 1660000000000000000, // m^3
        mass: 1.806e+21, // kg
        area: 6800000000000, // m^2
        density: 1088, // kg/m^3
        gravity: 0.223, // m/s^2
        description: "moon of Saturn",
        discovery: 1671,
    },
    {
        name: "Makemake, 136472",
        radius: 715000, // m
        volume: 1530000000000000000, // m^3
        mass: NaN, // kg
        area: 6400000000000, // m^2
        density: NaN, // kg/m^3
        gravity: 0.57, // m/s^2
        description: "dwarf planet; cubewano",
        discovery: 2005,
    },
    {
        name: "Gonggong, 225088",
        radius: 615000, // m
        volume: 1030000000000000000, // m^3
        mass: 1.75e+21, // kg
        area: NaN, // m^2
        density: 1720, // kg/m^3
        gravity: 0.3, // m/s^2
        description: "dwarf planet?; resonant SDO (3:10)",
        discovery: 2007,
    },
    {
        name: "Charon, Pluto I",
        radius: 606000, // m
        volume: 932000000000000000, // m^3
        mass: 1.586e+21, // kg
        area: 4578000000000, // m^2
        density: 1700, // kg/m^3
        gravity: 0.288, // m/s^2
        description: "moon of Pluto",
        discovery: 1978,
    },
    {
        name: "Umbriel, Uranus II",
        radius: 584700, // m
        volume: 837000000000000000, // m^3
        mass: 1.28e+21, // kg
        area: 4300000000000, // m^2
        density: 1390, // kg/m^3
        gravity: 0.234, // m/s^2
        description: "moon of Uranus",
        discovery: 1851,
    },
    {
        name: "Ariel, Uranus I",
        radius: 578900, // m
        volume: 813000000000000000, // m^3
        mass: 1.25e+21, // kg
        area: 4211000000000, // m^2
        density: 1660, // kg/m^3
        gravity: 0.269, // m/s^2
        description: "moon of Uranus",
        discovery: 1851,
    },
    {
        name: "Dione, Saturn IV",
        radius: 561700, // m
        volume: 741000000000000000, // m^3
        mass: 1.095e+21, // kg
        area: 3965000000000, // m^2
        density: 1478, // kg/m^3
        gravity: 0.232, // m/s^2
        description: "moon of Saturn",
        discovery: 1684,
    },
    {
        name: "Quaoar, 50000",
        radius: 560500, // m
        volume: 737000000000000000, // m^3
        mass: 1.4e+21, // kg
        area: 3830000000000, // m^2
        density: 2000, // kg/m^3
        gravity: 0.3, // m/s^2
        description: "cubewano; binary",
        discovery: 2002,
    },
    {
        name: "Tethys, Saturn III",
        radius: 533000, // m
        volume: 624000000000000000, // m^3
        mass: 617000000000000000000, // kg
        area: 3570000000000, // m^2
        density: 984, // kg/m^3
        gravity: 0.145, // m/s^2
        description: "moon of Saturn",
        discovery: 1684,
    },
    {
        name: "Sedna, 90377",
        radius: 498000, // m
        volume: 516000000000000000, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "sednoid; detached object",
        discovery: 2003,
    },
    {
        name: "Ceres, 1",
        radius: 469700, // m
        volume: 433000000000000000, // m^3
        mass: 938000000000000000000, // kg
        area: 2850000000000, // m^2
        density: 2170, // kg/m^3
        gravity: 0.28, // m/s^2
        description: "dwarf planet; belt asteroid",
        discovery: 1801,
    },
    {
        name: "Orcus, 90482",
        radius: 458000, // m
        volume: 404000000000000000, // m^3
        mass: 610000000000000000000, // kg
        area: NaN, // m^2
        density: 1530, // kg/m^3
        gravity: 0.2, // m/s^2
        description: "plutino; binary",
        discovery: 2004,
    },
    {
        name: "Salacia, 120347",
        radius: 423000, // m
        volume: 372900000000000000, // m^3
        mass: 492000000000000000000, // kg
        area: NaN, // m^2
        density: 1500, // kg/m^3
        gravity: 0.165, // m/s^2
        description: "cubewano; binary",
        discovery: 2004,
    },
    {
        name: "MS4, 307261",
        radius: 400000, // m
        volume: 268100000000000000, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2002,
    },
    {
        name: "AW197, 55565",
        radius: 384000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2002,
    },
    {
        name: "Varda, 174567",
        radius: 373000, // m
        volume: NaN, // m^3
        mass: 245000000000000000000, // kg
        area: NaN, // m^2
        density: 1230, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "FY27, 532037",
        radius: 370000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "detached object; binary",
        discovery: 2013,
    },
    {
        name: "Ixion, 28978",
        radius: 354800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: NaN,
    },
    {
        name: "AZ84, 208996",
        radius: 353000, // m
        volume: NaN, // m^3
        mass: 170000000000000000000, // kg
        area: NaN, // m^2
        density: 1130, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino; possible binary",
        discovery: 2003,
    },
    {
        name: "Dysnomia, Eris I",
        radius: 350000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Eris",
        discovery: NaN,
    },
    {
        name: "GV9, 90568",
        radius: 340000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2004,
    },
    {
        name: "RN43, 145452",
        radius: 340000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2005,
    },
    {
        name: "Varuna, 20000",
        radius: 334000, // m
        volume: NaN, // m^3
        mass: 160000000000000000000, // kg
        area: NaN, // m^2
        density: 990, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: NaN,
    },
    {
        name: "UX25, 55637",
        radius: 332000, // m
        volume: NaN, // m^3
        mass: 125000000000000000000, // kg
        area: NaN, // m^2
        density: 820, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: 2002,
    },
    {
        name: "VP113",
        radius: 325000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "sednoid",
        discovery: 2012,
    },
    {
        name: "Gǃkúnǁʼhòmdímà, 229762",
        radius: 321000, // m
        volume: NaN, // m^3
        mass: 136100000000000000000, // kg
        area: NaN, // m^2
        density: 1020, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO; binary",
        discovery: NaN,
    },
    {
        name: "RR245, 523794",
        radius: 313000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant KBO (2:9); binary",
        discovery: 2015,
    },
    {
        name: "OG19, 470599",
        radius: 309500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: 609, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2008,
    },
    {
        name: "JJ43, 278361",
        radius: 305000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2007,
    },
    {
        name: "Chaos, 19521",
        radius: 300000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: NaN,
    },
    {
        name: "EZ51, 523692",
        radius: 288000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2014,
    },
    {
        name: "XW93, 78799",
        radius: 283000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "other TNO",
        discovery: 2002,
    },
    {
        name: "XR190",
        radius: 278000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2004,
    },
    {
        name: "XV93",
        radius: 275000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2002,
    },
    {
        name: "UZ224",
        radius: 275000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2014,
    },
    {
        name: "VS2, 84922",
        radius: 274000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2003,
    },
    {
        name: "UZ413, 455502",
        radius: 268000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2003,
    },
    {
        name: "Vesta, 4",
        radius: 262700, // m
        volume: NaN, // m^3
        mass: 259000000000000000000, // kg
        area: NaN, // m^2
        density: 3460, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type V",
        discovery: NaN,
    },
    {
        name: "RM43, 145451",
        radius: 262000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2005,
    },
    {
        name: "Pallas, 2",
        radius: 256000, // m
        volume: NaN, // m^3
        mass: 204000000000000000000, // kg
        area: NaN, // m^2
        density: 2920, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type B",
        discovery: NaN,
    },
    {
        name: "TY364, 120348",
        radius: 256000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2004,
    },
    {
        name: "Enceladus, Saturn II",
        radius: 252100, // m
        volume: NaN, // m^3
        mass: 108000000000000000000, // kg
        area: NaN, // m^2
        density: 1609, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "TC302, 84522",
        radius: 250000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant SDO (2:5)",
        discovery: 2002,
    },
    {
        name: "UQ513, 202421",
        radius: 249000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2005,
    },
    {
        name: "Miranda, Uranus V",
        radius: 235800, // m
        volume: NaN, // m^3
        mass: 65900000000000000000, // kg
        area: NaN, // m^2
        density: 1200, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Dziewanna, 471143",
        radius: 235000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: NaN,
    },
    {
        name: "TB190, 145480",
        radius: 232000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "detached object",
        discovery: 2005,
    },
    {
        name: "DE9, 26375",
        radius: 231000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant SDO (2:5)",
        discovery: 1999,
    },
    {
        name: "FY128, 120132",
        radius: 230000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2003,
    },
    {
        name: "VR128, 84719",
        radius: 224000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2002,
    },
    {
        name: "Vanth, Orcus I",
        radius: 221000, // m
        volume: NaN, // m^3
        mass: 70000000000000000000, // kg
        area: NaN, // m^2
        density: 1500, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 90482 Orcus",
        discovery: NaN,
    },
    {
        name: "Hygiea, 10",
        radius: 216000, // m
        volume: NaN, // m^3
        mass: 87400000000000000000, // kg
        area: NaN, // m^2
        density: 2060, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "NT33, 444030",
        radius: 212000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2004,
    },
    {
        name: "Proteus, Neptune VIII",
        radius: 210000, // m
        volume: NaN, // m^3
        mass: 44000000000000000000, // kg
        area: NaN, // m^2
        density: 1300, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "QU182, 303775",
        radius: 208000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2005,
    },
    {
        name: "KX14, 119951",
        radius: 207500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2002,
    },
    {
        name: "QF298, 469372",
        radius: 204000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2001,
    },
    {
        name: "Huya, 38628",
        radius: 203000, // m
        volume: NaN, // m^3
        mass: 50000000000000000000, // kg
        area: NaN, // m^2
        density: 1430, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino; binary",
        discovery: NaN,
    },
    {
        name: "PF115, 175113",
        radius: 203000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2004,
    },
    {
        name: "UX10, 144897",
        radius: 199000, // m
        volume: NaN, // m^3
        mass: 30000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino",
        discovery: 2004,
    },
    {
        name: "Mimas, Saturn I",
        radius: 198200, // m
        volume: NaN, // m^3
        mass: 37490000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "SN165, 35671",
        radius: 196000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 1998,
    },
    {
        name: "UR163, 42301",
        radius: 176000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant KBO (4:9)",
        discovery: 2001,
    },
    {
        name: "Nereid, Neptune II",
        radius: 170000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "TL66, 15874",
        radius: 170000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 1996,
    },
    {
        name: "XA192, 230965",
        radius: 170000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "SDO",
        discovery: 2004,
    },
    {
        name: "WC19, 119979",
        radius: 169000, // m
        volume: NaN, // m^3
        mass: 77000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant KBO (1:2); binary",
        discovery: 2002,
    },
    {
        name: "Interamnia, 704",
        radius: 166000, // m
        volume: NaN, // m^3
        mass: 35200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type F",
        discovery: NaN,
    },
    {
        name: "Ilmarë, Varda I",
        radius: 163000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 174567 Varda",
        discovery: NaN,
    },
    {
        name: "Europa, 52",
        radius: 160000, // m
        volume: NaN, // m^3
        mass: 23900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Hiʻiaka, Haumea I",
        radius: 160000, // m
        volume: NaN, // m^3
        mass: 17900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Haumea",
        discovery: NaN,
    },
    {
        name: "Davida, 511",
        radius: 149000, // m
        volume: NaN, // m^3
        mass: 26600000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "TX300, 55636",
        radius: 143000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano",
        discovery: 2002,
    },
    {
        name: "Actaea, Salacia I",
        radius: 143000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 120347 Salacia",
        discovery: NaN,
    },
    {
        name: "Sylvia, 87",
        radius: 137000, // m
        volume: NaN, // m^3
        mass: 14300000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid type X; trinary",
        discovery: NaN,
    },
    {
        name: "Lempo, 47171",
        radius: 136000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "plutino; trinary",
        discovery: NaN,
    },
    {
        name: "Eunomia, 15",
        radius: 135000, // m
        volume: NaN, // m^3
        mass: 30500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Hyperion, Saturn VII",
        radius: 135000, // m
        volume: NaN, // m^3
        mass: 5620000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Euphrosyne, 31",
        radius: 134000, // m
        volume: NaN, // m^3
        mass: 16500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C; binary",
        discovery: NaN,
    },
    {
        name: "SM165, 26308",
        radius: 134000, // m
        volume: NaN, // m^3
        mass: 6870000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant KBO (1:2)",
        discovery: 1998,
    },
    {
        name: "Chariklo, 10199",
        radius: 130000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur; has rings",
        discovery: NaN,
    },
    {
        name: "Juno, 3",
        radius: 127000, // m
        volume: NaN, // m^3
        mass: 27000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Hiisi, Lempo II",
        radius: 126000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 47171 Lempo",
        discovery: NaN,
    },
    {
        name: "Hektor, 624",
        radius: 125000, // m
        volume: NaN, // m^3
        mass: 7900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D; binary",
        discovery: NaN,
    },
    {
        name: "Sila, 79360",
        radius: 124000, // m
        volume: NaN, // m^3
        mass: 10800000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "RW10, 309239",
        radius: 124000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "quasi-satellite of Neptune",
        discovery: 2007,
    },
    {
        name: "Altjira, 148780",
        radius: 123000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "Cybele, 65",
        radius: 118600, // m
        volume: NaN, // m^3
        mass: 13600000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Nunam, 79360",
        radius: 118000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 79360 Sila",
        discovery: NaN,
    },
    {
        name: "Bamberga, 324",
        radius: 114000, // m
        volume: NaN, // m^3
        mass: 10200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Patientia, 451",
        radius: 112900, // m
        volume: NaN, // m^3
        mass: 10900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Psyche, 16",
        radius: 112000, // m
        volume: NaN, // m^3
        mass: 26200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Ceto, 65489",
        radius: 112000, // m
        volume: NaN, // m^3
        mass: 5400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "extended centaur; binary",
        discovery: NaN,
    },
    {
        name: "Herculina, 532",
        radius: 111200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "S/2007 (148780) 1, Altjira I",
        radius: 110000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 148780 Altjira",
        discovery: NaN,
    },
    {
        name: "Thisbe, 88",
        radius: 109000, // m
        volume: NaN, // m^3
        mass: 11600000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type B",
        discovery: NaN,
    },
    {
        name: "Doris, 48",
        radius: 108000, // m
        volume: NaN, // m^3
        mass: 6900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Chiron 2060 or 95P",
        radius: 108000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur; has rings",
        discovery: NaN,
    },
    {
        name: "Phoebe, Saturn IX",
        radius: 106500, // m
        volume: NaN, // m^3
        mass: 8290000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "S/2012 (38628) 1, Huya I",
        radius: 106000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 38628 Huya",
        discovery: NaN,
    },
    {
        name: "Fortuna, 19",
        radius: 105500, // m
        volume: NaN, // m^3
        mass: 8800000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type G",
        discovery: NaN,
    },
    {
        name: "Camilla, 107",
        radius: 105000, // m
        volume: NaN, // m^3
        mass: 11200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid type C; trinary",
        discovery: NaN,
    },
    {
        name: "Themis, 24",
        radius: 104000, // m
        volume: NaN, // m^3
        mass: 6200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Amphitrite, 29",
        radius: 102000, // m
        volume: NaN, // m^3
        mass: 12700000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Egeria, 13",
        radius: 101000, // m
        volume: NaN, // m^3
        mass: 9200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type G",
        discovery: NaN,
    },
    {
        name: "Iris, 7",
        radius: 100000, // m
        volume: NaN, // m^3
        mass: 13500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Elektra, 130",
        radius: 99500, // m
        volume: NaN, // m^3
        mass: 6400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type G; multiple",
        discovery: NaN,
    },
    {
        name: "Bienor, 54598",
        radius: 99000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Hebe, 6",
        radius: 97500, // m
        volume: NaN, // m^3
        mass: 12400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Larissa, Neptune VII",
        radius: 97000, // m
        volume: NaN, // m^3
        mass: 4200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Ursula, 375",
        radius: 96800, // m
        volume: NaN, // m^3
        mass: 8400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Eugenia, 45",
        radius: 94000, // m
        volume: NaN, // m^3
        mass: 5800000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type F; trinary",
        discovery: NaN,
    },
    {
        name: "Hermione, 121",
        radius: 94000, // m
        volume: NaN, // m^3
        mass: 5000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid type C; binary",
        discovery: NaN,
    },
    {
        name: "Aurora, 94",
        radius: 93800, // m
        volume: NaN, // m^3
        mass: 6200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Daphne, 41",
        radius: 94000, // m
        volume: NaN, // m^3
        mass: 6100000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C; binary",
        discovery: NaN,
    },
    {
        name: "Bertha, 154",
        radius: 93400, // m
        volume: NaN, // m^3
        mass: 9200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Janus, Saturn X",
        radius: 89500, // m
        volume: NaN, // m^3
        mass: 1898000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Teharonhiawako, 88611",
        radius: 89000, // m
        volume: NaN, // m^3
        mass: 2440000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "Aegle, 96",
        radius: 88900, // m
        volume: NaN, // m^3
        mass: 6400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type T",
        discovery: NaN,
    },
    {
        name: "Galatea, Neptune VI",
        radius: 88000, // m
        volume: NaN, // m^3
        mass: 2120000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Phorcys, Ceto I",
        radius: 87000, // m
        volume: NaN, // m^3
        mass: 1670000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 65489 Ceto",
        discovery: NaN,
    },
    {
        name: "Palma, 372",
        radius: 86800, // m
        volume: NaN, // m^3
        mass: 5200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type B",
        discovery: NaN,
    },
    {
        name: "Metis, 9",
        radius: 86500, // m
        volume: NaN, // m^3
        mass: 8000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Alauda, 702",
        radius: 86000, // m
        volume: NaN, // m^3
        mass: 6060000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C; binary",
        discovery: NaN,
    },
    {
        name: "Hilda, 153",
        radius: 85300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid; Hildas",
        discovery: NaN,
    },
    {
        name: "Himalia, Jupiter VI",
        radius: 85000, // m
        volume: NaN, // m^3
        mass: 4200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Namaka, Haumea II",
        radius: 85000, // m
        volume: NaN, // m^3
        mass: 1800000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Haumea",
        discovery: NaN,
    },
    {
        name: "Weywot, Quaoar I",
        radius: 85000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 50000 Quaoar",
        discovery: NaN,
    },
    {
        name: "Freia, 76",
        radius: 84200, // m
        volume: NaN, // m^3
        mass: 2000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "outer belt asteroid type P/type X",
        discovery: NaN,
    },
    {
        name: "Amalthea, Jupiter V",
        radius: 83450, // m
        volume: NaN, // m^3
        mass: 2080000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Agamemnon, 911",
        radius: 83300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Elpis, 59",
        radius: 82600, // m
        volume: NaN, // m^3
        mass: 3000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type CP/type B",
        discovery: NaN,
    },
    {
        name: "Eleonora, 354",
        radius: 82500, // m
        volume: NaN, // m^3
        mass: 7500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type A",
        discovery: NaN,
    },
    {
        name: "Nemesis, 128",
        radius: 81500, // m
        volume: NaN, // m^3
        mass: 3400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Puck, Uranus XV",
        radius: 81000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "S/2015 (136472) 1, Makemake I",
        radius: 80000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Makemake",
        discovery: NaN,
    },
    {
        name: "Sycorax, Uranus XVII",
        radius: 78500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Io, 85",
        radius: 77400, // m
        volume: NaN, // m^3
        mass: 2600000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type FC/type B",
        discovery: NaN,
    },
    {
        name: "Minerva, 93",
        radius: 77080, // m
        volume: NaN, // m^3
        mass: 3500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C; trinary",
        discovery: NaN,
    },
    {
        name: "Alexandra, 54",
        radius: 77070, // m
        volume: NaN, // m^3
        mass: 6200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Laetitia, 39",
        radius: 77000, // m
        volume: NaN, // m^3
        mass: 4700000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Nemausa, 51",
        radius: 75000, // m
        volume: NaN, // m^3
        mass: 3900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type G",
        discovery: NaN,
    },
    {
        name: "Kalliope, 22",
        radius: 75000, // m
        volume: NaN, // m^3
        mass: 7700000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M; binary",
        discovery: NaN,
    },
    {
        name: "Despina, Neptune V",
        radius: 75000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Manwë, 385446",
        radius: 75000, // m
        volume: NaN, // m^3
        mass: 1410000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant KBO (4:7); binary",
        discovery: NaN,
    },
    {
        name: "Pales, 49",
        radius: 74900, // m
        volume: NaN, // m^3
        mass: 4200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Parthenope, 11",
        radius: 74500, // m
        volume: NaN, // m^3
        mass: 5500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Arethusa, 95",
        radius: 74000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Pulcova, 762",
        radius: 73700, // m
        volume: NaN, // m^3
        mass: 1400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type F; binary",
        discovery: NaN,
    },
    {
        name: "Flora, 8",
        radius: 73000, // m
        volume: NaN, // m^3
        mass: 4000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Ino, 173",
        radius: 72500, // m
        volume: NaN, // m^3
        mass: 2200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type Xc",
        discovery: NaN,
    },
    {
        name: "Adeona, 145",
        radius: 72000, // m
        volume: NaN, // m^3
        mass: 2400000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type Xc",
        discovery: NaN,
    },
    {
        name: "Irene, 14",
        radius: 72000, // m
        volume: NaN, // m^3
        mass: 2900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Melpomene, 18",
        radius: 70500, // m
        volume: NaN, // m^3
        mass: 4500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Lamberta, 187",
        radius: 70500, // m
        volume: NaN, // m^3
        mass: 1900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type Ch",
        discovery: NaN,
    },
    {
        name: "Aglaja, 47",
        radius: 71000, // m
        volume: NaN, // m^3
        mass: 3200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Patroclus, 617",
        radius: 70200, // m
        volume: NaN, // m^3
        mass: 1360000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type P; binary",
        discovery: NaN,
    },
    {
        name: "Julia, 89",
        radius: 70000, // m
        volume: NaN, // m^3
        mass: 4300000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Hesperia, 69",
        radius: 69100, // m
        volume: NaN, // m^3
        mass: 5860000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Typhon, 42355",
        radius: 69000, // m
        volume: NaN, // m^3
        mass: 870000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "resonant SDO (7:10); binary",
        discovery: NaN,
    },
    {
        name: "Massalia, 20",
        radius: 67800, // m
        volume: NaN, // m^3
        mass: 5000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Portia, Uranus XII",
        radius: 67600, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Emma, 283",
        radius: 66200, // m
        volume: NaN, // m^3
        mass: 1380000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type X; binary",
        discovery: NaN,
    },
    {
        name: "Paha, Lempo I",
        radius: 66000, // m
        volume: NaN, // m^3
        mass: 746000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 47171 Lempo",
        discovery: NaN,
    },
    {
        name: "Lucina, 146",
        radius: 65900, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Sawiskera, Teharonhiawako I",
        radius: 65500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 88611 Teharonhiawako",
        discovery: NaN,
    },
    {
        name: "Achilles, 588",
        radius: 65000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type DU",
        discovery: NaN,
    },
    {
        name: "Panopaea, 70",
        radius: 64000, // m
        volume: NaN, // m^3
        mass: 4330000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Thule, 279",
        radius: 63300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type D",
        discovery: NaN,
    },
    {
        name: "Borasisi, 66652",
        radius: 63000, // m
        volume: NaN, // m^3
        mass: 3433000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "Hestia, 46",
        radius: 62070, // m
        volume: NaN, // m^3
        mass: 3500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type P/type Xc",
        discovery: NaN,
    },
    {
        name: "Leto, 68",
        radius: 61300, // m
        volume: NaN, // m^3
        mass: 3280000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Undina, 92",
        radius: 60460, // m
        volume: NaN, // m^3
        mass: 4430000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type X",
        discovery: NaN,
    },
    {
        name: "Bellona, 28",
        radius: 60450, // m
        volume: NaN, // m^3
        mass: 2620000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Diana, 78",
        radius: 60300, // m
        volume: NaN, // m^3
        mass: 1270000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Anchises, 1173",
        radius: 60200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type P",
        discovery: NaN,
    },
    {
        name: "Bernardinelli-Bernstein C/2014 UN271",
        radius: 60000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "comet",
        discovery: NaN,
    },
    {
        name: "Galatea, 74",
        radius: 59400, // m
        volume: NaN, // m^3
        mass: 6130000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Deiphobus, 1867",
        radius: 59100, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type D",
        discovery: NaN,
    },
    {
        name: "Äneas, 1172",
        radius: 59010, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type D",
        discovery: NaN,
    },
    {
        name: "Kleopatra, 216",
        radius: 59000, // m
        volume: NaN, // m^3
        mass: 3000000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M; trinary",
        discovery: NaN,
    },
    {
        name: "Athamantis, 230",
        radius: 59000, // m
        volume: NaN, // m^3
        mass: 2300000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Diomedes, 1437",
        radius: 58890, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Terpsichore, 81",
        radius: 58900, // m
        volume: NaN, // m^3
        mass: 6190000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Epimetheus, Saturn XI",
        radius: 58100, // m
        volume: NaN, // m^3
        mass: 5266000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Victoria, 12",
        radius: 58000, // m
        volume: NaN, // m^3
        mass: 2700000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Circe, 34",
        radius: 57700, // m
        volume: NaN, // m^3
        mass: 3660000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Leda, 38",
        radius: 57700, // m
        volume: NaN, // m^3
        mass: 5710000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Odysseus, 1143",
        radius: 57300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Alcathous, 2241",
        radius: 56800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type D",
        discovery: NaN,
    },
    {
        name: "Melete, 56",
        radius: 56620, // m
        volume: NaN, // m^3
        mass: 4610000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type P",
        discovery: NaN,
    },
    {
        name: "Mnemosyne, 57",
        radius: 56300, // m
        volume: NaN, // m^3
        mass: 12600000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Nestor, 659",
        radius: 56200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type XC",
        discovery: NaN,
    },
    {
        name: "Harmonia, 40",
        radius: 55600, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Leleākūhonua, 541132",
        radius: 55000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "sednoid",
        discovery: NaN,
    },
    {
        name: "Euterpe, 27",
        radius: 54900, // m
        volume: NaN, // m^3
        mass: 1670000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Antilochus, 1583",
        radius: 54400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Thorondor, Manwë I",
        radius: 54000, // m
        volume: NaN, // m^3
        mass: 500000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 385446 Manwë",
        discovery: NaN,
    },
    {
        name: "Thalia, 23",
        radius: 53800, // m
        volume: NaN, // m^3
        mass: 1960000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Erato, 62",
        radius: 53500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type BU/type Ch",
        discovery: NaN,
    },
    {
        name: "Astraea, 5",
        radius: 53300, // m
        volume: NaN, // m^3
        mass: 2900000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Pabu, Borasisi I",
        radius: 52500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 66652 Borasisi",
        discovery: NaN,
    },
    {
        name: "Eos, 221",
        radius: 51760, // m
        volume: NaN, // m^3
        mass: 5870000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S/type K",
        discovery: NaN,
    },
    {
        name: "Aegina, 91",
        radius: 51700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Leukothea, 35",
        radius: 51500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Menoetius, Patroclus I",
        radius: 51400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 617 Patroclus",
        discovery: NaN,
    },
    {
        name: "Isis, 42",
        radius: 51400, // m
        volume: NaN, // m^3
        mass: 1580000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Klotho, 97",
        radius: 50400, // m
        volume: NaN, // m^3
        mass: 1330000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Troilus, 1208",
        radius: 50300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type FCU",
        discovery: NaN,
    },
    {
        name: "Asterope, 233",
        radius: 49800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type T/type K",
        discovery: NaN,
    },
    {
        name: "Pholus, 5145",
        radius: 49500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Thebe, Jupiter XIV",
        radius: 49300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Lutetia, 21",
        radius: 49000, // m
        volume: NaN, // m^3
        mass: 1700000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Kalypso, 53",
        radius: 48631, // m
        volume: NaN, // m^3
        mass: 5630000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type XC",
        discovery: NaN,
    },
    {
        name: "Notburga, 626",
        radius: 48420, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type XC",
        discovery: NaN,
    },
    {
        name: "Proserpina, 26",
        radius: 47400, // m
        volume: NaN, // m^3
        mass: 748000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Juliet, Uranus XI",
        radius: 46800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Urania, 30",
        radius: 44000, // m
        volume: NaN, // m^3
        mass: 1300000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Ausonia, 63",
        radius: 46500, // m
        volume: NaN, // m^3
        mass: 1200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Beatrix, 83",
        radius: 44819, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type X",
        discovery: NaN,
    },
    {
        name: "Concordia, 58",
        radius: 44806, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Echidna, Typhon I",
        radius: 44500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of 42355 Typhon",
        discovery: NaN,
    },
    {
        name: "Automedon, 2920",
        radius: 44287, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Antiope, 90",
        radius: 43900, // m
        volume: NaN, // m^3
        mass: 828000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C; binary",
        discovery: NaN,
    },
    {
        name: "Prometheus, Saturn XVI",
        radius: 43100, // m
        volume: NaN, // m^3
        mass: 159500000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Danaë, 61",
        radius: 42969, // m
        volume: NaN, // m^3
        mass: 2890000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Thetis, 17",
        radius: 42449, // m
        volume: NaN, // m^3
        mass: 1200000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Pandora, 55",
        radius: 42397, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Huenna, 379",
        radius: 42394, // m
        volume: NaN, // m^3
        mass: 383000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type B/type C; binary",
        discovery: NaN,
    },
    {
        name: "Virginia, 50",
        radius: 42037, // m
        volume: NaN, // m^3
        mass: 2310000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type X/type Ch",
        discovery: NaN,
    },
    {
        name: "Feronia, 72",
        radius: 41975, // m
        volume: NaN, // m^3
        mass: 3320000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type TDG",
        discovery: NaN,
    },
    {
        name: "S/2000 (90) 1, Antiope I",
        radius: 41900, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "secondary of 90 Antiope",
        discovery: NaN,
    },
    {
        name: "Poulydamas, 4348",
        radius: 41016, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type C",
        discovery: NaN,
    },
    {
        name: "Logos, 58534",
        radius: 41000, // m
        volume: NaN, // m^3
        mass: 458000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; binary",
        discovery: NaN,
    },
    {
        name: "Pandora, Saturn XVII",
        radius: 40700, // m
        volume: NaN, // m^3
        mass: 137100000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Thalassa, Neptune IV",
        radius: 40700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Niobe, 71",
        radius: 40430, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Pomona, 32",
        radius: 40380, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Belinda, Uranus XIV",
        radius: 40300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Elara, Jupiter VII",
        radius: 39950, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Cressida, Uranus IX",
        radius: 39800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Amycus, 55576",
        radius: 38150, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Hylonome, 10370",
        radius: 37545, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Socus, 3708",
        radius: 37831, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L5) type C",
        discovery: NaN,
    },
    {
        name: "Nysa, 44",
        radius: 37830, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type E",
        discovery: NaN,
    },
    {
        name: "Rosalind, Uranus XIII",
        radius: 36000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Maja, 66",
        radius: 35895, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Ariadne, 43",
        radius: 35670, // m
        volume: NaN, // m^3
        mass: 1210000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Iphigenia, 112",
        radius: 35535, // m
        volume: NaN, // m^3
        mass: 1970000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Dike, 99",
        radius: 33677, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Echeclus 60558 or 174P",
        radius: 32299.999999999996, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Desdemona, Uranus X",
        radius: 32000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Eurybates, 3548",
        radius: 31943, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type CP",
        discovery: NaN,
    },
    {
        name: "Eurynome, 79",
        radius: 31739, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Eurydike, 75",
        radius: 31189, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type M",
        discovery: NaN,
    },
    {
        name: "Halimede, Neptune IX",
        radius: 31000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Phocaea, 25",
        radius: 30527, // m
        volume: NaN, // m^3
        mass: 599000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Naiad, Neptune III",
        radius: 30200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Schwassmann– Wachmann 1 29P",
        radius: 30200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "comet",
        discovery: NaN,
    },
    {
        name: "Neso, Neptune XIII",
        radius: 30000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Angelina, 64",
        radius: 29146, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type E",
        discovery: NaN,
    },
    {
        name: "Pasiphae, Jupiter VIII",
        radius: 28900, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Alkmene, 82",
        radius: 28811, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Nessus, 7066",
        radius: 28500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Polana, 142",
        radius: 27406, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type F",
        discovery: NaN,
    },
    {
        name: "Bianca, Uranus VIII",
        radius: 27000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Mathilde, 253",
        radius: 26400, // m
        volume: NaN, // m^3
        mass: 103300000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Hidalgo, 944",
        radius: 26225, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Orus, 21900",
        radius: 25405, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type C/type D",
        discovery: NaN,
    },
    {
        name: "Amalthea, 113",
        radius: 25069, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S; binary",
        discovery: NaN,
    },
    {
        name: "Prospero, Uranus XVIII",
        radius: 25000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Setebos, Uranus XIX",
        radius: 24000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Carme, Jupiter XI",
        radius: 23350, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Klytia, 73",
        radius: 22295, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Sao, Neptune XI",
        radius: 22000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Echo, 60",
        radius: 21609, // m
        volume: NaN, // m^3
        mass: 315000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Metis, Jupiter XVI",
        radius: 21500, // m
        volume: NaN, // m^3
        mass: 119893000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Ophelia, Uranus VII",
        radius: 21400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Lysithea, Jupiter X",
        radius: 21100, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Caliban, Uranus XVI",
        radius: 21000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Laomedeia, Neptune XII",
        radius: 21000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Cordelia, Uranus VI",
        radius: 20100, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Psamathe, Neptune X",
        radius: 20000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Urda, 167",
        radius: 19968, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Hydra, Pluto III",
        radius: 19650, // m
        volume: NaN, // m^3
        mass: 48000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Pluto",
        discovery: NaN,
    },
    {
        name: "Siarnaq, Saturn XXIX",
        radius: 19650, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Koronis, 158",
        radius: 19513, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Nix, Pluto II",
        radius: 19017, // m
        volume: NaN, // m^3
        mass: 45000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Pluto",
        discovery: NaN,
    },
    {
        name: "Ganymed, 1036",
        radius: 18838, // m
        volume: NaN, // m^3
        mass: 167000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S",
        discovery: NaN,
    },
    {
        name: "Okyrhoe, 52872",
        radius: 18000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur",
        discovery: NaN,
    },
    {
        name: "Helene, Saturn XII",
        radius: 17600, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn; Dione trojan (L4)",
        discovery: NaN,
    },
    {
        name: "Sinope, Jupiter IX",
        radius: 17500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Hippocamp, Neptune XIV",
        radius: 17400, // m
        volume: NaN, // m^3
        mass: 50000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Neptune",
        discovery: NaN,
    },
    {
        name: "Leucus, 11351",
        radius: 17078, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type D",
        discovery: NaN,
    },
    {
        name: "Stephano, Uranus XX",
        radius: 16000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Arrokoth, 486958",
        radius: 15850, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "cubewano; contact binary",
        discovery: NaN,
    },
    {
        name: "Ida, 243",
        radius: 15700, // m
        volume: NaN, // m^3
        mass: 42000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S; binary",
        discovery: NaN,
    },
    {
        name: "Atlas, Saturn XV",
        radius: 15100, // m
        volume: NaN, // m^3
        mass: 6600000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Ananke, Jupiter XII",
        radius: 14550, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Albiorix, Saturn XXVI",
        radius: 14300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Pan, Saturn XVIII",
        radius: 14100, // m
        volume: NaN, // m^3
        mass: 4950000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Linus, Kalliope I",
        radius: 14000, // m
        volume: NaN, // m^3
        mass: 60000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 22 Kalliope",
        discovery: NaN,
    },
    {
        name: "Dioretsa, 20461",
        radius: 14000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "centaur; damocloid",
        discovery: NaN,
    },
    {
        name: "Perdita, Uranus XXV",
        radius: 13000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Telesto, Saturn XIII",
        radius: 12400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn; Tethys trojan (L4)",
        discovery: NaN,
    },
    {
        name: "Mab, Uranus XXVI",
        radius: 12000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Phobos, Mars I",
        radius: 11100, // m
        volume: NaN, // m^3
        mass: 10659000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Mars",
        discovery: NaN,
    },
    {
        name: "Paaliaq, Saturn XX",
        radius: 11000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Francisco, Uranus XXII",
        radius: 11000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Leda, Jupiter XIII",
        radius: 10750, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Calypso, Saturn XIV",
        radius: 10700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moons of Saturn; Tethys trojan (L5)",
        discovery: NaN,
    },
    {
        name: "Polymele, 15094",
        radius: 10548, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter trojan (L4) type P",
        discovery: NaN,
    },
    {
        name: "Margaret, Uranus XXIII",
        radius: 10000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Ferdinand, Uranus XXIV",
        radius: 10000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Cupid, Uranus XXVII",
        radius: 9000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Ymir, Saturn XIX",
        radius: 9000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Trinculo, Uranus XXI",
        radius: 9000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Uranus",
        discovery: NaN,
    },
    {
        name: "Eros, 433",
        radius: 8420, // m
        volume: NaN, // m^3
        mass: 6687000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S",
        discovery: NaN,
    },
    {
        name: "Adrastea, Jupiter XV",
        radius: 8200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Kiviuq, Saturn XXIV",
        radius: 8000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Tarvos, Saturn XXI",
        radius: 7500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Kerberos, Pluto IV",
        radius: 6333, // m
        volume: NaN, // m^3
        mass: 16000000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Pluto",
        discovery: NaN,
    },
    {
        name: "Gaspra, 951",
        radius: 6266, // m
        volume: NaN, // m^3
        mass: 20, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Deimos, Mars II",
        radius: 6200, // m
        volume: NaN, // m^3
        mass: 1476000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Mars",
        discovery: NaN,
    },
    {
        name: "Skamandrios, Hektor I",
        radius: 6000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 624 Hektor",
        discovery: NaN,
    },
    {
        name: "Ijiraq, Saturn XXII",
        radius: 6000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Halley's Comet 1P",
        radius: 5750, // m
        volume: NaN, // m^3
        mass: 220000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "comet",
        discovery: NaN,
    },
    {
        name: "Styx, Pluto V",
        radius: 5500, // m
        volume: NaN, // m^3
        mass: 7650000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Pluto",
        discovery: NaN,
    },
    {
        name: "Romulus, Sylvia I",
        radius: 5400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 87 Sylvia",
        discovery: NaN,
    },
    {
        name: "Masursky, 2685",
        radius: 5372, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Erriapus, Saturn XXVIII",
        radius: 5000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Callirrhoe, Jupiter XVII",
        radius: 4800, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Alexhelios, Kleopatra I",
        radius: 4450, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 216 Kleopatra",
        discovery: NaN,
    },
    {
        name: "Esclangona, 1509",
        radius: 4085, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "inner belt asteroid type S; binary",
        discovery: NaN,
    },
    {
        name: "Themisto, Jupiter XVIII",
        radius: 4000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Daphnis, Saturn XXXV",
        radius: 3800, // m
        volume: NaN, // m^3
        mass: 77000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Petit-Prince, Eugenia I",
        radius: 3500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 45 Eugenia",
        discovery: NaN,
    },
    {
        name: "Praxidike, Jupiter XXVII",
        radius: 3500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Bestla, Saturn XXXIX",
        radius: 3500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Remus, Sylvia II",
        radius: 3500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 87 Sylvia",
        discovery: NaN,
    },
    {
        name: "Kalyke, Jupiter XXIII",
        radius: 3450, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Jupiter",
        discovery: NaN,
    },
    {
        name: "Cleoselene, Kleopatra II",
        radius: 3450, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 216 Kleopatra",
        discovery: NaN,
    },
    {
        name: "S/2019 (31) 1, Euphrosyne I",
        radius: 3350, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 31 Euphrosyne",
        discovery: NaN,
    },
    {
        name: "Tempel 1 9P",
        radius: 3000, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter-family comet; Deep Impact flyby and impacted",
        discovery: NaN,
    },
    {
        name: "Phaethon, 3200",
        radius: 2900, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type F",
        discovery: NaN,
    },
    {
        name: "JM8, 53319",
        radius: 2700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type X",
        discovery: 1999,
    },
    {
        name: "Borrelly 19P",
        radius: 2660, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter-family comet",
        discovery: NaN,
    },
    {
        name: "Šteins, 2867",
        radius: 2580, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type E",
        discovery: NaN,
    },
    {
        name: "Atira, 163693",
        radius: 2400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Atira asteroid type S; binary",
        discovery: NaN,
    },
    {
        name: "Annefrank, 5535",
        radius: 2400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Balam, 3749",
        radius: 2332, // m
        volume: NaN, // m^3
        mass: 510000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S; trinary",
        discovery: NaN,
    },
    {
        name: "Pallene, Saturn XXXIII",
        radius: 2220, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "Florence, 3122",
        radius: 2201, // m
        volume: NaN, // m^3
        mass: 79000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S; trinary",
        discovery: NaN,
    },
    {
        name: "Wild 2 81P",
        radius: 2133, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter family comet",
        discovery: NaN,
    },
    {
        name: "Litva, 2577",
        radius: 2115, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Mars-crosser type EU; trinary",
        discovery: NaN,
    },
    {
        name: "Churyumov–Gerasimenko 67P",
        radius: 2000, // m
        volume: NaN, // m^3
        mass: 9980000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter-family comet",
        discovery: NaN,
    },
    {
        name: "Donaldjohanson, 52246",
        radius: 1948, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type C",
        discovery: NaN,
    },
    {
        name: "Cuno, 4183",
        radius: 1826, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S/type Q",
        discovery: NaN,
    },
    {
        name: "DA, 6178",
        radius: 1575, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type M",
        discovery: 1986,
    },
    {
        name: "Pichi üñëm, Alauda I",
        radius: 1550, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 702 Alauda",
        discovery: NaN,
    },
    {
        name: "Toutatis, 4179",
        radius: 1516, // m
        volume: NaN, // m^3
        mass: 50500000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Methone, Saturn XXXII",
        radius: 1450, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "QE2, 285263",
        radius: 1375, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S; binary",
        discovery: 1998,
    },
    {
        name: "Polydeuces, Saturn XXXIV",
        radius: 1300, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn; Dione trojan (L5)",
        discovery: NaN,
    },
    {
        name: "SN263, 153591",
        radius: 1315, // m
        volume: NaN, // m^3
        mass: 9510000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type C; trinary",
        discovery: 2001,
    },
    {
        name: "S/2003 (1509) 1, Esclangona I",
        radius: 1285, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 1509 Esclangona",
        discovery: NaN,
    },
    {
        name: "APL, 132524",
        radius: 1250, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "belt asteroid type S",
        discovery: NaN,
    },
    {
        name: "Camillo, 3752",
        radius: 1153, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Cruithne, 3753",
        radius: 1036, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type Q; quasi-satellite of Earth",
        discovery: NaN,
    },
    {
        name: "Ra-Shalom, 2100",
        radius: 990, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type C",
        discovery: NaN,
    },
    {
        name: "Geographos, 1620",
        radius: 980, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Midas, 1981",
        radius: 975, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Mithra, 4486",
        radius: 924.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "OH, 12538",
        radius: 831.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 1998,
    },
    {
        name: "Tantalus, 2102",
        radius: 824.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Q",
        discovery: NaN,
    },
    {
        name: "Braille, 9969",
        radius: 820, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Mars-crosser type Q",
        discovery: NaN,
    },
    {
        name: "GO21, 308242",
        radius: 780, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type S",
        discovery: 2005,
    },
    {
        name: "Apollo, 1862",
        radius: 750, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Q",
        discovery: NaN,
    },
    {
        name: "JD6, 85989",
        radius: 731, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type K; contact binary",
        discovery: 1999,
    },
    {
        name: "Icarus, 1566",
        radius: 730, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Dactyl, Ida I",
        radius: 700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 243 Ida",
        discovery: NaN,
    },
    {
        name: "Castalia, 4769",
        radius: 700, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S; contact binary",
        discovery: NaN,
    },
    {
        name: "PA8, 214869",
        radius: 675, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Q",
        discovery: 2007,
    },
    {
        name: "Moshup, 66391",
        radius: 658.5, // m
        volume: NaN, // m^3
        mass: 2490000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type S; binary",
        discovery: NaN,
    },
    {
        name: "DA, 29075",
        radius: 653, // m
        volume: NaN, // m^3
        mass: 2000000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 1950,
    },
    {
        name: "HY51, 394130",
        radius: 609, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2006,
    },
    {
        name: "Hartley 2 103P",
        radius: 570, // m
        volume: NaN, // m^3
        mass: 300000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Jupiter-family comet",
        discovery: NaN,
    },
    {
        name: "SD220, 163899",
        radius: 515, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type S",
        discovery: 2003,
    },
    {
        name: "Nyx, 3908",
        radius: 500, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type V",
        discovery: NaN,
    },
    {
        name: "WN5, 153814",
        radius: 466, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2001,
    },
    {
        name: "YE5",
        radius: 450, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S; binary",
        discovery: 2017,
    },
    {
        name: "Ryugu, 162173",
        radius: 432.5, // m
        volume: NaN, // m^3
        mass: 450000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Cg",
        discovery: NaN,
    },
    {
        name: "AE12, 162058",
        radius: 423.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S",
        discovery: 1997,
    },
    {
        name: "JO25",
        radius: 409, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S; contact binary",
        discovery: 2014,
    },
    {
        name: "Hermes, 69230",
        radius: 400, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Sq",
        discovery: NaN,
    },
    {
        name: "Didymos, 65803",
        radius: 390, // m
        volume: NaN, // m^3
        mass: 527000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Xk; binary",
        discovery: NaN,
    },
    {
        name: "Aten, 2062",
        radius: 365, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type S",
        discovery: NaN,
    },
    {
        name: "Aegaeon Saturn LIII",
        radius: 330, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "TB145",
        radius: 325, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 2015,
    },
    {
        name: "CC, 136617",
        radius: 310, // m
        volume: NaN, // m^3
        mass: 266000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Sq; trinary",
        discovery: 1994,
    },
    {
        name: "WR1, 172034",
        radius: 315.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Amor asteroid type S",
        discovery: 2001,
    },
    {
        name: "Golevka, 6489",
        radius: 265, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Q",
        discovery: NaN,
    },
    {
        name: "Bennu, 101955",
        radius: 262.5, // m
        volume: NaN, // m^3
        mass: 78000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type B",
        discovery: NaN,
    },
    {
        name: "WO107, 153201",
        radius: 255, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type X",
        discovery: 2000,
    },
    {
        name: "CU11, 163132",
        radius: 230, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2002,
    },
    {
        name: "Squannit 1999 KW4 I",
        radius: 225.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 66391 Moshup",
        discovery: NaN,
    },
    {
        name: "HQ124",
        radius: 204.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type S",
        discovery: 2014,
    },
    {
        name: "YP139",
        radius: 201, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2013,
    },
    {
        name: "EV5, 341843",
        radius: 200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type X/type C",
        discovery: 2008,
    },
    {
        name: "DP14, 388188",
        radius: 200, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S; contact binary",
        discovery: 2006,
    },
    {
        name: "EG, 6037",
        radius: 199.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 1988,
    },
    {
        name: "TK7",
        radius: 189.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid; Earth trojan (L4)",
        discovery: 2010,
    },
    {
        name: "SU49, 292220",
        radius: 188.5, // m
        volume: NaN, // m^3
        mass: 73000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2006,
    },
    {
        name: "YU55, 308635",
        radius: 180, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type C",
        discovery: 2005,
    },
    {
        name: "SO16",
        radius: 178.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid; co-orbital with Earth",
        discovery: 2010,
    },
    {
        name: "Itokawa, 25143",
        radius: 173, // m
        volume: NaN, // m^3
        mass: 35100000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Apophis, 99942",
        radius: 162.5, // m
        volume: NaN, // m^3
        mass: 61000000000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type Sq",
        discovery: NaN,
    },
    {
        name: "S/2009 S, 1",
        radius: 150, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "moon of Saturn",
        discovery: NaN,
    },
    {
        name: "WK4",
        radius: 142, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 2005,
    },
    {
        name: "BL86, 357439",
        radius: 131.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type V; binary",
        discovery: 2004,
    },
    {
        name: "TU24",
        radius: 125, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 2007,
    },
    {
        name: "VE68",
        radius: 118, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type X; co-orbital with Venus",
        discovery: 2002,
    },
    {
        name: "UW158, 436724",
        radius: 110, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 2011,
    },
    {
        name: "Dimorphos, Didymos I",
        radius: 85, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "asteroid moon of 65803 Didymos",
        discovery: NaN,
    },
    {
        name: "BQ6",
        radius: 78, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: 2017,
    },
    {
        name: "YORP, 54509",
        radius: 61.8, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S",
        discovery: NaN,
    },
    {
        name: "Kamoʻoalewa, 469219",
        radius: 41, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type S; quasi-satellite of Earth",
        discovery: NaN,
    },
    {
        name: "Duende, 367943",
        radius: 23.75, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Aten asteroid type L",
        discovery: NaN,
    },
    {
        name: "KY26",
        radius: 15, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type X",
        discovery: 1998,
    },
    {
        name: "TC4",
        radius: 11.5, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type E/type Xe",
        discovery: 2012,
    },
    {
        name: "RC",
        radius: 11, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type Sq",
        discovery: 2014,
    },
    {
        name: "RF12",
        radius: 3.5, // m
        volume: NaN, // m^3
        mass: 500000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2010,
    },
    {
        name: "MD",
        radius: 3, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid/Amor asteroid type S",
        discovery: 2011,
    },
    {
        name: "TC3",
        radius: 2.05, // m
        volume: NaN, // m^3
        mass: 80000, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid type F/type M",
        discovery: 2008,
    },
    {
        name: "TS26",
        radius: 0.49, // m
        volume: NaN, // m^3
        mass: NaN, // kg
        area: NaN, // m^2
        density: NaN, // kg/m^3
        gravity: NaN, // m/s^2
        description: "Apollo asteroid",
        discovery: 2008,
    },
]



module.exports = {
    solar_system,
    solar_system_units
}