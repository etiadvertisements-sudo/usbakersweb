import { Reveal } from "../Motion";

const CHAPTERS = [
  {
    no: "01",
    title: "The Craft",
    body: "Every cake begins by hand. No shortcuts, no moulds — just skilled bakers piping, layering and sculpting each creation to order.",
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  },
  {
    no: "02",
    title: "The Ingredients",
    body: "Real butter, fresh cream, seasonal fruit and Belgian chocolate. We source with intent so every bite tastes as beautiful as it looks.",
    img: "https://images.unsplash.com/photo-1603532553059-3facb851d937?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  },
  {
    no: "03",
    title: "The Occasion",
    body: "From first birthdays to golden anniversaries, we design around your story — because the cake should feel as personal as the moment.",
    img: "https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function Manifesto() {
  return (
    <section data-testid="manifesto" className="px-6 py-24 md:px-12 md:py-40 lg:px-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Our Philosophy</p>
        <h2 className="max-w-3xl font-serif text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Three things we never compromise on.
        </h2>
      </Reveal>

      <div className="mt-20 space-y-24 md:space-y-32">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.no}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal y={60}>
              <div className="overflow-hidden rounded-sm">
                <img src={c.img} alt={c.title} loading="lazy" className="aspect-[5/4] w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="font-serif text-7xl text-rose-soft md:text-8xl">{c.no}</span>
              <h3 className="mt-2 font-serif text-3xl text-ink md:text-4xl">{c.title}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-clay">{c.body}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
