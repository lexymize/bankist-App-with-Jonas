'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//////////////////////////
//display movements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    }  ${type} </div>
    <div class="movements__value">${Math.abs(mov)}€</div>
    </div>`;
    // <div class="movements__date">3 days ago</div>
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//////////////////////////////////
//calculating and displaying account balance
const calcBalance = function (movements) {
  const balance = movements.reduce((accum, curr) => accum + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
// calcBalance(account1.movements);
////////////////////
//creating usernames
const creatingUsernames = function (accts) {
  accts.forEach(acct => {
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatingUsernames(accounts);
//////////////////////////
//display summary
const displaySummary = function (accounts) {
  const deposit = accounts.movements
    .filter(dep => dep > 0)
    .reduce((accum, cur) => accum + cur, 0);
  labelSumIn.textContent = `${deposit}€`;
  const out = accounts.movements
    .filter(out => out < 0)
    .reduce((accum, cur) => accum + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = accounts
    .filter(dep => dep > 0)
    .map(dep => dep * (1.2 / 100))
    .filter(int => int >= 1)
    .reduce((accum, cur) => accum + cur, 0);
  // deposit * (1.2 / 100);
  labelSumInterest.textContent = `${interest}€`;
};
displaySummary(accounts);

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acct => acct.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI welcome message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //display balance
    calcBalance(currentAccount.movements);
    //display summary
    displaySummary(currentAccount.movements);
    //display movements
    displayMovements(currentAccount.movements);
  }
  console.log(currentAccount);
});
/////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
//slice method
console.log(arr.slice());
console.log(arr.slice(1));
console.log(arr.slice(2, 4));
console.log(arr.slice(2, -1));

//splice method
console.log(arr.splice(2, 3));
//reverse
console.log(arr2.reverse());
//concat
arr = ['a', 'b', 'c', 'd', 'e'];
const letters = arr.concat(arr2);
console.log(letters);
//join method
console.log(letters.join(' - '));
//other methods: includes,pop,shift,unshift,push,indexOf

//forEach method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, mov] of movements.entries()) {
  mov > 0
    ? console.log(`Movement ${i + 1}: You depoisted ${mov}`)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
}

console.log('-----------------');

movements.forEach((mov, i, arr) => {
  mov > 0
    ? console.log(`Movement ${i + 1}: You deposited ${mov} `)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)} `);
});

//forEach method on sets and maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});
const currenciesUnique = new Set(['EURO', 'GBP', 'USD', 'EURO', 'GBP']);
currenciesUnique.forEach((val, _, set) => {
  console.log(`${val}: ${_}`);
});

////// coding challenge 1
// test1:Jdata[3,5,2,12,7], kData [4,1,15,6,3]
//test2: j2[9,16,6,8,3],k2 [10,5,6,1,4]
const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCopy = dogsJulia.slice();
  juliaCopy.shift();
  juliaCopy.splice(-2);
  console.log(juliaCopy);
  const bothData = juliaCopy.concat(dogsKate);
  console.log(bothData);
  bothData.forEach(function (age, i) {
    const old =
      age < 3 ? 'still a puppy🐶' : `an adult and is ${age} years old`;
    console.log(`Dog number ${i + 1} is ${old}`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 6, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/// map method loops on array and returns new array
const euroToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUSD);

const movementDesc = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} `
);
console.log(movementDesc);
const deposit = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);
console.log(deposit);
console.log(withdrawal);

const max = movements.reduce(
  (accum, mov) => (accum > mov ? accum : mov),
  movements[0]
);
console.log(max);

//coding challenge
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(mov => {
      if (mov <= 2) return mov * 2;
      else if (mov > 2) return 16 + mov * 4;
    })
    .filter(mov => mov >= 18);
  const total = humanAge.reduce(
    (accum, cur, i, arr) => accum + cur / arr.length,
    0
  );
  return total;
};
const calcAverageHumanAge1 = function (ages) {
  const human = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((accum, age, i, arr) => accum + age / arr.length, 0);
  return human;
};
console.log(calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]));

//find method
const account = accounts.find(acct => acct.owner === 'Jessica Davis');
console.log(account);
const own = function (accounts) {
  for (const acc of accounts) {
    if (acc.owner === 'Jessica Davis') return acc;
  }
};
console.log(own(accounts));
