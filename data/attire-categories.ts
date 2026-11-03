import type { AttireCategory } from "@/types/attire";

export const defaultAttireCategories: AttireCategory[] = [
  {
    id: "parents-male",
    title: "Father of the Bride & Groom",
    description:
      "Light gray formal suit with white dress shirt, black tie, pocket square, and black leather shoes.",
    palette: ["#c8c8c8", "#9e9e9e", "#374151", "#ffffff"],
    imageSrc: "/attire/parents_male.jpg",
    imageAlt: "Father of the Bride and Groom attire",
  },
  {
    id: "parents-female",
    title: "Mother of the Bride & Groom",
    description:
      "Elegant silver off-shoulder floor-length gown with lace details, paired with a clutch and heels.",
    palette: ["#d4d4d4", "#b0b0b0", "#e5e5e5", "#ffffff"],
    imageSrc: "/attire/parents_female.jpg",
    imageAlt: "Mother of the Bride and Groom attire",
  },
  {
    id: "godparents-male",
    title: "Ninong (Godfather)",
    description:
      "Gray Barong Tagalog with embroidered front panels, paired with black trousers and black leather shoes.",
    palette: ["#9ca3af", "#6b7280", "#374151", "#e5e7eb"],
    imageSrc: "/attire/godparents_male.jpg",
    imageAlt: "Ninong attire",
  },
  {
    id: "godparents-female-1",
    title: "Ninang (Godmother) — Option A",
    description:
      "Gray floor-length gown with sheer illusion neckline, lace appliqué, and flutter sleeves.",
    palette: ["#9ca3af", "#6b7280", "#a3a3a3", "#e5e7eb"],
    imageSrc: "/attire/godparents_female1.jpg",
    imageAlt: "Ninang attire option A",
  },
  {
    id: "godparents-female-2",
    title: "Ninang (Godmother) — Option B",
    description:
      "Gray Filipiniana-inspired gown with butterfly sleeves, lace details, and side-gathered draping.",
    palette: ["#9ca3af", "#6b7280", "#a3a3a3", "#e5e7eb"],
    imageSrc: "/attire/godparents_female2.jpg",
    imageAlt: "Ninang attire option B",
  },
  {
    id: "groomsmen",
    title: "Groomsmen",
    description:
      "Dusty blue vest with matching tie and trousers, white long-sleeve dress shirt, and black shoes.",
    palette: ["#6b8db5", "#7a9eb8", "#ffffff", "#374151"],
    imageSrc: "/attire/groomsmen.jpg",
    imageAlt: "Groomsmen attire",
  },
  {
    id: "bridesmaids",
    title: "Bridesmaids",
    description:
      "Dusty blue floor-length halter-neck tulle gown with a flowing skirt.",
    palette: ["#a8bfd4", "#7a9eb8", "#eaf3fb", "#ffffff"],
    imageSrc: "/attire/bridesmaid.jpg",
    imageAlt: "Bridesmaids attire",
  },
  {
    id: "flower-girl",
    title: "Flower Girl",
    description:
      "Blue tulle ball gown with beaded neckline, ribbon bow at the waist, floral crown, and a flower basket.",
    palette: ["#b8d4e8", "#8eb4d4", "#ffffff", "#c8a96e"],
    imageSrc: "/attire/flower_girl.jpg",
    imageAlt: "Flower girl attire",
  },
  {
    id: "bearers",
    title: "Bearers",
    description:
      "White long-sleeve shirt with dusty blue bow tie, matching suspenders, blue trousers, and black shoes.",
    palette: ["#b8d4e8", "#8eb4d4", "#ffffff", "#374151"],
    imageSrc: "/attire/bearers.jpg",
    imageAlt: "Bearers attire",
  },
  {
    id: "guests-male",
    title: "Guests (Male)",
    description:
      "Semi-formal light blue or powder blue button-down (no vest or tie set like the groomsmen) with dark trousers, leather belt, and brown loafers.",
    palette: ["#9eb8d4", "#1e3a5f", "#374151", "#8b5e34"],
    imageSrc: "/attire/guest_male_attire.jpg",
    imageAlt: "Male guest attire",
  },
  {
    id: "guests-female",
    title: "Guests (Female)",
    description:
      "Light blue or powder blue knee-length A-line dress (not floor-length or halter style like the bridesmaids), sweetheart neckline, nude heels.",
    palette: ["#9eb8d4", "#7a9eb8", "#f5f0e8", "#d4b896"],
    imageSrc: "/attire/guest_female_attire.jpg",
    imageAlt: "Female guest attire",
  },
];
