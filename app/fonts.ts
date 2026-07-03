import { Trirong } from "next/font/google";

// Used only for the museum-placard UI (museum annotation cards + /method page) —
// deliberately NOT applied to the 2004 parody page itself.
export const trirong = Trirong({
  subsets: ["thai", "latin"],
  weight: ["400", "600"],
  variable: "--font-trirong",
  display: "swap",
});
