import React from "react";
import {
  getSearchHistory,
  cleanSearchHistory,
  SearchTerm
} from "../../utils/editHistory";


function SearchHistory() {
const [searches, setSearches] = React.useState<SearchTerm[]>(getSearchHistory);

function cleanHistory() {
  cleanSearchHistory();
  setSearches([])
}


return (
  <>
  <div>
    <h2>Histórico de solicitações</h2>
  <button onClick={cleanHistory}>Limpar o histórico</button>
    <ul>
    {
    searches.map((term) => (
      <li key={term.id}>
        <span>
          <a href={`/${term.term}/${term.id}`}>
            {term.term}
          </a>
        </span>
      </li>
    ))
  }
    </ul>
  </div>
  </>
)
}

  
export default SearchHistory;