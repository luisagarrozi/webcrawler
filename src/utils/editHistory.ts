export type SearchTerm = {
  id: string;
  term: string;
}

export function getSearchHistory() {
  const oldItems = localStorage.getItem("axursearch");
  const searchItems = (oldItems ? JSON.parse(oldItems) : []) as SearchTerm[];
  return searchItems;
}


export function cleanSearchHistory() {
  localStorage.removeItem("axursearch");
}