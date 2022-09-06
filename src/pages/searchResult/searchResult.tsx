import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

function SearchResult() {
  const [urls, setUrls] = useState([])

 const params = useParams();
 const id = params.id;
 const term = params.term
  
 async function getData() {
 const requestData = await api.get(`/${id}`);
 setUrls(requestData.data.urls);
 }

 getData()
 return (
  <div className="search-result">
    <h1 className="search-result-title">{term}</h1>
    {urls?.length > 0 ? (
    urls.map(url => (
        <a key={url} href={url} className="search-result-link">
          <span className="search-result-url">{url}</span>
      </a>
     ))) : (
      <h2>Your request has no results</h2>
     )}
  </div>
 );
}

export default SearchResult;