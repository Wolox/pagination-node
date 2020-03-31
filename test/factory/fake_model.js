const faker = require('faker');

const fakeModel = () => ({
  id: faker.random.number(99) + 1,
  name: faker.name.findName(),
  age: faker.random.number(70) + 10
});

exports.fakeModels = (length = 1) => {
  const models = [];
  for (let i = 0; i < length; i++) {
    models.push(fakeModel());
  }
  return models;
};
