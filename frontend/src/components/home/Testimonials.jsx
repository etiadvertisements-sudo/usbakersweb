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
    <section data-testid="testimonials" className="bg-sand px-6 py-24 md:px-12 md:py-40 lg:px-24">
      <Reveal>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-rose">
          Kind Words
        </p>
        <h2 className="mx-auto max-w-3xl text-center font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Loved by families across the city.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {QUOTES.map((q, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div className="flex h-full flex-col">
              <p className="font-serif text-2xl italic leading-snug text-ink">“{q.quote}”</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-ink">{q.name}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-clay/60">{q.tag}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
