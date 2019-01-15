const result = require('./result.hbs');

const searchForm = document.querySelector('.search-form');
const resultsContainer = document.querySelector('.results');
const refreshButton = document.querySelector('#refresh-btn');


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  resultsContainer.innerHTML = result({
    title: 'Title',
    repo: 'Repo',
    language: 'Language',
    labels: 'Labels',
    dark: false,
  });

  const formData = new FormData(searchForm);

  resultsContainer.style.opacity = '100';
  resultsContainer.style.marginTop = '16px';

  const htmlItems = [];

  function slowEach(array, interval, callback) {
    if (!array.length) return;
    let i = 0;
    function next() {
      if (callback(array[i], i) !== false) {
        i += 1;
        if (i < array.length) {
          setTimeout(next, interval);
        }
      }
    }
    next();
  }


  axios.get(`https://iruka.herokuapp.com/api/organizations/${formData.get('organization')}`)
    .then((response) => {
      let dark = true;
      response.data.forEach((data) => {
        let repo = data.link.substring(19);
        repo = repo.substring(0, repo.lastIndexOf('/'));
        repo = repo.substring(0, repo.lastIndexOf('/'));
        htmlItems.push(result({
          title: data.title,
          repo,
          language: data.language,
          labels: data.labels,
          url: data.link,
          dark,
        }));
        dark = !dark;
      });
      slowEach(htmlItems, 150, (element) => {
        resultsContainer.innerHTML += element;
      });
    });
});

let deg = 0;
refreshButton.addEventListener('click', (e) => {
  axios.post('https://iruka.herokuapp.com/api/users')
    .then((res) => {
      if (res.status === 200) {
        console.log('Refreshed data');
        deg += 360;
        const image = refreshButton.childNodes[1];
        image.style.transform = `rotate(${deg}deg)`;
      } else {
        console.log(res);
      }
    }).catch((err) => {
      console.error(err);
    });
});
