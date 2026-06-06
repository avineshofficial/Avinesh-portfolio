export default function Footer() {
  return (
    <footer className="w-full py-12 bg-[#FFE047] border-t-[4px] border-black mt-16 text-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 gap-6 max-w-[1440px] mx-auto">
        <div className="font-[var(--font-jetbrains)] text-[14px] font-black uppercase tracking-wider text-black text-center md:text-left">
          ✦ AVINESH. ENGINEERED FOR PERFORMANCE. ✦
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#"
            className="text-black hover:bg-white px-3 py-1 border-[3px] border-transparent hover:border-black shadow-none hover:shadow-[3px_3px_0px_0px_#000] font-[var(--font-jetbrains)] text-[14px] font-bold uppercase transition-all"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-black hover:bg-white px-3 py-1 border-[3px] border-transparent hover:border-black shadow-none hover:shadow-[3px_3px_0px_0px_#000] font-[var(--font-jetbrains)] text-[14px] font-bold uppercase transition-all"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-black hover:bg-white px-3 py-1 border-[3px] border-transparent hover:border-black shadow-none hover:shadow-[3px_3px_0px_0px_#000] font-[var(--font-jetbrains)] text-[14px] font-bold uppercase transition-all"
          >
            Twitter
          </a>
          <a
            href="mailto:contact@avinesh.dev"
            className="text-black hover:bg-white px-3 py-1 border-[3px] border-transparent hover:border-black shadow-none hover:shadow-[3px_3px_0px_0px_#000] font-[var(--font-jetbrains)] text-[14px] font-bold uppercase transition-all"
          >
            Email
          </a>
        </div>
        <div className="text-black font-[var(--font-jetbrains)] text-[12px] font-bold text-center md:text-right uppercase tracking-wider">
          © {new Date().getFullYear()} AVINESH. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
