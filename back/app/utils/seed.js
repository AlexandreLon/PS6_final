
const {
  Application,
  Applicant,
  Appointment,
  Availabilities,
  Hour,
  Wish,
  Grade,
  Attachment,
} = require('../models');

const pathways = ['SI', 'GE', 'GB', 'ELEC'];
const names = [
  'Cool Guy',
  'Tandy Segers',
  'Shanda Morphis',
  'Kieth Vandenburg',
  'Cindy Baran',
  'Harvey Zeck',
  'Ronna Knight',
  'Catalina Rutten',
  'Moriah Steckel',
  'Corey Stricklin',
  'Marinda Schick',
  'Junko Ottesen',
  'Cleora Julia',
  'Clay Fordham',
  'Nickie Prudhomme',
  'Alysia Aceves',
  'Golda Hartle',
  'Harold Via',
  'Kari Gagliardo',
  'Dona Orrell',
  'Adaline Fader',
  'Cassondra Vandenbosch',
  'Bernadine Brogden',
  'Stephani Brickey',
  'Tamar Ginsberg',
  'Cherry Seay',
  'Liz Ryer',
  'Shirley Dupre',
  'Hertha Guard',
  'Alica Abila',
  'Theressa Oba',
  'Opal Hedges',
  'Susanna Heinemann',
  'Starr Westbury',
  'Earle Fredrickson',
  'Corine Unsworth',
  'Tommie Omeara',
  'Brenton Curran',
  'Kerri Rackley',
  'Mana Kasprzak',
  'Nelia Winton',
  'Gaynelle Hunsucker',
  'Ela Thorsen',
  'Brock Breunig',
  'Latosha Longoria',
  'Ernestina Cayetano',
  'Shavonne Colyer',
  'Kyung Chamberlain',
  'Hannelore Ishee',
  'Khadijah Nealon',
  'Elba Hochman',
  'Julie Demo',
  'Jean Demo',
];
const countries = [
  'Italie',
  'Espagne',
  'Allemagne',
  'Portugal',
  'Suisse',
  'Belgique',
  'UK',
  'Irlande',
  'Pays-bas',
  'Danemark',
  'Pologne',
  'Suède',
  'Norvège',
  'Finlande',
  'Slovaquie',
];
const types = [
  'Remise de mon dossier de candidature',
  'Formalités d\'inscription',
  'Questions dossier de candidature',
  'Formalités administratives pour le voyage',
  'Dossier de bourse',
  'Autre',
];
const objects = [
  'Je veux remettre mon dossier et poser quelques questions',
  'Questions sur les formalités d\'inscriptions dans l\'école',
  "J'aimerais avoir des détails sur mon dossier.",
  'Questions concernant mon inscription administrative ainsi que les formalités à remplir pour aller à l\'étranger.',
  'Je voudrais avoir des détails sur les bourses disponibles',
  'J\'ai plusieurs questions concernant les modalités du semestre à l\'étranger',
];
const status = [false, true];
const addresses = [
  'Avenue Général de Gaulle',
  'Rue de France',
  "Rue d'italie",
  'Rue de la république',
  'Rue du pont',
  "Rue d'angleterre",
  'Rue notre dame',
  "Rue de l'impasse",
];
const cities = [
  'Nice',
  'Saint laurent du Var',
  'Cagnes s/ mer',
  'Villeneuve Loubet',
  'Antibes',
  'Juan les Pins',
  'Vallauris',
  'Cannes',
  'Le Cannet',
  'Cannes la Bocca',
  'Fréjus',
  'Biot',
  'Grasse',
  'Carros',
  'Villefranche s/ mer',
  'Beaulieu',
  'Eze',
];
const zips = [
  '06000',
  '06700',
  '06800',
  '06270',
  '06160',
  '06160',
  '06220',
  '06400',
  '06110',
  '06150',
  '83600',
  '06410',
  '06130',
  '06510',
  '06230',
  '06310',
  '06360',
];

const categories = {
  erasmus: 'Erasmus',
  asie: 'Asie',
  afrique: 'Afrique',
  outOfEurope: 'Hors Europe',
  others: 'Autres accords',
};

const years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
const studiesLevel = ['Master', 'Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4'];
const establishments = {
  erasmus: [
    { establishment: 'Université de Mons', country: 'Belgique' },
    { establishment: 'University of Granada', country: 'Espagne' },
    { establishment: 'Universita degli Studi di Verona', country: 'Italie' },
    { establishment: 'AGH University of Science & Technology', country: 'Pologne' },
    { establishment: 'The University of Northumbria at Newcastle', country: 'Royaume-Uni' },
  ],
  asie: [
    { establishment: 'City University Hong Kong', country: 'Chine' },
    { establishment: 'Tongji University', country: 'Chine' },
    { establishment: 'Asian Institute of Technology', country: 'Vietnam' },
    { establishment: 'Université de Danang', country: 'Vietnam' },
    { establishment: "Xi'an Jiaotong University", country: 'Chine' },
  ],

  outOfEurope: [
    { establishment: 'Université Fédérale de Rio de Janeiro', country: 'Brésil' },
    { establishment: 'University of Windsor', country: 'Canada' },
    { establishment: 'Université du Québec à Trois-Rivières', country: 'Canada' },
    { establishment: 'Université Bishop', country: 'Canada' },
    { establishment: 'University of Oklahoma', country: 'USA' },
  ],
  afrique: [
    { establishment: "Institut Africain d'Informatique", country: 'Cameroun' },
    { establishment: "Institut Africain d'Informatique", country: 'Togo' },
    { establishment: "Institut Africain d'Informatique", country: 'Cameroun' },
    { establishment: "Institut Africain d'Informatique", country: 'Togo' },
    { establishment: "Institut Africain d'Informatique", country: 'Cameroun' },
  ],
  others: [
    { establishment: 'Universidad Nacional del Litoral', country: 'Argentine' },
    { establishment: 'Bern University of Applied Sciences', country: 'Suisse' },
    { establishment: 'Université Abdelmalek Essaadi', country: 'Maroc' },
    { establishment: 'Politecnico di Bari', country: 'Italie' },
    { establishment: 'Instituto Federal do Espirito Santo IFES', country: 'Brésil' },
  ],
};

const teachers = ['Mr Blanc', 'Mme Prune', 'Mr Chigno', 'Mme Case', 'Mr Long', 'Mme Coletta'];

const pastStudies = [
  [
    { establishment: 'Lycée Thierry Maulnier', year: '2016', lvl: 'Bac' },
    { establishment: 'IUT de Nice', year: '2017', lvl: 'Bac + 1' },
    { establishment: 'IUT de Nice', year: '2018', lvl: 'Bac + 2' },
  ],
  [
    { establishment: 'Lycée Jules-Ferry', year: '2016', lvl: 'Bac' },
    { establishment: 'Peip', year: '2017', lvl: 'Bac + 1' },
    { establishment: 'Peip', year: '2018', lvl: 'Bac + 2' },
  ],
  [
    { establishment: 'Lycée Régional Simone Veil', year: '2016', lvl: 'Bac' },
    { establishment: 'Lycée Bonaparte', year: '2017', lvl: 'Bac + 1' },
    { establishment: 'Lycée Bonaparte', year: '2018', lvl: 'Bac + 2' },
  ],

];

const attachments = [
  { url: '/', name: 'Lettre de motivation' },
  { url: '/', name: 'Contrat d’études' },
  { url: '/', name: 'Budget prévisionnel' },
  { url: '/', name: 'Curriculum Vitae' },
];

Date.prototype.getWeek = function () {
  const onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

/**
 * Generate random value beetween min and max (included)
 * @param {int} vMin
 * @param {int} vMax
 * @return integer
 */
function getRandomNumber(vMin, vMax) {
  return Math.floor(Math.random() * (vMax - vMin + 1) + vMin);
}

/**
 * Generates random timestamp
 * This timestamp will always be a work day beetween 8h am and 6h pm in 2019
 * Doesn't take account holidays (and summer holidays)
 */
function getRandomTimestamp() {
  const day0 = 1546819200;
  const duration_day = 86400;
  const start_day = 28800;
  const duration_hour = 3600;

  const r_week = getRandomNumber(0, new Date().getWeek());
  const r_day = getRandomNumber(0, 4);
  const r_hour = getRandomNumber(0, 9);
  const r_minute = getRandomNumber(0, 3);

  return (
    day0
    + r_week * 7 * duration_day
    + r_day * duration_day
    + start_day
    + duration_hour * r_hour
    + r_minute * 15 * 60
  );
}

function dateAlreadyUsed(timestamp) {
  let used = false;
  Appointment.get().forEach((e) => {
    if (e.starting_date == timestamp) {
      used = true;
    }
  });
  return used;
}

function getRandomDateAppointement() {
  let date;
  const start_day = 28800;
  const duration_hour = 3600;
  const r_hour = getRandomNumber(0, 9);
  const r_minute = getRandomNumber(0, 3);
  const current = new Date();
  do {
    const plus = getRandomNumber(0, 3);
    const min = plus === 0 ? current.getDate() : 1;
    date = new Date(current.getFullYear(), current.getMonth() + plus, getRandomNumber(min, current.getDate()));
  } while (date.getDay() === 0 || date.getDay() === 6);
  return date.getTime() / 1000 - date.getTimezoneOffset() * 60 + start_day + duration_hour * r_hour
  + r_minute * 15 * 60;
}

/**
 * Gets a random timestamp between 1st jan 2019 and an hour before the current time.
 */
function getAnyTimestampBeforeNow() {
  const start = 1546300800;
  const current = Math.trunc(new Date().getTime() / 1000) - 3600;
  return getRandomNumber(start, current);
}

/**
 * Generate random address
 * @return array['address', 'city', 'zip']
 */
function getRandomAddress() {
  const id = getRandomNumber(0, zips.length - 1);
  return [
    addresses[getRandomNumber(0, addresses.length - 1)],
    cities[id],
    zips[id],
  ];
}

/**
 * Generate random phone number
 * @param {boolean} mobile // True if mobile number else if fixe
 * @return string
 */
function getRandomPhoneNumber(mobile) {
  let number = '0';
  if (mobile) number += '6';
  else number += '4';
  for (let i = 0; i < 8; i++) number += getRandomNumber(0, 9);
  return number;
}

/**
 * Return a random wish corresponding to a country and a priority
 * @param priority
 * @param country
 * @returns {*}
 */
function getRandomWish(priority, country) {
  let wish = wishLists[country][0][getRandomNumber(0, 9)];

  while (wish.priority != priority) {
    wish = wishLists[country][0][getRandomNumber(0, 9)];
  }
  return wish.id;
}

function getRandomGrade(year) {
  let grade = Grade.getById(getRandomNumber(0, 14));
  while (grade.year != year) {
    grade = Grade.getById(getRandomNumber(0, 14));
  }
  return grade.id;
}

console.log('======== Starting seeding =========');
console.log('Removing all existing elements');
console.log('Removing Applications');

Application.get().forEach(e => Application.delete(e.id));

console.log('Removing Appointments');

Appointment.get().forEach(e => Appointment.delete(e.id));

console.log('Removing Applicants');

Applicant.get().forEach(e => Applicant.delete(e.id));

console.log('Removing availablities');
Availabilities.get().forEach((e) => {
  Availabilities.delete(e.id);
});

console.log('Removing availablity hours');
Hour.get().forEach(e => Hour.delete(e.id));

console.log('Removing wishes');
Wish.get().forEach(e => Wish.delete(e.id));

console.log('Removing grades');
Grade.get().forEach(e => Grade.delete(e.id));

console.log('Removing attachments');
Attachment.get().forEach(e => Attachment.delete(e.id));

console.log('Deletion success');
console.log('Starting create new elements');
let i = 0;

console.log('Creating wishes');

const catKeys = Object.keys(establishments);
const catLength = catKeys.length;

const wishLists = {
  erasmus: [], asie: [], afrique: [], others: [], outOfEurope: [],
};


for (i = 0; i < catLength; i++) {
  const wishList = [];

  for (let j = 0; j < 10; j++) {
    const universityIndex = getRandomNumber(0, 4);
    const establishment = establishments[catKeys[i]][universityIndex].establishment;
    const country = establishments[catKeys[i]][universityIndex].country;

    const currentWish = Wish.create({
      id: i * 10 + j,
      priority: j % 3 + 1,
      university: establishment,
      country,
      in_charge_teacher: teachers[getRandomNumber(0, teachers.length - 1)],
    });

    wishList.push(currentWish);
  }
  wishLists[catKeys[i]].push(wishList);
}


// // Create wishList
// const folders = Object.keys(establishments);
//
// folders.forEach(folder =>{
//   for (i = 0; i < 10; i++) {
//     const wishList = [];
//
//
//         for (let j = 1; j < i % 3 + 2; j++) {
//
//             let wishrdm = getRandomWish(j,folder)
//
//             wishList.push(wishrdm);
//         }
//       wishLists[folder].push(wishList);
//
//   }
//
// });

const finalWishLists = {
  erasmus: [], asie: [], afrique: [], others: [], outOfEurope: [],
};
const keys = Object.keys(finalWishLists);

for (let j = 0; j < keys.length; j++) {
  for (let nb = 0; nb < 10; nb++) {
    const wishList = [];
    // Select a random number of wishes between 0 and 3
    wishesNumber = getRandomNumber(1, 3);
    for (i = 0; i < wishesNumber; i++) {
      // Select a wish random

      wishList.push(getRandomWish(i + 1, keys[j]));
    }
    finalWishLists[keys[j]].push(wishList);
  }
}

console.log('Wishes created with success');

console.log('Creating grades');
for (i = 0; i < 5; i++) {
  const index = getRandomNumber(0, 2);
  for (let j = 0; j < 3; j++) {
    Grade.create({
      id: i * 3 + j,
      year: pastStudies[index][j].year,
      studies_level: pastStudies[index][j].lvl,
      establishment: pastStudies[index][j].establishment,
      grade: getRandomNumber(10, 19),
    });
  }
}
// Create GradeList
const gradesLists = [];

for (i = 0; i < 5; i++) {
  const gradeList = [];
  for (let j = 2016; j < 2019; j++) {
    gradeList.push(getRandomGrade(j));
  }
  gradesLists.push(gradeList);
}

console.log('Grades created with success');

console.log('Creating attachments');


for (i = 0; i < 4; i++) {
  Attachment.create({
    id: i,
    url: attachments[i].url,
    name: attachments[i].name,

  });
}

console.log('Attachments created with success');


console.log('Creating Applicants');


names.forEach((name) => {
  const split_name = name.split(' ');
  const address = getRandomAddress();
  Applicant.create({
    id: i,
    gender: getRandomNumber(0, 1) == 0 ? 'F' : 'H',
    firstname: split_name[0],
    lastname: split_name[1],
    pathways: pathways[getRandomNumber(0, pathways.length - 1)],
    birth_date: `${getRandomNumber(1, 28)}/${getRandomNumber(
      1,
      12,
    )}/${getRandomNumber(1997, 2000)}`,
    student_number: `21${getRandomNumber(4, 9)}${getRandomNumber(
      0,
      9,
    )}${getRandomNumber(0, 9)}${getRandomNumber(0, 9)}${getRandomNumber(
      0,
      9,
    )}${getRandomNumber(0, 9)}`,
    nationality: 'Française',
    address: address[0],
    city: address[1],
    zip: address[2],
    mobile: getRandomPhoneNumber(true),
    phone: getRandomPhoneNumber(false),
    email: `${split_name[0].toLowerCase()}.${split_name[1].toLowerCase()}@etu.univ-cotedazur.fr`,
    last_year_path: Grade.getById(gradesLists[getRandomNumber(0, 4)][2]).establishment,
    agreement_personnal_data: true,
    grades_since_bac: gradesLists[getRandomNumber(0, 4)],
  });
  i++;
});

console.log('Applicants created with success');
console.log('Creating Applications');

for (i = 0; i < 100; i++) {
  const category = Object.keys(categories)[getRandomNumber(0, 4)];
  Application.create({
    id: i,
    date: getAnyTimestampBeforeNow(),
    applicant_id: Applicant.get()[
      getRandomNumber(0, Applicant.get().length - 1)
    ].id,
    status: getRandomNumber(0, 9) === 0 ? status[0] : status[1],
    category: categories[category],
    year: '2019-2020',
    signature_date: getAnyTimestampBeforeNow(),
    signature_place: cities[getRandomNumber(0, cities.length - 1)],
    wishes: finalWishLists[category][0],
    attachments: [0, 1, 2, 3],

  });
}

console.log('Applications created with success');
console.log('Creating Appointments');

for (i = 0; i < 1000; i++) {
  const after = getRandomNumber(0, 5) === 0;
  let date;
  do {
    date = after ? getRandomDateAppointement() : getRandomTimestamp();
  } while (dateAlreadyUsed(date));
  const num = getRandomNumber(0, types.length - 1);
  Appointment.create({
    id: i,
    applicant_id: Applicant.get()[getRandomNumber(0, names.length - 1)].id,
    starting_date: date,
    ending_date: date + 900, // 900 equals 15 minutes
    type: types[num],
    object: objects[num],
    status: after && getRandomNumber(0, 8) === 0 ? status[0] : status[1],
  });
}

console.log('Appointments created with success');

console.log('Creating hours of availability');
for (let i = 0; i < 40; i++) {
  if (i % 4 === 0) {
    Hour.create({
      id: i,
      hour: Math.trunc(i / 4 + 8),
      minute: 0,
    });
  } else if (i % 4 === 1) {
    Hour.create({
      id: i,
      hour: Math.trunc(i / 4 + 8),
      minute: 15,
    });
  } else if (i % 4 === 2) {
    Hour.create({
      id: i,
      hour: Math.trunc(i / 4 + 8),
      minute: 30,
    });
  } else {
    Hour.create({
      id: i,
      hour: Math.trunc(i / 4 + 8),
      minute: 45,
    });
  }
}

console.log('Availability hours created with success');

console.log('Creating availabilities');

const monday = [];
const tuesday = [];
const wednesday = [];
const thursday = [];
const friday = [];

let tab = [];
for (let i = 0; i < 40; i++) tab.push(i);
for (let i = 0; i < getRandomNumber(0, 10); i++) {
  const r = getRandomNumber(0, tab.length - 1); // to get only even numbers
  monday.push(tab[r]);
  tab.splice(r, 1);
}

tab = [];
for (let i = 0; i < 40; i++) tab.push(i);
for (let i = 0; i < getRandomNumber(0, 10); i++) {
  const r = getRandomNumber(0, tab.length - 1); // to get only even numbers
  tuesday.push(tab[r]);
  tab.splice(r, 1);
}

tab = [];
for (let i = 0; i < 40; i++) tab.push(i);
for (let i = 0; i < getRandomNumber(0, 10); i++) {
  const r = getRandomNumber(0, tab.length - 1); // to get only even numbers
  wednesday.push(tab[r]);
  tab.splice(r, 1);
}

tab = [];
for (let i = 0; i < 40; i++) tab.push(i);
for (let i = 0; i < getRandomNumber(0, 10); i++) {
  const r = getRandomNumber(0, tab.length - 1); // to get only even numbers
  thursday.push(tab[r]);
  tab.splice(r, 1);
}

tab = tab = [];
for (let i = 0; i < 40; i++) tab.push(i);
for (let i = 0; i < getRandomNumber(0, 10); i++) {
  const r = getRandomNumber(0, tab.length - 1); // to get only even numbers
  friday.push(tab[r]);
  tab.splice(r, 1);
}

Availabilities.create({
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
});

console.log('Availabilities created with success');


console.log('======== End seeding =========');
