const contentContainer = document.getElementById('content');
const navLinks = document.querySelectorAll('nav a');

const pages = {
  dashboard: 'dashboard.html',
  institution: 'institution.html',
  'unit-list': 'unit-list.html',
  'unit-assessment': 'Unit_Assessment.html',
  'previously-assessed': 'previously-assessed.html',
};

function loadPage(pageName) {
  const pageUrl = pages[pageName];
  if (pageUrl) {
    fetch(pageUrl)
      .then(response => response.text())
      .then(content => {
        contentContainer.innerHTML = content;
        if (pageName === 'unit-assessment') {
          // Your Unit_Assessment.html JavaScript code here
          // (The code you provided for handling interactions)
        }
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const pageName = event.target.getAttribute('href').substring(1);
    loadPage(pageName);
  });
});

loadPage('dashboard');
