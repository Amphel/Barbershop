'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Appointments', [{
      datetime: new Date(2022, 2, 3, 11, 30, 0, 0),
      name: 'Doe',
      phone: '+7 999 999 99 99',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      datetime: new Date(2022, 2, 3, 10, 30, 0, 0),
      name: 'John',
      phone: '+7 999 888 88 88',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Appointments', null, {});
  }
};
