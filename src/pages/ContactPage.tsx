import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32">
      <div className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2 tracking-tight">Contact Us</h1>
          <p className="text-white/50">Quality You Can Feel, Convenience You Deserve</p>
        </div>
      </div>
      <Contact />
    </div>
  );
}
