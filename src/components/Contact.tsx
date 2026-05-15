import { useState } from 'react';

const WHATSAPP_NUMBER = '212680318003';
const EMAIL = 'contact@carzio.ma';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    try {
      const res = await fetch(`/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Server error');
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      console.error('Failed to save contact:', err);
      setSubmitError(msg);
    }
  };

  return (
    <section id="contact" className="bg-black py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-3">Find Us on the Map</h2>
          <p className="text-silver max-w-xl mx-auto">
            Our main office is located at Agadir Al Massira Airport &mdash; easy to reach the moment you land.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/5 shadow-lg mb-12">
          <iframe
            src="https://www.google.com/maps?q=Agadir+Airport+Al+Massira&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Agadir Airport - Al Massira"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white font-heading text-xl font-bold mb-6">Get in Touch</h3>
            <p className="text-silver mb-8">
              Reach out anytime &mdash; we&apos;re here to help.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">Our Address</p>
                  <p className="text-silver text-sm">Airport Agadir, Agadir 80000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">Call Us</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-silver text-sm hover:text-gold transition">+212 680-318003</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">Email Us</p>
                  <a href={`mailto:${EMAIL}`} className="text-silver text-sm hover:text-gold transition">{EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-white font-semibold text-sm">Working Hours</p>
                  <p className="text-silver text-sm">Mon-Sun: 24/7 Service</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                WhatsApp
              </a>
              <a
                href="https://www.google.com/maps?q=Agadir+Airport+Al+Massira"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-600 text-white font-semibold px-6 py-2.5 rounded-lg transition text-sm hover:bg-zinc-800"
              >
                Directions
              </a>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="bg-zinc-900/80 rounded-xl p-10 border border-white/5 shadow-lg text-center">
                <div className="w-14 h-14 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-heading font-bold text-lg mb-2">Message Sent!</h3>
                <p className="text-silver text-sm mb-4">We&apos;ll get back to you shortly.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-gold hover:text-gold-light font-medium text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-zinc-900/80 rounded-xl p-6 border border-white/5 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-black text-white border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:border-gold focus:outline-none resize-none"
                  />
                </div>
                {submitError && (
                  <p className="text-red-400 text-sm text-center mb-3">{submitError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-black font-semibold py-2.5 rounded-lg transition text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
