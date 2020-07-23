let allUsers = [];
let filterUsers = [];

let numberOfUsers = 0;
let statisticsMale = 0;
let statisticsFemale = 0;
let sumOfAges = 0;
let averageOfAges = 0;

window.addEventListener('load', () => {
  fetchUsers();
  filter();
});

async function fetchUsers() {
  //prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture: picture.medium,
      age: dob.age,
      gender,
    };
  });
}

function render() {
  function renderListOfFilter() {
    const divUsersFound = document.querySelector('.users-found');
    let usersFoundHTML = '<div>';
    filterUsers.forEach((user) => {
      const { name, picture, age, gender } = user;
      let userFoundHTML = `
        <div class="user">
          <div>
            <img class="avatar" src="${picture}" alt="${name}"/>
          </div>
          <div>
            <span class="user-informations">${name}, ${age}<span>
          </div>
        </div>
      `;
      usersFoundHTML += userFoundHTML;
    });
    usersFoundHTML += '</div>';
    divUsersFound.innerHTML = usersFoundHTML;
  }

  function renderStatistics() {
    const divUsersStatistics = document.querySelector('.users-statistics');
    let statisticsHTML = `
    <div>
      <span><strong>Sexo Masculino:</strong> ${statisticsMale}</span>
      </br>
      <span><strong>Sexo Feminino:</strong> ${statisticsFemale}</span>
      </br>
      <span><strong>Soma das idades:</strong> ${sumOfAges}</span>
      </br>
      <span><strong>Média das idades:</strong> ${averageOfAges}</span>
    </div>
    `;
    divUsersStatistics.innerHTML = statisticsHTML;
  }

  renderStatistics();
  renderListOfFilter();
}

function filter() {
  preventFormSubmit();
  const buttonSubmit = document.querySelector('#input-submit');
  buttonSubmit.addEventListener('click', filteringUsers);

  function filteringUsers() {
    const inputString = document.querySelector('#input-name');
    const inputStringValue = inputString.value.toLowerCase().trim();
    filterUsers = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(inputStringValue);
    });
    showNumberOsUsersFound();
    calcStatistics();
  }

  function showNumberOsUsersFound() {
    numberOfUsers = document.querySelector('#numberOfUsers');
    numberOfUsers.textContent = filterUsers.length;
  }

  function preventFormSubmit() {
    form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
      event.preventDefault();
    }
  }
}

function calcStatistics() {
  function allMales() {
    statisticsMale = filterUsers.reduce((accumulator, current) => {
      return current.gender === 'male' ? (accumulator += 1) : accumulator;
    }, 0);
  }
  function allFemales() {
    statisticsFemale = filterUsers.reduce((accumulator, current) => {
      return current.gender === 'female' ? (accumulator += 1) : accumulator;
    }, 0);
  }
  function sum() {
    sumOfAges = filterUsers.reduce((accumulator, current) => {
      return (accumulator += current.age);
    }, 0);
  }
  function average() {
    averageOfAges = sumOfAges / filterUsers.length;
  }
  allMales();
  allFemales();
  sum();
  average();
  render();
}
