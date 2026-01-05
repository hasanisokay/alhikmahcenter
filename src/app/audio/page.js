import hostname from "@/utils/hostname.mjs";
import React from "react";
import alhikmah from "@/../public/images/og-audio.jpg";


const audioList = [
  {
    title: "১. বদনজর (Evil Eye) – রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-EvilEye-ruqyahbd.org.mp3",
  },
  {
    title: "২. বদনজর (Eye Hasad)",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-EyeHasad-ruqyahbd.org.mp3",
  },
  {
    title: "৩. জাদু ও জিন (Sihr Mass)",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Mass-ruqyahbd.org.mp3",
  },
  {
    title: "৪. কালো যাদু, বান ও জিন (Sihr Hibshi)",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Hibshi-ruqyahbd.org.mp3",
  },
  {
    title: "৫. আয়াতুল হারক",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Harq-ruqyahbd.org.mp3",
  },
  {
    title: "৬. জিনের আছর – রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Jinn-ruqyahbd.org.mp3",
  },
  {
    title: "৭. তিন কুলের রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-3Kul-ruqyahbd.org.mp3",
  },
  {
    title: "৮. আট সুরার রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-8surah-ruqyahbd.org.mp3",
  },
  {
    title: "৯. আয়াতুল কুরসি – রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-AyatulKursi-ruqyahbd.org.mp3",
  },
  {
    title: "১০. যাদুকরদের প্রতি অভিশাপ",
    src: "https://files.ruqyahbd.org/audio/curse-against-magician-ruqyahbd.org.mp3",
  },
  {
    title: "১১. শাইখ আব্দুর রহমান আস-সুদাইস",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Sudais-ruqyahbd.org.mp3",
  },
  {
    title: "১২. শাইখ আলী আল-হুজাইফি",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Hujaifi-ruqyahbd.org.mp3",
  },
  {
    title: "১৩. শাইখ সৌদ আশ-শুরাইম",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Shuraim-ruqyahbd.org.mp3",
  },
  {
    title: "১৪. সা’দ আল-গামিদী",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Ghamidi-ruqyahbd.org.mp3",
  },
  {
    title: "১৫. মিশারী রাশেদ আল-আফাসী",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Mishary-ruqyahbd.org.mp3",
  },
  {
    title: "১৬. শাইখ আহমাদ আজমী",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-AhmadAjmy-ruqyahbd.org.mp3",
  },
  {
    title: "১৭. নাসের আল-কাতামি",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-NasserQatami-ruqyahbd.org.mp3",
  },
  {
    title: "১৮. শাইখ ইদরীস আবকার",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-IdreesAbkar-ruqyahbd.org.mp3",
  },
  {
    title: "১৯. খালিদ আল-হিবশী",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-KhalidHibshi-ruqyahbd.org.mp3",
  },
  {
    title: "২০. শাইখ লুহাইদান",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Luhaidan-ruqyahbd.org.mp3",
  },
  {
    title: "২১. মুফতি জুনাইদ – সিডি",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-JunaidCD1-ruqyahbd.org.mp3",
  },
  {
    title: "২২. মাজিদ আয-যামিল",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-MajidZamil-ruqyahbd.org.mp3",
  },
  {
    title: "২৩. রুকইয়াহ – দোআ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-dua-ruqyahbd.org.mp3",
  },
  {
    title: "২৪. আযান রুকইয়াহ (পুনরাবৃত্তি)",
    src: "http://bitly.com/2YoCfEq",
  },
  {
    title: "২৫. সূরা বাকারা – শাইখ সুদাইস",
    src: "https://files.ruqyahbd.org/audio/Surah-Baqara-by-Sudais-ruqyahbd.org.mp3",
  },
  {
    title: "২৬. সূরা ফাতিহার রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-SuraFatiha-ruqyahbd.org.mp3",
  },
  {
    title: "২৭. যিনা ও ফাহিশা বিষয়ক রুকইয়াহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Zina-ruqyahbd.org.mp3",
  },
  {
    title: "২৮. শিফা ও সাকিনাহ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Shifa-Sakina-ruqyahbd.org.mp3",
  },
  {
    title: "২৯. রুকইয়াহ খুরুজ",
    src: "https://files.ruqyahbd.org/audio/Ruqyah-Khuruj-ruqyahbd.org.mp3",
  },
];



const AudioPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ruqyah <span className="text-blue-600">Audio Library</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
            For maximum benefit, please listen to these audio recitations with
            focus and sincerity.
          </p>
        </div>
      </section>

      {/* Audio Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audioList.map((audio, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Index */}
              {/* <div className="mb-3 text-xs font-semibold text-blue-600">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div> */}

              <h3 className="text-sm font-semibold text-gray-900">
                {audio.title}
              </h3>

              <audio
                controls
                className="mt-4 w-full rounded-lg"
                src={audio.src}
                preload="none"
              />
              <a
                href={audio.src}
                download
                className="mt-4 inline-block w-full rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Credit */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs text-gray-500">
            Audio content is sourced and curated with credit to{" "}
            <span className="font-medium text-gray-700">RuqyahBD</span>. All
            recitations are based on Qur’an and authentic Sunnah.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-12 text-center text-white">
        <h2 className="text-xl font-semibold">
          Need Personal Guidance or Treatment?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
          Ruqyah audio is beneficial, but some cases require direct assessment
          and personalised care.
        </p>

        <a
          href="/appointment"
          className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Book an Appointment
        </a>
      </section>
    </main>
  );
};

export default AudioPage;

export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const host = await hostname();
  const siteUrl = `${host}/audio` || "https://alhikmahbd.org/audio";
  const metaImage = `${host}${alhikmah.src}`;
  const title = "Ruqyah Audio Collection | Al Hikmah Center";

  const description =
    "Listen to authentic Islamic Ruqyah audio recitations based on Qur'an and Sunnah. Al Hikmah Center provides spiritual healing audio for protection, shifa, and peace of heart.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Ruqyah Audio",
      "Islamic Ruqyah Audio",
      "Quran Ruqyah MP3",
      "Spiritual Healing Audio",
      "Ruqyah Listening",
      "আল হিকমাহ রুকইয়াহ অডিও",
      "রুকইয়াহ কুরআন অডিও",
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
          alt: "Ruqyah Audio Collection – Al Hikmah Center",
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
