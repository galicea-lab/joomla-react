// src/api/thapi.ts

import jaxios from './joomla';
import axios from 'axios';
import { 
  MainMenuResponse, 
  SliderResponse, 
  CategoriesResponse,
  FeaturedArticle 
} from '../types/api';

/**
 * 1. Pobiera główne menu.
 * URL: /index.php?option=com_thapi&format=json&task=api.getMainMenu
 */
export async function fetchMainMenu(): Promise<MainMenuResponse> {
  //const url = `${API_BASE_URL}getMainMenu`;
  try {
    const response = await jaxios.get<MainMenuResponse>('',{params: {
    task: 'api.getMainMenu',   // nadpisuje domyślne "api"
//    limit: 20,
    // inne parametry Joomla…
  }});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd pobierania menu:", error.message);
        throw new Error(`Błąd API: ${error.response?.statusText || error.message}`);
    }
    throw error;
  }
}

/**
 * 2. Pobiera listę slajdów.
 * URL: /index.php?option=com_thapi&format=json&task=api.getSlider
 * UWAGA: ZAKŁADAM, że APIController ma zdefiniowaną metodę getSlider().
 */
export async function fetchSlider(): Promise<SliderResponse> {
  try {

    const response = await jaxios.get<SliderResponse>('', {params: {task: 'api.getSlider', }});
    //alert(JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd pobierania slidera:", error.message);
        throw new Error(`Błąd API: ${error.response?.statusText || error.message}`);
    }
    throw error;
  }
}

/**
 * 3. Pobiera listę kategorii (zakładam, że to getCategories lub getPhocaCategories)
 * Na podstawie ApiController.php z poprzedniego kroku, użyję getCategories, ale dla ułatwienia nazwiemy ją "PhocaCategories"
 * URL: /index.php?option=com_thapi&format=json&task=api.getCategories
 */
export async function fetchPhocaCategories(): Promise<CategoriesResponse> {
  // Jeśli funkcja w ApiController nazywa się getCategories, użyj tego:
  try {
    const response = await jaxios.get<CategoriesResponse>('',
      {params: {task: 'api.getCategories', }});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd pobierania kategorii:", error.message);
        throw new Error(`Błąd API: ${error.response?.statusText || error.message}`);
    }
    throw error;
  }
}

/**
 * 4. Pobiera wyróżniony artykuł (lub najnowszy z danej kategorii).
 * UWAGA: ZAKŁADAM, że APIController ma zdefiniowaną metodę getFeaturedArticle().
 * URL: /index.php?option=com_thapi&format=json&task=api.getFeaturedArticle
 */
export async function fetchFeaturedArticle(): Promise<FeaturedArticle> {
  try {
    const response = await jaxios.get<FeaturedArticle>('',
      {params: {task: 'api.getFeaturedArticle', }});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.error("Błąd pobierania artykułu:", error.message);
        throw new Error(`Błąd API: ${error.response?.statusText || error.message}`);
    }
    throw error;
  }
}
