export default function Hero() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 relative overflow-hidden">
      {/* Dekoracyjne, jasnoniebieskie tło dodające głębi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-70 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Lewa kolumna - Text i Wyszukiwarka */}
        <div className="md:w-1/2 text-center md:text-left">
[LEWA KOLUMNA - DO UZUPEŁNIENIA]
        </div>

        {/* Prawa kolumna - Grafika / Ilustracja */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
[PRAWA KOLUMNA - DO UZUPEŁNIENIA]

          </div>
        </div>

      </div>
    </section>
  );
}