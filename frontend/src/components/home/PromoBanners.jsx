import { Link } from "react-router-dom";
import { ArrowRight, Cake, Gift, Croissant } from "lucide-react";
import { Reveal } from "../Motion";

const BANNERS = [
  {
    id: "custom",
    icon: Cake,
    title: "Custom Cake Orders",
    desc: "Birthdays, weddings, anniversaries — dream it and we'll bake it. Book yours today.",
    cta: "Design your cake",
    to: "/custom-order",
    bg: "bg-rose",
    text: "text-white",
    span: "md:col-span-2",
  },
  {
    id: "combos",
    icon: Gift,
    title: "Gift Hampers",
    desc: "Curated boxes of brownies, cookies & chocolates. 15% off with COMBO15.",
    cta: "Shop gifting",
    to: "/shop/gifting",
    bg: "bg-mint-dark",
    text: "text-white",
    span: "",
  },
  {
    id: "fresh",
    icon: Croissant,
    title: "Fresh Savouries",
    desc: "Croissants, danishes & puffs baked fresh daily from 8 AM.",
    cta: "Grab a bite",
    to: "/shop/savouries",
    bg: "bg-sand",
    text: "text-ink",
    span: "",
  },
];

export default function PromoBanners() {
  return (
    <section data-testid="promo-banners" className="px-6 py-16 md:px-12 lg:px-24">
      <div className="grid gap-5 md:grid-cols-3">
        {BANNERS.map((b, i) => {
          const Icon = b.icon;
          return (
            <Reveal key={b.id} delay={i * 0.1}>
              <Link
                to={b.to}
                data-testid={`promo-banner-${b.id}`}
                className={`group flex h-full flex-col justify-between rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl ${b.bg} ${b.text} ${b.span}`}
              >
                <div>
                  <Icon size={28} className={b.id === "fresh" ? "text-gold" : "text-white/85"} />
                  <h3 className="mt-5 font-serif text-2xl leading-tight md:text-3xl">{b.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${b.id === "fresh" ? "text-clay" : "opacity-75"}`}>{b.desc}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  {b.cta} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
