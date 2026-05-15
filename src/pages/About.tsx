import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';

const highlights = [
  {
    title: 'Wide Range of Vehicles',
    description: 'From compact city cars to luxury SUVs, our fleet covers every need with modern, well-maintained vehicles.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Daily Rates',
    description: 'Competitive pricing with no hidden fees. Get the best value for your money with transparent, upfront costs.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Airport Pickup & Drop-Off',
    description: 'Seamless travel experience with convenient pickup and drop-off directly at Agadir Al Massira Airport.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Customer-Centric Support',
    description: 'Our dedicated team is available 24/7 to assist you with any questions or concerns during your rental.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <div className="pt-28 md:pt-32">
      <div className="bg-zinc-900 py-12 text-center">
        <h1 className="text-white font-heading text-3xl md:text-5xl font-bold mb-2">Who We Are</h1>
        <p className="text-silver">Quality You Can Feel, Convenience You Deserve</p>
      </div>

      <section className="bg-black py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="h-80 md:h-96 rounded-xl bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: "url('/images/about.jpg')" }}
            />
            <div>
              <span className="text-gold font-heading font-bold text-lg">5+ Years Experience</span>
              <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">Where Quality Meets Convenience</h2>
              <p className="text-silver leading-relaxed mb-8">
                Carzio is a trusted car hire company based in Agadir, Morocco, dedicated to providing reliable
                and affordable vehicle rental services. Whether you&apos;re exploring the city, embarking on a
                coastal adventure, or traveling for business &mdash; we&apos;ve got you covered.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="group bg-zinc-900/80 border border-white/5 hover:border-gold/40 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
                  >
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3 text-gold group-hover:bg-gold/20 transition">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-heading font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-silver text-xs leading-relaxed">{item.description}</p>
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
