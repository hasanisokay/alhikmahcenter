import React from "react";

const audioList = [
  {
    title: "Evil Eye Ruqyah",
    src: "https://ia600309.us.archive.org/21/items/ruqyah-evil-eye-ruqyahbd.org/Ruqyah-EvilEye-ruqyahbd.org.mp3",
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
              <div className="mb-3 text-xs font-semibold text-blue-600">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>

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
