const result = require('./result.hbs');

const searchForm = document.querySelector('.search-form');
const resultsContainer = document.querySelector('.results');


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Clicked');

  const formData = new FormData(searchForm);

  axios.get(`https://iruka.herokuapp.com/api/organizations/${formData.get('organization')}`)
    .then((response) => {
      response.data.forEach((data) => {
        resultsContainer.innerHTML += result({
          title: data.title,
          repo: data.link,
          language: data.language,
          labels: data.labels,
        });
      });
    });
});

window.addEventListener('load', (e) => {
  resultsContainer.innerHTML = result({
    title: 'Title',
    repo: 'Repo',
    lanaguage: 'Language',
    labels: 'Labels',
  });
});

document.querySelector('#refresh-btn').addEventListener('click', (e) => {
  axios.post('https://iruka.herokuapp.com/api/users')
    .then((res) => {
      if (res.status === 200) {
        console.log('Refreshed data');
      } else {
        console.log(res);
      }
    }).catch((err) => {
      console.error(err);
    });
});
