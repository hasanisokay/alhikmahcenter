const AboutPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About <span className="text-blue-600">Al Hikmah</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
            Healing through authentic Ruqyah and prophetic Hijama — rooted in
            faith, delivered with professionalism.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Our Mission
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              At Al Hikmah, our mission is to provide authentic Islamic healing
              services through Ruqyah and Hijama, following the Qur’an, Sunnah,
              and prophetic guidance. We aim to restore balance to the body,
              mind, and soul with sincerity, trust, and excellence.
            </p>
          </div>

          <div className="relative rounded-3xl border border-blue-100 bg-blue-50/60 p-8">
            <p className="text-sm italic text-gray-700">
              “And We send down of the Qur’an that which is healing and mercy for
              the believers.”
            </p>
            <span className="mt-2 block text-xs font-medium text-gray-500">
              — Qur’an 17:82
            </span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-2xl font-semibold">
            What We Offer
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Ruqyah Shariah",
                desc: "Authentic Qur’anic recitation for spiritual protection, healing from sihr, evil eye, and jinn affliction.",
              },
              {
                title: "Hijama (Cupping Therapy)",
                desc: "Prophetic wet cupping performed hygienically to support detox, circulation, and pain relief.",
              },
              {
                title: "Guidance & Support",
                desc: "Islamic advice and lifestyle guidance to strengthen imaan and prevent spiritual harm.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">
          Our Core Values
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Authenticity",
            "Trust & Confidentiality",
            "Islamic Integrity",
            "Professional Care",
          ].map((value) => (
            <div
              key={value}
              className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm font-medium text-gray-700"
            >
              {value}
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-blue-600 py-14 text-center text-white">
        <h2 className="text-2xl font-semibold">
          Begin Your Healing Journey
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100">
          If you’re seeking spiritual and physical healing through Islamic
          methods, Al Hikmah is here to support you with care and sincerity.
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

export default AboutPage;

export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const siteUrl = "https://alhikmahbd.org/about";

  const title =
    "About Al Hikmah Center | Islamic Ruqyah & Hijama Care";

  const description =
    "Learn about Al Hikmah Ruqyah & Hijama Center, our mission, values, and authentic Islamic healing practices based on Qur'an and Sunnah in Bangladesh.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "About Al Hikmah Center",
      "Islamic Ruqyah Center",
      "Hijama Center Bangladesh",
      "Islamic Healing Center",
      "আল হিকমাহ সম্পর্কে",
      "রুকইয়াহ সেন্টার",
      "হিজামা চিকিৎসা কেন্দ্র",
    ],

    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: [
        {
          url: "https://alhikmahbd.org/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "About Al Hikmah Ruqyah & Hijama Center",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://alhikmahbd.org/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
