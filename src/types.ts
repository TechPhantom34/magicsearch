export interface SearchResultItem {
  title: string;
  href: string;
  content: string;
  text: string;
}

export interface WhoogleResponse {
  query: string;
  results: SearchResultItem[];
  search_type: string;
}
