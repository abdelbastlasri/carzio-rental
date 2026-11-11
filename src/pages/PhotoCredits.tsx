import LangLink from '../components/LangLink';
import Seo from '../components/Seo';
import { photoCredits } from '../data/photoCredits';

export default function PhotoCredits() {
  return (
    <>
      <Seo
        title="Crédits photos / Photo credits | Carzio"
        description="Sources, authors and licences for the photos published on the Carzio site. / Sources, auteurs et licences des photographies publiées sur le site Carzio."
        canonical="https://www.carzio.ma/credits"
        robots="noindex, follow"
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden border-b border-white/5 py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-black" />
          <div className="relative z-10 mx-auto max-w-4xl px-4">
            <LangLink to="/" className="text-xs font-semibold uppercase tracking-[0.3em] text-gold hover:text-gold-light">
              ← Carzio
            </LangLink>
            <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              Crédits photos <span className="text-white/40">/ Photo credits</span>
            </h1>
            <p lang="fr" className="mt-4 text-sm leading-relaxed text-white/60">
              Toutes les photographies publiées sur ce site sont des visuels appartenant à Carzio. Aucune
              photographie de tiers n'est utilisée, aucune attribution de licence n'est donc nécessaire.
            </p>
            <p lang="en" className="mt-2 text-sm leading-relaxed text-white/45">
              Every photograph published on this site is a Carzio-owned visual. No third-party photograph is
              used, so no licence attribution is required.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          {photoCredits.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-8 text-center md:p-12">
              <p lang="fr" className="text-sm leading-relaxed text-white/70">
                Aucune photographie tierce n'est actuellement publiée. Cette page reste en place au cas où une
                image sous licence serait ajoutée : son auteur, sa licence et sa source y seraient alors
                répertoriés.
              </p>
              <p lang="en" className="mt-3 text-sm leading-relaxed text-white/45">
                No third-party photograph is currently published. This page remains in place so that any
                licensed image added later can be listed here with its author, licence and source.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photoCredits.map((photo) => (
                <li
                  key={photo.file}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 transition hover:border-gold/40"
                >
                  <div className="relative h-40 overflow-hidden bg-white">
                    <img
                      src={`/images/journal/${photo.file}`}
                      alt={photo.title}
                      loading="lazy"
                      width={400}
                      height={240}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex h-full flex-col p-5">
                    <h2 className="font-heading text-sm font-semibold leading-snug text-white">
                      {photo.title}
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-white/55">
                      <span className="text-gold">Auteur / Author:</span> {photo.author}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">
                      <span className="text-gold">Licence:</span> {photo.license}
                    </p>
                    <a
                      href={photo.source}
                      target="_blank"
                      rel="noopener noreferrer license"
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-gold hover:text-gold"
                    >
                      Source
                      <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7m0 0H9m8 0v8" />
                      </svg>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
