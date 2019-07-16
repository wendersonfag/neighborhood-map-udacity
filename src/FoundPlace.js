export const foudPlaces = () =>{
    let city = 'Limeira, SP';
    let query = 'Restaurante';
    let client_id = 'C33PYWD3T1LFNOUDJ3B3KS3IJKPJJSHLYWQBL0VEZN3TFGK0';
    let client_secret = 'JGMRB01VKUA2ARP2I454QA1I5TQA5JHAVWV1R1G3CAMIJZ5P';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id='+ client_id +'&client_secret='+ client_secret +'&v=20191407%10&limit=10&near=' + city + '&query=' + query + '';
    return fetch(apiURL)
    .then(resp => resp.json())
    .catch(error =>(
      alert(`Erro ao carregar os locais no mapa: ${error}`)
    ))
  }