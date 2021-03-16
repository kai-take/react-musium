 
 const search = searchValue => { 
  setLoading(true);
  setErrorMessage(null);

  

  
  
  
  
  fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`) 
  

    
    
    .then(response => {
      
      return response.json()
    })
       
    .then(jsonResponse => {
      
      if (jsonResponse.Response === "True") { 
        setMovies(jsonResponse.Search);
        setLoading(false);
      } else { 
        setErrorMessage(jsonResponse.Error); 
                                            
        setLoading(false);
      }
    });
  };