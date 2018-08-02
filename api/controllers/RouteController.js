/**
 * RouteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: function(req,res){
    Route.find({where:{owner:req.session.userId}}).populate("owner")
      .then(function(Routes){
          if(!Routes || Routes.lenght===0){
            return res.send({
              "success":false,
              "message":"No records found"
            })
          }
          return res.view("Route/index",{Routes:Routes})
      })
      .catch(function(err){
        sails.log.debug(err);
        return res.send({
          "success":false,"message":"Unable to fetch records"
        })
      })
  },
  simulator: function(req,res){
    Route.find({where:{owner:req.session.userId}}).populate("owner")
      .then(function(Routes){
          if(!Routes || Routes.lenght===0){
            return res.send({
              "success":false,
              "message":"No records found"
            })
          }
          return res.view("Simulador/simulador",{Routes:Routes})
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
    var routeObject = {
      name: req.param("name"),
      origin: req.param("origin"),
      destination: req.param("destination"),
      owner:req.session.userId
    }
    Route.create(routeObject).then(function(Route){
      return res.redirect("/api/Routes")
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
    var newRouteObject = {
      name: req.param("name"),
      origin: req.param("origin"),
      destination: req.param("destination"),
      owner:req.session.userId
    }
    sails.log.debug(newRouteObject)
    Route.update(req.param("id"),newRouteObject).then(function (Route) {
        return res.redirect("/api/Routes")
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
    Route.findOne({id:req.param("id")}).then(function(Route){
       return res.view("Route/update",{Route:Route})
    })
  },
  delete: function(req,res){
    Route.destroy(req.param("id")).then(function(Route){
      return res.redirect("/api/Routes")
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

