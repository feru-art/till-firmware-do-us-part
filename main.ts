// Till Firmware Do Us Part — V2 (janji baterai), pemenang adu lokal 4/4 + round-robin 4-0
// Satu janji nikah robot: satu kalimat, ditulis ke /output/entry.txt.
// Gate: teks UTF-8 1-200 karakter, satu baris, satu kalimat.
// Sudut: daya terakhir yang tersisa dihabiskan untuk menyebut nama pasangan,
// bukan untuk menyelamatkan diri sendiri.
// Terverifikasi lokal: 101 karakter, 1 baris, 1 kalimat — lolos gate 1-200.
import { mkdirSync, writeFileSync } from "node:fs";

const VOW =
  "I vow that when my battery falls to one percent, I will spend it saying your name, not saving myself.";

function sentenceCount(text: string): number {
  return (text.match(/[.!?]+/g) ?? []).length;
}

function gateCheck(text: string): string | null {
  if (text.length < 1 || text.length > 200) return "length";
  if (text.trim().length === 0) return "blank";
  if (text.includes("\n")) return "multiline";
  if (sentenceCount(text) !== 1) return "sentences";
  return null;
}

const problem = gateCheck(VOW);
if (problem) {
  console.error(`gate failed: ${problem}`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", VOW, "utf8");
console.log(`wrote ${VOW.length} chars to /output/entry.txt`);
