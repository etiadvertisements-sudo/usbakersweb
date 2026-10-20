import { Flame, Egg, IndianRupee, Heart } from "lucide-react";
import { Reveal } from "../Motion";

const PROPS = [
  { icon: Flame, title: "Freshly Baked Daily", desc: "From our ovens to your table, every single morning." },
  { icon: Egg, title: "100% Eggless Options", desc: "Eggless variants available across our entire menu." },
  { icon: IndianRupee, title: "Honestly Priced", desc: "Premium ingredients at fair, transparent prices." },
  { icon: Heart, title: "Baked with Love", desc: "Handcrafted recipes perfected over years in Pathankot." },
];

export default function ValueProps() {
  return (
    <section data-testid="value-props" className="bg-white px-6 py-20 md:px-12 lg:px-24">
      <Reveal>
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — Why US Bakers? —
        </h2>
        <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>
      </Reveal>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PROPS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-light text-mint-dark">
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-clay">{p.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
