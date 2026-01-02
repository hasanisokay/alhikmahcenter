const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <svg
        className="w-14 h-14 animate-spin"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="210"
          strokeDashoffset="80"
        />
      </svg>
    </div>
  );
};

export default Loader;
