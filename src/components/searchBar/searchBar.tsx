import React from "react";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import {
  getSearchHistory,
  SearchTerm
} from "../../utils/editHistory";


function SearchBar() {
const [searchedTerm, setSearchedTerm] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const [searches, setSearches] = React.useState<SearchTerm[]>(getSearchHistory);

const handleNewTerm = (e: FormEvent) => {
  e.preventDefault();

  if (!searchedTerm || searchedTerm.trim() === '') {
    setErrorMessage('Your request is empty.')
    return
  }

  if (searchedTerm.trim().length < 3) {
    setErrorMessage('Your request must be at least 3 characters long.')
    return
  }

  if (searches.find(search => search.term === searchedTerm)) {
    setErrorMessage('Your request already exists, check search history.')
    return
  }

  createNewRequest(searchedTerm)
}

const createNewRequest = async (term: string) => {

  const response = await api.post('/', { term });
  if (response.data.status === 400) {
  setErrorMessage('Your request failed, please try again.')
  }
  const newRequest = {
    id: response.data.id,
    term: term,
  };

  setSearches([...searches, newRequest]);
  setSearchedTerm('');
}


return (
  <>
  <form onSubmit={handleNewTerm}>
  <input
    value={searchedTerm}
    onChange={e => setSearchedTerm(e.target.value)}
    placeholder="Insira sua solicitação"
  />
  <button type="submit"></button>
  </form>
  <div>
    <span>{errorMessage}</span>
  </div>
  </>
)
}

  
export default SearchBar;