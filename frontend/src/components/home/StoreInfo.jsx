import { MapPin, Phone, Clock, Truck } from "lucide-react";
import { Reveal } from "../Motion";

export default function StoreInfo() {
  return (
    <section data-testid="store-info" className="bg-sand px-6 py-20 md:px-12 lg:px-24">
      <Reveal>
        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
          — Visit Our Store —
        </h2>
        <p className="gold-diamonds mt-3 text-center" aria-hidden="true">♦ ♦ ♦ ♦</p>
        <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-clay">
          Walk in for fresh bakes straight from the oven, or order online for doorstep delivery
          across Pathankot.
        </p>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: MapPin, t: "Address", d: "Main Bazaar, Pathankot, Punjab 145001" },
          { icon: Clock, t: "Hours", d: "Open daily, 8 AM – 10 PM" },
          { icon: Phone, t: "Call to Order", d: "+91 98765 43210" },
          { icon: Truck, t: "Delivery", d: "Doorstep delivery within Pathankot" },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-mint-light text-mint-dark">
                  <Icon size={18} />
                </span>
                <p className="mt-3 text-sm font-bold text-ink">{c.t}</p>
                <p className="mt-1 text-sm text-clay">{c.d}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
