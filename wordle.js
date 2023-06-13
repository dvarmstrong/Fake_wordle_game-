






















const options = {method: 'GET'};

fetch('https://words.dev-apis.com/word-of-the-day', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log(response))
  .catch(err => console.error(err));