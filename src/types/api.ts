// src/types/api.ts


/** Interfejs dla ogólnego elementu menu */
export interface MenuItem {
  id: string;
  menu_title: string;
  alias: string;
  menutype: string;
  path: string;
  link: string;
  type: string; // np. 'component', 'url'
  template_style_id: string;
}

/** Interfejs dla odpowiedzi z mainMenu */
export interface MainMenuResponse {
  menu_type: string;
  menu_items: MenuItem[];
}

/** Interfejs dla pojedynczego slajdu */
export interface SliderItem {
  image: string; // URL obrazu
  title: string;
  link: string; // Opcjonalny link
  description: string;
}

/** Interfejs dla odpowiedzi z getSlider */
export interface SliderResponse {
  slider: SliderItem[];
}

/** Interfejs dla pojedynczej kategorii (zakładam, że Phoca/Joomla Categories mają podobny format) */
export interface CategoryItem {
  id: string;
  name: string;
  alias: string;
  description: string;
  // ... inne pola, które zwracasz (np. article_count, note)
}

/** Interfejs dla odpowiedzi z getPhocaCategories (zakładam, że zwraca listę) */
export interface CategoriesResponse {
  categories: CategoryItem[];
}

/** Interfejs dla wyróżnionego artykułu (z ApiController.php) */
export interface FeaturedArticle {
  id: string;
  title: string;
  alias: string;
  introtext: string;
  fulltext: string;
  created: string;
  modified: string;
  author: string;
}
