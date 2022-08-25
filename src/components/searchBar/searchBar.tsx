import { useState } from "react";

function SearchBar() {

const [searchedTerm, setSearchedTerm] = useState('')

return (
  <>
  <form>
  <input
    value={searchedTerm}
    onChange={e => setSearchedTerm(e.target.value)}
    placeholder="Insira sua solicitação"
  />
  <button type="submit"></button>
  </form>
  </>
)
}

  
export default SearchBar;