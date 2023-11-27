export function extractYear(str: String): number {
  const match = str.match(/20\d{2}/);
  return match ? Number(match[0]) : Number("0");
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
