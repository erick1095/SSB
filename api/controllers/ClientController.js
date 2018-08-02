/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: function(req,res){
    Client.find({where:{owner:req.session.userId}}).populate("owner")
      .then(function(Clients){
          if(!Clients || Clients.lenght===0){
            return res.send({
              "success":false,
              "message":"No records found"
            })
          }
          return res.view("Client/index",{Clients:Clients})
      })
      .catch(function(err){
        sails.log.debug(err);
        return res.send({
          "success":false,"message":"Unable to fetch records"
        })
      })
  },
  create:function(req,res){
    sails.log.debug(req)
    var clientObject = {
      name: req.param("name"),
      lastName: req.param("lastName"),
      phoneNumber: req.param("phoneNumber"),
      email: req.param("email"),
      owner:req.session.userId
    }
    Client.create(clientObject).then(function(Client){
      return res.redirect("/api/Clients")
    })
    .catch(function(err){
      sails.log.debug(err)
      return res.send({
        "success":false,
        "message":"Unable to create record"
      })
    })
  },
  update:function(req,res){
    sails.log.debug(req.param("id"))
    var newClientObject = {
      name: req.param("name"),
      lastName: req.param("lastName"),
      phoneNumber: req.param("phoneNumber"),
      email: req.param("email"),
      owner:req.session.userId
    }
    sails.log.debug(newClientObject)
    Client.update(req.param("id"),newClientObject).then(function (Client) {
        return res.redirect("/api/Clients")
      })
      .catch(function (err) {
        sails.log.debug(err)
        return res.send({
          "success":false,
          "message":"Unable to update record"
        })
      })
    
    
  },
  updateGet: function(req,res){
    Client.findOne({id:req.param("id")}).then(function(Client){
       return res.view("Client/update",{Client:Client})
    })
  },
  delete: function(req,res){
    Client.destroy(req.param("id")).then(function(Client){
      return res.redirect("/api/Clients")
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

