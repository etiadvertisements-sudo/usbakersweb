import Marquee from "react-fast-marquee";

const WORDS = [
  "Crafted in Pathankot",
  "Custom Celebrations",
  "Birthday Cakes",
  "Wedding Tiers",
  "Anniversary Roses",
  "Gift Hampers",
];

export default function EditorialMarquee() {
  return (
    <section data-testid="marquee" className="border-y border-border bg-sand py-6">
      <Marquee speed={40} gradient={false} autoFill>
        {WORDS.map((w, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="font-serif text-3xl italic text-ink md:text-4xl">{w}</span>
            <span className="h-2 w-2 rounded-full bg-rose" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
