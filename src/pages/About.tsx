import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';

export default function About() {
  return (
    <div className="pt-28 md:pt-32">
      <div className="bg-black py-12 text-center">
        <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2">Who We Are</h1>
        <p className="text-silver">Quality You Can Feel, Convenience You Deserve</p>
      </div>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="h-80 md:h-96 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: "url('/images/about.jpg')" }}
            />
            <div>
              <span className="text-gold font-heading font-bold text-lg">5+ Years Experience</span>
              <h2 className="text-black font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">Where Quality Meets Convenience</h2>
              <p className="text-silver leading-relaxed mb-6">
                Carzio is a trusted car hire company based in Agadir, Morocco, dedicated to providing reliable
                and affordable vehicle rental services. Whether you&apos;re exploring the city, embarking on a
                coastal adventure, or traveling for business &mdash; we&apos;ve got you covered.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Wide Range of Vehicles',
                  'Affordable Daily Rates',
                  'Airport Pickup & Drop-Off',
                  'Customer-Centric Support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-black">
                    <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyChooseUs />
      <Stats />
      <Reviews />
    </div>
  );
}
