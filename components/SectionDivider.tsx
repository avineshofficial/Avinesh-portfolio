export default function SectionDivider() {
  const words = [
    "AVINESH",
    "DEVELOPER",
    "AI ENTHUSIAST",
    "SYSTEM ARCHITECT",
    "PROBLEM SOLVER",
    "WEB ENGINEER",
    "CREATOR",
  ];

  // Duplicate list multiple times to allow seamless looping
  const displayWords = [...words, ...words, ...words, ...words];

  return (
    <div className="marquee-container my-16 rotate-[-1deg] shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="marquee-content">
        {displayWords.map((word, i) => (
          <div key={i} className="marquee-item">
            <span>{word}</span>
            <span className="material-symbols-outlined text-[#FF6B35] font-black">
              grade
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
