export default function Footer() {
  return (
    <footer className="bg-custom-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-custom-red flex items-center justify-center text-white font-serif font-bold text-lg">
                            j
                        </div>
                        <div>
                            <span className="font-serif font-bold text-white text-lg">[do uzupełnienia]</span>
                        </div>
                    </div>
                    <p className="text-gray-400 max-w-md">
                           ?????????
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Nawigacja</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-custom-gold transition-colors">????</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Kontakt</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li id="footer-email">kontakt@example.com</li>
                        <li>+48 123 456 789</li>
                        <li id="nip">NIP XXX</li>
                        <li id="regon">REGON xxxxxxxxxx</li>
                        <li id="konto">Konto:<br />xxxxxxxxxxxxxxxxx</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                    © 2026 &quot;Laboratorium Cyfryzacji&quot;. Wszelkie prawa zastrzeżone.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                </div>
            </div>
        </div>
    </footer>
  );
}