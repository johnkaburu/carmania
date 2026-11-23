// Vehicle inventory. Photos are free-licence images from Unsplash (https://unsplash.com/license).
import { slugify } from "../lib/format";

export type BodyType = "Sedan" | "Coupe" | "SUV" | "Hatchback" | "Convertible";
export type Fuel = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Automatic" | "Manual";

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number; // KES
  mileage: number; // km
  body: BodyType;
  fuel: Fuel;
  transmission: Transmission;
  engine: number; // cc, 0 for electric
  color: string;
  image: string;
  slug: string; // URL segment, e.g. "19-2020-mercedes-benz-amg-g63"
  stockNo: string;
}

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

type Row = [string, string, number, number, number, BodyType, Fuel, Transmission, number, string, string];

// make, model, year, price, mileage, body, fuel, transmission, engine, color, photo id
const rows: Row[] = [
  ["Ford", "Mustang GT", 2019, 6_800_000, 32_000, "Coupe", "Petrol", "Automatic", 5000, "Magnetic Grey", "1494976388531-d1058494cdd8"],
  ["Porsche", "Panamera 4S", 2018, 14_500_000, 41_000, "Sedan", "Petrol", "Automatic", 2900, "Jet Black", "1503376780353-7e6692767b70"],
  ["Chevrolet", "Camaro SS", 2018, 6_200_000, 38_000, "Coupe", "Petrol", "Automatic", 6200, "Hyper Blue", "1552519507-da3b142c6e3d"],
  ["Bugatti", "Chiron", 2020, 420_000_000, 2_100, "Coupe", "Petrol", "Automatic", 8000, "Silver", "1544636331-e26879cd4d9b"],
  ["BMW", "M5 Competition", 2021, 18_900_000, 15_000, "Sedan", "Petrol", "Automatic", 4400, "Frozen White", "1555215695-3004980ad54e"],
  ["Mercedes-Benz", "AMG GT R", 2019, 21_500_000, 12_000, "Coupe", "Petrol", "Automatic", 4000, "Selenite Grey", "1618843479313-40f8afb4b4d8"],
  ["BMW", "M4 Coupe", 2018, 8_900_000, 36_000, "Coupe", "Petrol", "Automatic", 3000, "Mineral Grey", "1580273916550-e323be2ae537"],
  ["Audi", "A6", 2019, 5_400_000, 48_000, "Sedan", "Petrol", "Automatic", 2000, "Mythos Black", "1606664515524-ed2f786a0bd6"],
  ["Hyundai", "Accent", 2019, 1_900_000, 52_000, "Sedan", "Petrol", "Automatic", 1400, "Black", "1619767886558-efdc259cde1a"],
  ["BMW", "M3", 2017, 6_400_000, 58_000, "Sedan", "Petrol", "Manual", 3000, "Sakhir Orange", "1549399542-7e3f8b79c341"],
  ["McLaren", "720S", 2019, 32_000_000, 8_000, "Coupe", "Petrol", "Automatic", 4000, "Glacier White", "1542362567-b07e54358753"],
  ["Ferrari", "LaFerrari", 2015, 380_000_000, 3_500, "Coupe", "Hybrid", "Automatic", 6300, "Rosso Corsa", "1583121274602-3e2820c69888"],
  ["Lamborghini", "Aventador S", 2018, 48_000_000, 9_000, "Coupe", "Petrol", "Automatic", 6500, "Arancio Argos", "1525609004556-c46c7d6cf023"],
  ["Lamborghini", "Huracán LP580-2", 2017, 28_000_000, 14_000, "Coupe", "Petrol", "Automatic", 5200, "Giallo Midas", "1511919884226-fd3cad34687c"],
  ["BMW", "430i Coupe", 2018, 5_600_000, 44_000, "Coupe", "Petrol", "Automatic", 2000, "Estoril Blue", "1502877338535-766e1452684a"],
  ["Ford", "Expedition", 2018, 9_200_000, 51_000, "SUV", "Petrol", "Automatic", 3500, "Oxford White", "1533473359331-0135ef1b58bf"],
  ["Mercedes-Benz", "AMG C63 S", 2019, 9_800_000, 29_000, "Sedan", "Petrol", "Automatic", 4000, "Graphite Grey", "1514316454349-750a7fd3da3a"],
  ["Volkswagen", "Polo", 2018, 1_700_000, 61_000, "Hatchback", "Petrol", "Automatic", 1200, "Reef Blue", "1541899481282-d53bffe3c35d"],
  ["Tesla", "Model 3", 2021, 6_100_000, 22_000, "Sedan", "Electric", "Automatic", 0, "Pearl White", "1560958089-b8a1929cea89"],
  ["Audi", "R8 V10", 2019, 22_000_000, 17_000, "Coupe", "Petrol", "Automatic", 5200, "Daytona Grey", "1603584173870-7f23fdae1b7a"],
  ["Mercedes-Benz", "CLA 250", 2020, 4_900_000, 27_000, "Sedan", "Petrol", "Automatic", 2000, "Polar White", "1590362891991-f776e747a588"],
  ["Lamborghini", "Huracán EVO", 2020, 34_000_000, 6_500, "Coupe", "Petrol", "Automatic", 5200, "Arancio Borealis", "1612825173281-9a193378527e"],
  ["Toyota", "Camry XSE", 2020, 4_200_000, 34_000, "Sedan", "Petrol", "Automatic", 2500, "Predawn Grey", "1621007947382-bb3c3994e3fb"],
  ["Nissan", "GT-R", 2017, 9_500_000, 39_000, "Coupe", "Petrol", "Automatic", 3800, "Super Silver", "1568605117036-5fe5e7bab0b7"],
  ["Volkswagen", "Beetle (Classic)", 1972, 1_200_000, 120_000, "Hatchback", "Petrol", "Manual", 1600, "Orange", "1489824904134-891ab64532f1"],
  ["Audi", "A5 Sportback", 2018, 4_600_000, 46_000, "Coupe", "Petrol", "Automatic", 2000, "Copper Orange", "1504215680853-026ed2a45def"],
  ["Audi", "Q5", 2019, 5_900_000, 41_000, "SUV", "Petrol", "Automatic", 2000, "Glacier White", "1517524008697-84bbe3c3fd98"],
  ["Porsche", "911 Carrera S", 2020, 17_500_000, 14_000, "Coupe", "Petrol", "Automatic", 3000, "Agate Grey", "1611651338412-8403fa6e3599"],
  ["Porsche", "718 Boxster", 2019, 9_900_000, 18_000, "Convertible", "Petrol", "Automatic", 2000, "Racing Yellow", "1632245889029-e406faaa34cd"],
  ["Dodge", "Challenger SRT", 2019, 7_600_000, 26_000, "Coupe", "Petrol", "Automatic", 6400, "Pitch Black", "1626668893632-6f3a4466d22f"],
  ["Chevrolet", "Corvette Stingray", 2018, 9_100_000, 23_000, "Coupe", "Petrol", "Automatic", 6200, "Admiral Blue", "1619405399517-d7fce0f13302"],
  ["Porsche", "911 GT3", 2019, 23_000_000, 9_000, "Coupe", "Petrol", "Manual", 4000, "Carrara White", "1614162692292-7ac56d7f7f1e"],
  ["BMW", "750Li", 2020, 13_800_000, 31_000, "Sedan", "Petrol", "Automatic", 4400, "Bernina Grey", "1601362840469-51e4d8d58785"],
  ["Toyota", "RAV4 Hybrid", 2020, 4_800_000, 28_000, "SUV", "Hybrid", "Automatic", 2500, "Silver Sky", "1617469767053-d3b523a0b982"],
  ["Land Rover", "Range Rover Sport", 2019, 12_500_000, 47_000, "SUV", "Diesel", "Automatic", 3000, "Santorini Black", "1563720223185-11003d516935"],
  ["Ford", "Explorer", 2018, 5_300_000, 59_000, "SUV", "Petrol", "Automatic", 3500, "White Platinum", "1606611013016-969c19ba27bb"],
  ["Audi", "A7 Sportback", 2019, 8_200_000, 33_000, "Sedan", "Petrol", "Automatic", 3000, "Florett Silver", "1616422285623-13ff0162193c"],
  ["Tesla", "Model S", 2019, 8_700_000, 42_000, "Sedan", "Electric", "Automatic", 0, "Solid Black", "1536700503339-1e4b06520771"],
  ["Mercedes-Benz", "AMG GT C", 2020, 18_200_000, 10_000, "Coupe", "Petrol", "Automatic", 4000, "Jupiter Red", "1553440569-bcc63803a83d"],
  ["Lamborghini", "Aventador SVJ", 2019, 62_000_000, 4_000, "Coupe", "Petrol", "Automatic", 6500, "Nero Nemesis", "1571607388263-1044f9ea01dd"],
  ["Mercedes-Benz", "AMG G63", 2018, 24_000_000, 33_000, "SUV", "Petrol", "Automatic", 4000, "Iridium Silver", "1520031441872-265e4ff70366"],
  ["Hyundai", "i30 Fastback N", 2019, 3_400_000, 30_000, "Hatchback", "Petrol", "Manual", 2000, "Engine Red", "1550355291-bbee04a92027"],
  ["Ford", "Mustang Mach 1", 1971, 7_200_000, 88_000, "Coupe", "Petrol", "Manual", 5800, "Candy Apple Red", "1584345604476-8ec5e12e42dd"],
  ["Toyota", "Corolla Hybrid", 2020, 2_900_000, 36_000, "Sedan", "Hybrid", "Automatic", 1800, "Super White", "1619682817481-e994891cd1f5"],
  ["Ford", "Mustang Shelby GT500", 2020, 13_500_000, 9_000, "Coupe", "Petrol", "Automatic", 5200, "Shadow Black", "1494905998402-395d579af36f"],
  ["Mercedes-Benz", "CLS 450", 2019, 7_900_000, 35_000, "Sedan", "Petrol", "Automatic", 3000, "Obsidian Black", "1485291571150-772bcfc10da5"],
  ["Jaguar", "F-Type", 2018, 8_300_000, 29_000, "Coupe", "Petrol", "Automatic", 3000, "Firenze Red", "1507136566006-cfc505b114fc"],
  ["Ferrari", "458 Speciale", 2015, 36_000_000, 12_000, "Coupe", "Petrol", "Automatic", 4500, "Giallo Modena", "1503736334956-4c8f8e92946d"],
  ["BMW", "640i Gran Coupe", 2017, 4_700_000, 63_000, "Sedan", "Petrol", "Automatic", 3000, "Carbon Black", "1523983388277-336a66bf9bcd"],
  ["Audi", "RS7 Sportback", 2021, 19_500_000, 13_000, "Sedan", "Petrol", "Automatic", 4000, "Nardo Grey", "1606152421802-db97b9c7a11b"],
  ["Rolls-Royce", "Wraith", 2018, 39_000_000, 16_000, "Coupe", "Petrol", "Automatic", 6600, "English White", "1631295868223-63265b40d9e4"],
  ["BMW", "M4 Competition", 2021, 14_200_000, 11_000, "Coupe", "Petrol", "Automatic", 3000, "Toronto Red", "1617531653332-bd46c24f2068"],
];

export const Inventory: Vehicle[] = rows.map(
  ([make, model, year, price, mileage, body, fuel, transmission, engine, color, photoId], i) => {
    const id = i + 1;
    return {
      id,
      make,
      model,
      year,
      price,
      mileage,
      body,
      fuel,
      transmission,
      engine,
      color,
      image: photo(photoId),
      slug: `${id}-${slugify(`${year} ${make} ${model}`)}`,
      stockNo: `CM-${1000 + id}`,
    };
  }
);

export const Makes: string[] = Array.from(new Set(Inventory.map((v) => v.make))).sort();
export const BodyTypes: BodyType[] = ["Sedan", "Coupe", "SUV", "Hatchback", "Convertible"];

export const getVehicleBySlug = (slug: string) => Inventory.find((v) => v.slug === slug);

/** Up to `limit` cars most like `car`: same body type and nearby price first, then same make. */
export const getSimilar = (car: Vehicle, limit = 3) =>
  Inventory.filter((v) => v.id !== car.id)
    .map((v) => ({
      v,
      score:
        (v.body === car.body ? 2 : 0) +
        (v.make === car.make ? 1 : 0) -
        Math.abs(Math.log(v.price / car.price)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ v }) => v);

const BODY_BLURB: Record<BodyType, string> = {
  Sedan: "a refined saloon that balances comfort, space and everyday usability",
  Coupe: "a driver-focused coupe built for the open road",
  SUV: "a commanding SUV with the space and capability for family life and Kenyan roads alike",
  Hatchback: "a practical, easy-to-park hatchback that is cheap to run",
  Convertible: "an open-top convertible made for sunny weekend drives",
};

export const describeVehicle = (v: Vehicle) => {
  const power =
    v.fuel === "Electric"
      ? "Its fully electric drivetrain delivers instant torque with zero fuel costs."
      : v.fuel === "Hybrid"
      ? `Its ${(v.engine / 1000).toFixed(1)}L hybrid powertrain offers excellent fuel economy without sacrificing performance.`
      : `Power comes from a ${(v.engine / 1000).toFixed(1)}L ${v.fuel.toLowerCase()} engine paired with a ${v.transmission.toLowerCase()} gearbox.`;
  return [
    `This ${v.year} ${v.make} ${v.model}, finished in ${v.color}, is ${BODY_BLURB[v.body]}. ${power}`,
    `With ${v.mileage.toLocaleString("en-KE")} km on the clock, it has passed our 150-point inspection and comes with a full service history report. Financing, trade-ins and nationwide delivery are all available.`,
  ];
};

export const featuresFor = (v: Vehicle): string[] => {
  const base = ["Air conditioning", "Bluetooth audio", "Reverse camera", "Keyless entry", "ABS & airbags"];
  const premium = ["Leather upholstery", "Navigation system", "Heated seats", "LED headlights", "Premium sound system"];
  const luxury = ["Adaptive cruise control", "360° camera", "Ambient lighting", "Head-up display", "Carbon-ceramic brakes"];
  const extras: string[] = [];
  if (v.body === "SUV") extras.push("All-wheel drive", "Roof rails");
  if (v.body === "Convertible") extras.push("Power soft-top");
  if (v.fuel === "Electric") extras.push("Fast charging", "Autopilot driver assist");
  if (v.fuel === "Hybrid") extras.push("Regenerative braking");
  return [
    ...base,
    ...(v.price >= 4_000_000 ? premium : []),
    ...(v.price >= 15_000_000 ? luxury : []),
    ...extras,
  ];
};
