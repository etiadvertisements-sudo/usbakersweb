import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Upload, Check, X } from "lucide-react";
import { createCustomOrder } from "../lib/api";
import { Reveal } from "../components/Motion";

const field =
  "w-full border-0 border-b border-border bg-transparent py-3 text-ink placeholder:text-clay/50 focus:border-rose focus:outline-none focus:ring-0 transition-colors";

const FLAVORS = ["Vanilla Bean", "Belgian Chocolate", "Red Velvet", "Butterscotch", "Fresh Fruit", "Pineapple", "Coffee Mocha", "Other"];
const SIZES = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg+", "Multi-tier"];
const OCCASIONS = ["Birthday", "Wedding", "Anniversary", "Baby Shower", "Corporate", "Other"];

export default function CustomOrder() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    customer_name: "", phone: "", email: "",
    occasion: "Birthday", flavor: "Vanilla Bean", size: "1 kg",
    date_needed: "", message_on_cake: "", details: "", reference_image: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Please upload an image under 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm((f) => ({ ...f, reference_image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.phone) {
      toast.error("Please share your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      await createCustomOrder(form);
      toast.success("Custom cake request received! We'll be in touch soon.");
      navigate("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main data-testid="custom-order-page" className="pt-32 px-6 pb-32 md:px-12 lg:px-24">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-rose">Made to order</p>
            <h1 className="font-serif text-5xl leading-none tracking-tight text-ink lg:text-7xl">
              Design your<br /><span className="italic text-rose">dream cake.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-clay">
              Tell us about your celebration and vision. Share a reference photo, pick a flavour and
              size, and our bakers will craft something truly yours.
            </p>
            <div className="mt-10 overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/34833097/pexels-photo-34833097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Custom cake inspiration"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
          data-testid="custom-order-form"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <input data-testid="custom-name" className={field} placeholder="Full name *" value={form.customer_name} onChange={set("customer_name")} />
            <input data-testid="custom-phone" className={field} placeholder="Phone number *" value={form.phone} onChange={set("phone")} />
            <input data-testid="custom-email" className={field} placeholder="Email (optional)" value={form.email} onChange={set("email")} />
            <input data-testid="custom-date" type="date" className={field} value={form.date_needed} onChange={set("date_needed")} />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-clay/70">Occasion</span>
              <select data-testid="custom-occasion" className={`${field} cursor-pointer`} value={form.occasion} onChange={set("occasion")}>
                {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-clay/70">Flavour</span>
              <select data-testid="custom-flavor" className={`${field} cursor-pointer`} value={form.flavor} onChange={set("flavor")}>
                {FLAVORS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-clay/70">Size</span>
              <select data-testid="custom-size" className={`${field} cursor-pointer`} value={form.size} onChange={set("size")}>
                {SIZES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
          </div>

          <input data-testid="custom-message" className={field} placeholder="Message on cake (e.g. Happy Birthday Aanya)" value={form.message_on_cake} onChange={set("message_on_cake")} />

          <textarea data-testid="custom-details" rows={4} className={`${field} resize-none`} placeholder="Describe your dream cake — theme, colours, design, dietary needs…" value={form.details} onChange={set("details")} />

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-clay/70">Reference photo (optional)</span>
            {!preview ? (
              <label data-testid="custom-upload-label" className="mt-3 flex cursor-pointer items-center justify-center gap-3 rounded-sm border border-dashed border-border py-10 text-clay transition-colors hover:border-rose hover:text-rose">
                <Upload size={20} /> Click to upload an inspiration image
                <input data-testid="custom-upload-input" type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
            ) : (
              <div className="relative mt-3 w-48 overflow-hidden rounded-sm">
                <img src={preview} alt="reference preview" className="aspect-square w-full object-cover" />
                <button type="button" onClick={() => { setPreview(""); setForm((f) => ({ ...f, reference_image: "" })); }} className="absolute right-2 top-2 rounded-full bg-ink/70 p-1.5 text-white" data-testid="custom-remove-image">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            data-testid="custom-submit-button"
            className="inline-flex items-center gap-2 rounded-full bg-rose px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-rose-deep disabled:opacity-60"
          >
            {submitting ? "Sending request…" : <>Send Custom Request <Check size={16} /></>}
          </button>
        </motion.form>
      </div>
    </main>
  );
}
