export default function Stats() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-2xl md:text-3xl font-bold">Why Choose Carzio</h2>
          <p className="text-silver text-sm mt-2">Trusted by thousands of travelers across Morocco</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white/5 backdrop-blur rounded-xl px-6 py-8 text-center border border-white/10 hover:border-gold/50 transition">
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">4.9/5</div>
            <div className="text-silver text-xs md:text-sm">Customer Rating</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl px-6 py-8 text-center border border-white/10 hover:border-gold/50 transition">
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">15k+</div>
            <div className="text-silver text-xs md:text-sm">Happy Travelers</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl px-6 py-8 text-center border border-white/10 hover:border-gold/50 transition">
            <div className="text-gold font-heading font-bold text-2xl md:text-4xl mb-1">Fully Insured</div>
            <div className="text-silver text-xs md:text-sm">Drive Worry-Free</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl px-6 py-8 text-center border border-white/10 hover:border-gold/50 transition">
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">24/7</div>
            <div className="text-silver text-xs md:text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
