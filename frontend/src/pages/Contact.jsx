import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { createContact } from "../lib/api";
import { Reveal } from "../components/Motion";

const field =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-clay/60 focus:border-rose focus:outline-none focus:ring-1 focus:ring-rose transition-colors";

const INFO = [
  { icon: MapPin, title: "Visit Us", lines: ["Main Bazaar, Pathankot", "Punjab 145001"] },
  { icon: Phone, title: "Call Us", lines: ["+91 98765 43210"] },
  { icon: Mail, title: "Email Us", lines: ["hello@usbakers.in"] },
  { icon: Clock, title: "Open Hours", lines: ["Daily · 8 AM – 10 PM"] },
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General enquiry", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in your name, phone and message.");
      return;
    }
    setSubmitting(true);
    try {
      await createContact(form);
      toast.success("Thank you! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "General enquiry", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main data-testid="contact-page">
      {/* Header */}
      <section className="bg-mint-light px-6 py-16 text-center md:px-12 md:py-20 lg:px-24">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">We'd love to hear from you</p>
          <h1 className="font-serif text-5xl leading-none tracking-tight text-gold sm:text-6xl lg:text-7xl">
            Get in Touch
          </h1>
          <p className="gold-diamonds mt-4" aria-hidden="true">♦ ♦ ♦ ♦</p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-clay">
            Have a question, a custom cake idea or a bulk order? Drop us a message and our team
            will be in touch soon.
          </p>
        </Reveal>
      </section>

      {/* Info + Form */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Info */}
          <div>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {INFO.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="rounded-2xl bg-sand p-6 shadow-sm">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-light text-mint-dark">
                        <Icon size={18} />
                      </span>
                      <p className="mt-3 text-sm font-bold text-ink">{c.title}</p>
                      {c.lines.map((l) => (
                        <p key={l} className="mt-0.5 text-sm text-clay">{l}</p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex gap-3">
                <a href="#" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-white transition-colors hover:bg-rose-deep"><Instagram size={18} /></a>
                <a href="#" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-white transition-colors hover:bg-rose-deep"><Facebook size={18} /></a>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1571942948809-74637bfc59b9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100"
                  alt="US Bakers storefront"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-testid="contact-form"
            className="rounded-3xl bg-white p-8 shadow-md md:p-10"
          >
            <h2 className="font-serif text-3xl tracking-tight text-gold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input data-testid="contact-name" className={field} placeholder="Your name *" value={form.name} onChange={set("name")} />
              <input data-testid="contact-phone" className={field} placeholder="Phone number *" value={form.phone} onChange={set("phone")} />
              <input data-testid="contact-email" className={field} placeholder="Email (optional)" value={form.email} onChange={set("email")} />
              <select data-testid="contact-subject" className={`${field} cursor-pointer`} value={form.subject} onChange={set("subject")}>
                <option>General enquiry</option>
                <option>Custom cake order</option>
                <option>Bulk / corporate order</option>
                <option>Feedback</option>
              </select>
            </div>
            <textarea data-testid="contact-message" rows={5} className={`${field} mt-4 resize-none`} placeholder="Your message *" value={form.message} onChange={set("message")} />
            <button
              type="submit"
              disabled={submitting}
              data-testid="contact-submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-rose-deep disabled:opacity-60"
            >
              {submitting ? "Sending…" : <>Send Message <Send size={15} /></>}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
