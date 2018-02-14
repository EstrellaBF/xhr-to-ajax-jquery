window.addEventListener('load', function(e){
  // Creando variables
  const $form = $('#search-form');
  const $searchField = $('#search-keyword');
  const $responseContainer = $('#response-container');
  let searchedForText;
  // Agregando el evento de form
  $form.submit(function(e){
    // console.log(e.target);
    // Se detiene su función por defecto, ya que la página no debe recargarse 
    e.preventDefault();
    // Se limpia el contenido
    $responseContainer.html('');
    // se almacena el texto escrito en el input en la variable searchedForText
    searchedForText = $searchField.val();
    //llamando función getNews()
    getNews();
  });

  // Declarando función getNews
  function getNews() {
    // // Se instancia el objeto XHR y se almacena en la variable
    // const articleRequest = new XMLHttpRequest();
    // // Se abre una nueva solicitud en este caso, pidiendo la api con GET 
    // // En la documentación se indica la ruta : http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=####
    // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=347d672874fd431eb13860e1a3f4d50b`);
    // articleRequest.onload = addNews;
    // articleRequest.onerror = handleError;
    // // Enviando solicitud
    // articleRequest.send();
    // // console.log(articleRequest); //XMLHttpRequest {onreadystatechange: null, readyState: 1, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  $.ajax({
    url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=347d672874fd431eb13860e1a3f4d50b`
  }).done(addNews).fail(handleError);
  }

  // función handleError
  function handleError() {
    console.log('Se ha presentado un error');
  }

  // Función addNews
  function addNews(news) {
    // console.log(news)
    const articles = news.response.docs;
    articles.forEach(function(article) {
      const title = article.headline.main;
      const snippet = article.snippet;
      // let $p = $('<p />').addClass('articleClass').text(title);
      // let $li = $('<li />').addClass('articleClass').text(snippet);
      $responseContainer.append(`<div class="articleClass"><li>${title}</li><li>${snippet}`);
      // $responseContainer.append($li);
    });
  }
});