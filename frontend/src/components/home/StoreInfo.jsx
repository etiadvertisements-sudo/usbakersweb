import { MapPin, Phone, Clock, Truck } from "lucide-react";
import { Reveal } from "../Motion";

export default function StoreInfo() {
  return (
    <section data-testid="store-info" className="bg-sand px-6 py-20 md:px-12 lg:px-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Visit Us</p>
          <h2 className="font-serif text-4xl tracking-tight text-ink sm:text-5xl">Our Pathankot Store</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-clay">
            Walk in for fresh bakes straight from the oven, or order online for doorstep delivery
            across Pathankot and nearby areas.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <MapPin size={20} className="text-rose" />
              <p className="mt-3 text-sm font-semibold text-ink">Address</p>
              <p className="mt-1 text-sm text-clay">Main Bazaar, Pathankot, Punjab 145001</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Clock size={20} className="text-rose" />
              <p className="mt-3 text-sm font-semibold text-ink">Hours</p>
              <p className="mt-1 text-sm text-clay">Open daily, 8 AM – 10 PM</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Phone size={20} className="text-rose" />
              <p className="mt-3 text-sm font-semibold text-ink">Call to Order</p>
              <p className="mt-1 text-sm text-clay">+91 98765 43210</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Truck size={20} className="text-rose" />
              <p className="mt-3 text-sm font-semibold text-ink">Delivery</p>
              <p className="mt-1 text-sm text-clay">Doorstep delivery within Pathankot city</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
