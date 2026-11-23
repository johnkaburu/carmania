export const formatKes = (n: number) => `KSh ${Math.round(n).toLocaleString("en-KE")}`;

export const formatKm = (n: number) => `${n.toLocaleString("en-KE")} km`;

export const formatEngine = (cc: number) => (cc ? `${(cc / 1000).toFixed(1)}L` : "Electric");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents (Huracán → huracan)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Standard amortised loan repayment. */
export const monthlyPayment = (principal: number, annualRatePct: number, months: number) => {
  if (principal <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
};

export const SITE = {
  name: "CarMania",
  phone: "+254 700 000 000",
  phoneHref: "tel:+254700000000",
  whatsapp: "254700000000",
  email: "sales@carmania.co.ke",
  address: "Mombasa Road, Nairobi",
  hours: "Mon – Sat, 8am – 6pm",
};
