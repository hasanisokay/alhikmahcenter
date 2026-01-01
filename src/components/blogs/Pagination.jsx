"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const goToPage = (p) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p);
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="rounded-full border px-4 py-2 text-sm disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`h-9 w-9 rounded-full text-sm font-medium transition
              ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border px-4 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
