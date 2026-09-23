// configs/config.ts

type Config = {
  lang: string;
  apiUrl: string;
  webUrl:string;
};

// Next.js gwarantuje, że proces.env.NEXT_PUBLIC_* będzie dostępny
// w zależności od trybu pracy (development/production).
const CONFIG: Config = {
  // Użyj operatora '!' po zmiennej, jeśli masz pewność, że zostanie ustawiona w plikach .env
  // Możesz też użyć wartości domyślnej, np. process.env.NEXT_PUBLIC_LANG ?? 'en'
  lang: process.env.NEXT_PUBLIC_LANG ?? 'pl', 
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  webUrl: process.env.NEXT_PUBLIC_WEB_URL ?? ''};

// Jeśli potrzebujesz dostępu do zmiennych środowiskowych, które NIE są publiczne 
// (nie mają prefiksu NEXT_PUBLIC_), będą one dostępne TYLKO po stronie serwera!
// Przykład zmiennej tylko serwerowej:
// const SERVER_SECRET = process.env.SERVER_SECRET_KEY;

export default CONFIG;