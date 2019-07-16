export const google_maps = () => {
    return new Promise(function(resolve, reject) 
    {
      window.resolveGoogleMapsPromise = function() {
        resolve(window.google);
        delete window.resolveGoogleMapsPromise;
      }
      
      const script = document.createElement("script");
      const API_KEY = 'AIzaSyAGnH5LmSuPrkLL3Lok3kdB4O-k2n1u0hY';
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      script.onerror = () => (alert(`Erro ao carregar o mapa da API: ${script.src}`))
      document.body.appendChild(script); 
    
      
    });
    
    
  }

  