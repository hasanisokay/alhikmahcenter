import alhikmah from "@/../public/images/og-pdf.jpg";
import hostname from "@/utils/hostname.mjs";

const pdfList = [
  {
    title: "১। রুকইয়ার কমন আয়াত",
    viewLink: "https://files.ruqyahbd.org/pdf/ruqyah-ayat-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ruqyah-ayat-ruqyahbd.org.pdf",
  },
  {
    title: "২। রুকইয়াহ'র দোয়া",
    viewLink: "https://files.ruqyahbd.org/pdf/ruqyah-dua-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ruqyah-dua-ruqyahbd.org.pdf",
  },
  {
    title: "৩। রুকইয়ার আয়াত ও দোয়া (একত্রে)",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-ruqyah-n-dua-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-ruqyah-n-dua-ruqyahbd.org.pdf",
  },
  {
    title: "৪। বদনজরের রুকইয়াহ",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-ruqyah-evileye-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-ruqyah-evileye-ruqyahbd.org.pdf",
  },
  {
    title: "৫। আয়াতুল হারক",
    viewLink: "https://files.ruqyahbd.org/pdf/ayatul-harq-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayatul-harq-ruqyahbd.org.pdf",
  },
  {
    title: "৬। সিহরের আয়াত (অর্থসহ, সংক্ষিপ্ত)",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-sihr-bangla-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-sihr-bangla-ruqyahbd.org.pdf",
  },
  {
    title: "৭। জ্বিন-শয়তান বিষয়ক আয়াত",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-jinn-full-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-jinn-full-ruqyahbd.org.pdf",
  },
  {
    title: "৮। আয়াতুশ শিফা এবং তাখফীফ",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-shifa-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-shifa-ruqyahbd.org.pdf",
  },
  {
    title: "৯। আয়াতুস সাকিনাহ",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-sakina-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-sakina-ruqyahbd.org.pdf",
  },
  {
    title: "১০। যাদুকরের প্রতি অভিশাপ এবং যাদু ধ্বংসের দোয়া",
    viewLink: "https://files.ruqyahbd.org/pdf/curse-against-magician-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/curse-against-magician-ruqyahbd.org.pdf",
  },
  {
    title: "১১। আয়াতে কিতাল ওয়া তাদমির",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-qital-tadmir-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-qital-tadmir-ruqyahbd.org.pdf",
  },
  {
    title: "১২। আয়াতে ইযাম",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-ejam-mobile-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-ejam-mobile-ruqyahbd.org.pdf",
  },
  {
    title: "১৩। রুকইয়াহ যিনা ফাহিশা",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-zina-fahisha-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-zina-fahisha-ruqyahbd.org.pdf",
  },
  {
    title: "১৪। আয়াত খুরুজ ওয়া তানযিল",
    viewLink: "https://files.ruqyahbd.org/pdf/ayat-khuruj-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ayat-khuruj-ruqyahbd.org.pdf",
  },
  {
    title: "১৫। মাসনুন আমল (সংক্ষিপ্ত)",
    viewLink: "https://files.ruqyahbd.org/docs/masnun-amal-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/docs/masnun-amal-ruqyahbd.org.pdf",
  },
    {
    title: "১৬। মুখতাসার রুকইয়াহ শারইয়্যাহ (PDF)",
    viewLink: "https://files.ruqyahbd.org/docs/mukhtasar-ruqyah-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/docs/mukhtasar-ruqyah-ruqyahbd.org.pdf",
  },
  {
    title: "১৭। মাসনুন আমল (সংক্ষিপ্ত) (PDF)",
    viewLink: "https://files.ruqyahbd.org/docs/masnun-amal-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/docs/masnun-amal-ruqyahbd.org.pdf",
  },
  {
    title: "১৮। বহুল জিজ্ঞাসিত প্রশ্নগুলো (FAQ – সংক্ষিপ্ত)",
    viewLink: "https://files.ruqyahbd.org/docs/faq-common-questions-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/docs/faq-common-questions-ruqyahbd.org.pdf",
  },
  {
    title: "১৯। লক্ষণ এবং প্রশ্নোত্তর (Symptoms & FAQ)",
    viewLink: "https://files.ruqyahbd.org/docs/symptoms-n-faq-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/docs/symptoms-n-faq-ruqyahbd.org.pdf",
  },
  {
    title: "২০। শিশুদের কথা শিখতে দেরি ও অটিজম সমস্যা",
    viewLink: "https://files.ruqyahbd.org/pdf/speech-delay-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/speech-delay-ruqyahbd.org.pdf",
  },
  {
    title: "২১। শত্রুর দৃষ্টি থেকে গোপন থাকার আমল",
    viewLink: "http://bitly.com/ayat-hide",
    downloadLink: "http://bitly.com/ayat-hide",
  },

];


const PdfPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ruqyah <span className="text-blue-600">PDF Library</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
            A curated collection of Ruqyah ayat and duas for reading, printing,
            and reference.
          </p>
        </div>
      </section>

      {/* PDFs */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfList.map((pdf, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Index */}
              {/* <div className="mb-3 text-xs font-semibold text-blue-600">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div> */}

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900">
                {pdf.title}
              </h3>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={pdf.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-blue-600 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  View PDF
                </a>

                <a
                  download
                  href={pdf.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credit */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
  <p className="text-xs text-gray-500">
  PDF topics are curated with reference and credit to{" "}
  <a
    href="https://ruqyahbd.org/ayat"
    rel="noreferrer noopener"
    className="font-medium text-gray-700"
  >
    Ruqyah Support BD
  </a>. All
  materials are intended for sincere and respectful use.
</p>
        </div>
      </section>
    </main>
  );
};

export default PdfPage;


export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const host = await hostname()
  const siteUrl = `${host}/pdf` || "https://alhikmahbd.org/pdf";
 const metaImage = `${host}${alhikmah.src}`;
  const title =
    "Islamic Ruqyah PDF & Dua Collection | Al Hikmah Center";

  const description =
    "Download authentic Islamic Ruqyah PDFs, duas, and spiritual healing guides based on Qur'an and Sunnah. Al Hikmah Center provides trusted Islamic resources for shifa and protection.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Ruqyah PDF",
      "Islamic Ruqyah PDF",
      "Dua PDF Download",
      "Islamic Healing PDF",
      "Quran Ruqyah Book",
      "আল হিকমাহ রুকইয়াহ পিডিএফ",
      "ইসলামিক দোয়া পিডিএফ",
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
          alt: "Islamic Ruqyah PDF – Al Hikmah Center",
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
