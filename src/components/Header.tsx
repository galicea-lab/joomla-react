import Link from 'next/link';
import { BookOpen, Code, GraduationCap, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Pasek powiązanych inicjatyw */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <span className="text-blue-800 font-medium">Szybkie linki:</span>
              <Link href="#" target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                <BookOpen className="w-4 h-4 mr-1" /> Link H1
              </Link>
              <Link href="#" target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                <Code className="w-4 h-4 mr-1" /> Link H2
              </Link>
              <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Link href="#" target="_blank" className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" /> Link H3
                </Link>
              </div>
              <Link href="#" target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                <Globe className="w-4 h-4 mr-1" /> Link H4
              </Link>
            </div>
            <div className="md:hidden text-xs text-blue-700 font-semibold">[START]</div>
          </div>
        </div>
      </div>

      {/* Główna nawigacja */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            TYTUŁ 
          </Link>
          <nav className="hidden md:flex space-x-8">
           <Link href="#o-nas" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">O nas</Link>
            <Link href="#kontakt" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Kontakt</Link>
          </nav>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
            Zaloguj się
          </button>
        </div>
      </div>
    </header>
  );
}