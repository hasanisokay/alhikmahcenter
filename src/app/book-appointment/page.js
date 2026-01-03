import BookAppointment from "@/components/appointment/BookAppointment";

const page = () => {
  return <BookAppointment />
};

export default page;

export async function generateMetadata() {
  const siteName = "Al Hikmah Ruqyah & Hijama Center";
  const siteUrl = "https://alhikmahbd.org/book-appointment";

  const title =
    "Book Appointment – Ruqyah & Hijama | Al Hikmah Center";
  const description =
    "Book your appointment for authentic Islamic Ruqyah and Hijama (cupping therapy) at Al Hikmah Center. Trusted spiritual healing based on Qur'an and Sunnah in Bangladesh.";

  return {
    title,
    description,

    alternates: {
      canonical: siteUrl,
    },

    keywords: [
      "Book Ruqyah Appointment",
      "Book Hijama Appointment",
      "Ruqyah Booking Bangladesh",
      "Hijama Booking BD",
      "Islamic Healing Appointment",
      "আল হিকমাহ বুকিং",
      "রুকইয়াহ অ্যাপয়েন্টমেন্ট",
      "সরাসরি রুকইয়া",
      "লাইভ রুকইয়া",
      "হিজামা বুকিং",
    ],

    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: [
        {
          url: "https://alhikmahbd.org/og-book-appointment.jpg",
          width: 1200,
          height: 630,
          alt: "Book Appointment – Al Hikmah Center",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://alhikmahbd.org/og-book-appointment.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
