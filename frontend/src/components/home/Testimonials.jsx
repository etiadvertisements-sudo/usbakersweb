import { Star } from "lucide-react";
import { Reveal } from "../Motion";

const QUOTES = [
  {
    quote:
      "The wedding cake was beyond anything we imagined. Every guest asked where it was from. Truly the best bakery in Pathankot.",
    name: "Simran & Arjun",
    tag: "Wedding, 2024",
  },
  {
    quote:
      "I ordered a custom cake for my daughter's first birthday and cried when I saw it. The detail, the taste — perfection.",
    name: "Neha Kapoor",
    tag: "Custom Birthday Cake",
  },
  {
    quote:
      "Their gift hampers are our go-to for every occasion. Beautifully presented and always fresh. US Bakers never disappoints.",
    name: "Rahul Mehta",
    tag: "Gift Hampers",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials" className="bg-mint-light px-6 py-20 md:px-12 lg:px-24">
      <Reveal>
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — Loved by many, and still counting —
        </h2>
        <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="flex gap-1 text-gold-light">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-ink">“{q.quote}”</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-ink">{q.name}</p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.15em] text-rose">{q.tag}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
