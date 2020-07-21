let inputName = null;
let inputSubmit = null;

let divUsersFound = null;
let divUsersStatistics = null;

let statisticsMale = 0;
let statisticsFemale = 0;
let sumOfAges = 0;
let averageOfages = 0;

let allUsers = [];
let favoriteUsers = [];

window.addEventListener('load', () => {
  inputName = document.querySelector('#input-name');
  inputSubmit = document.querySelector('#input-submit');
  divUsersFound = document.querySelector('.users-found');
  divUsersStatistics = document.querySelector('.users-statistics');
  fetchUsers();
});

async function fetchUsers() {
  //prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture,
      age: dob.age,
      gender,
    };
  });
}
