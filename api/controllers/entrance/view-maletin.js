module.exports = {


  friendlyName: 'View maletin',


  description: 'Display "maletin" page.',


  exits: {

    success: {
      viewTemplatePath: 'Maletin/index',
    },

    redirect: {
      description: 'maletines',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    return exits.success();

  }


};
