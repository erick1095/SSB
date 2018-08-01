/**
 * MaletinController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {

    var paramObj = {

      name: req.param('name'),

    };

    Maletin.create(paramObj, function MaletinCreated(err, Maletin) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
       
      }
     

    });
  },

};

