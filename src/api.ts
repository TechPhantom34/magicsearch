import { WhoogleResponse } from './types';

const BASE_URL = 'https://alenhero1001-whoogle.hf.space/search';

export async function searchWhoogle(query: string): Promise<WhoogleResponse> {
  if (!query.trim()) {
    return { query: '', results: [], search_type: '' };
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&format=json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Arama sonuçları çekilirken bir hata oluştu.');
  }

  return await response.json();
}
