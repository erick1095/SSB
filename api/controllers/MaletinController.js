/**
 * MaletinController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Este metodo es usado para buscar todos los maletines que estan registrados en el sistema pero solo del usuario que esta logueado
  get: function(req,res){
    Maletin.find({where:{owner:req.session.userId}}).populate("owner")
      .then(function(Maletines){
          if(!Maletines || Maletines.lenght===0){
            return res.send({
              "success":false,
              "message":"No records found"
            })
          }
          return res.view("Maletin/index",{Maletines:Maletines})
      })
      .catch(function(err){
        sails.log.debug(err);
        return res.send({
          "success":false,"message":"Unable to fetch records"
        })
      })
  },
  //Este metodo se usa para crear nuevos maletines
  create:function(req,res){
    sails.log.debug(req)
    var maletinObject = {
      name: req.param("name"),
      status:"available",
      owner:req.session.userId
    }
    Maletin.create(maletinObject).then(function(Maletin){
      return res.redirect("/api/Maletines")
    })
    .catch(function(err){
      sails.log.debug(err)
      return res.send({
        "success":false,
        "message":"Unable to create record"
      })
    })
  },
  //Con este metodo actualizamos los maletines creados
  update:function(req,res){
    sails.log.debug(req.param("id"))
    var newMaletinObject = {
      name: req.param("name"),
      owner:req.session.userId
    }
    sails.log.debug(newMaletinObject)
    Maletin.update(req.param("id"),newMaletinObject).then(function (Maletin) {
        return res.redirect("/api/Maletines")
      })
      .catch(function (err) {
        sails.log.debug(err)
        return res.send({
          "success":false,
          "message":"Unable to update record"
        })
      })
    
    
  },
  //este metodo te redirecciona a una vista donde puedes editar el maletin seleccionado
  updateGet: function(req,res){
    Maletin.findOne({id:req.param("id")}).then(function(Maletin){
       return res.view("Maletin/update",{Maleta:Maletin})
    })
  },
  //Este metodo elimina el maletin seleccionado
  delete: function(req,res){
    Maletin.destroy(req.param("id")).then(function(Maletin){
      return res.redirect("/api/Maletines")
    })
    .catch(function(err){
      sails.log.debug(err)
        return res.send({
          "success":false,
          "message":"Unable to delete record"
        })
    })
  }
};

