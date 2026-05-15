export default function MoroccanBanner() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591640062179-95e3e5d0a4f6?w=1600&q=80')" }}
      />
      <div className="relative z-10 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-heading text-sm font-semibold tracking-widest uppercase">Morocco</span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <p className="text-white/80 font-heading text-2xl md:text-3xl font-bold italic">
            &ldquo; Allah &middot; Alwatan &middot; Almalik &rdquo;
          </p>
          <p className="text-silver text-sm mt-3">God &middot; Homeland &middot; King</p>
        </div>
      </div>
    </section>
  );
}
