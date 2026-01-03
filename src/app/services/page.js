import alhikmah from "@/../public/images/og-image.jpg";
import hostname from "@/utils/hostname.mjs";

const ServicesPage = () => {
  const services = [
    {
      title: "Ruqyah Shariah",
      subtitle: "Spiritual Healing",
      description:
        "Authentic Ruqyah based on the Qur’an and Sunnah for protection and healing from sihr, evil eye, hasad, and jinn affliction.",
      points: [
        "Qur’anic recitation only",
        "No innovations or shirk",
        "Private & confidential sessions",
      ],
    },
    {
      title: "Hijama (Cupping Therapy)",
      subtitle: "Prophetic Treatment",
      description:
        "Wet cupping therapy performed according to prophetic practice, supporting detoxification, circulation, and pain relief.",
      points: [
        "Hygienic & professional setup",
        "Sunnah points followed",
        "Physical & spiritual benefit",
      ],
    },
    {
      title: "Spiritual Guidance",
      subtitle: "Preventive Care",
      description:
        "Islamic advice and lifestyle guidance to strengthen imaan, protect oneself spiritually, and maintain long-term wellbeing.",
      points: [
        "Daily protection routines",
        "Islamic lifestyle advice",
        "Personalised guidance",
      ],
    },
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
            Holistic healing through authentic Islamic practices — nurturing the
            body, mind, and soul.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Accent */}
              <span className="absolute left-0 top-6 h-12 w-1 rounded-r-full bg-blue-600 opacity-0 transition group-hover:opacity-100" />

              <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                {service.title}
              </h3>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                {service.subtitle}
              </span>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href="/appointment"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Our Commitment
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            All services at Al Hikmah are delivered with sincerity, Islamic
            integrity, and professional care. We strictly follow Qur’an and
            Sunnah, ensuring safe, respectful, and effective healing practices.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-14 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Ready to Begin Your Healing?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100">
          Whether spiritual, physical, or emotional — we are here to support
          you with trust and compassion.
        </p>

        <a
          href="/appointment"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Book an Appointment
        </a>
      </section>
    </main>
  );
};

export default ServicesPage;

export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const host = await hostname();
  const siteUrl = `${host}/services` || "https://alhikmahbd.org/services";
 const metaImage = `${host}${alhikmah.src}`;
  const title =
    "Our Services – Ruqyah & Hijama Treatment | Al Hikmah Center";

  const description =
    "Explore our Islamic healing services including Ruqyah, Hijama (cupping therapy), spiritual consultation, and Sunnah-based treatments at Al Hikmah Center.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Ruqyah Services",
      "Hijama Services",
      "Islamic Healing Services",
      "Cupping Therapy Bangladesh",
      "Islamic Treatment Center",
      "আল হিকমাহ সার্ভিস",
      "রুকইয়াহ চিকিৎসা",
      "হিজামা সেবা",
    ],

    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: "Ruqyah & Hijama Services – Al Hikmah Center",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: "Al Hikmah Ruqyah & Hijama Center",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
