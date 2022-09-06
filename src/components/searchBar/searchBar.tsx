// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
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
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
  
  if (!searchedTerm || searchedTerm.trim() === '') {
    setErrorMessage('Your request is empty.')
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
    return
  }

  if (searchedTerm.trim().length < 3) {
    setErrorMessage('Your request must be at least 3 characters long.')
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
    return
  }

  if (searches.find(search => search.term === searchedTerm)) {
    setErrorMessage('Your request already exists, check search history.')
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
    return
  }

  createNewRequest(searchedTerm)
}

const createNewRequest = async (term: string) => {

  try {
  const response = await api.post('',  {"keyword": `${term}`});
  if (response.data.status === 400) {
    setErrorMessage('Your request failed, please try again.')
    setTimeout(() => {
      setErrorMessage('')
      return
    }, 5000)
    }
    const newRequest = {
      id: response.data.id,
      term: term,
    };
    setSearches(searches => [newRequest, ...searches]);
    setSearchedTerm('');
    localStorage.setItem("axursearch", JSON.stringify(searches))
  } catch(err: unknown) {
    if (axios.isAxiosError(err))  {
        if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      }
    }
  };
}


return (
  <>
  <form onSubmit={handleNewTerm}>
  <input
    value={searchedTerm}
    onChange={e => setSearchedTerm(e.target.value)}
    placeholder="Insira sua solicitação"
  />
  <button type="submit">Enviar</button>
  </form>
  {errorMessage && 
  <div>
    <span>{errorMessage}</span>
  </div>
  }
  </>
)
}

  
export default SearchBar;