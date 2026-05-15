import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32">
      <div className="bg-black py-12 text-center">
        <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2">Contact Us</h1>
        <p className="text-silver">Quality You Can Feel, Convenience You Deserve</p>
      </div>
      <Contact />
    </div>
  );
}
