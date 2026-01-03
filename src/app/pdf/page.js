import alhikmah from "@/../public/images/og-pdf.jpg";
import hostname from "@/utils/hostname.mjs";

const pdfList = [
  {
    title: "Common Ruqyah Ayat",
    viewLink: "https://files.ruqyahbd.org/pdf/ruqyah-ayat-ruqyahbd.org.pdf",
    downloadLink: "https://files.ruqyahbd.org/pdf/ruqyah-ayat-ruqyahbd.org.pdf",
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
              <div className="mb-3 text-xs font-semibold text-blue-600">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>

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
            <span className="font-medium text-gray-700">RuqyahBD</span>. All
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
