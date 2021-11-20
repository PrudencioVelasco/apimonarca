const ConQuienVisito = require('../models/conquienvisito'); 
todosConQuienVisito = (req, res) => {
    ConQuienVisito.todosConQuienVisito((err, data) => {
      if (err)
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send({
        success: true,
        message: "Exito",
        data: data
      });
    });
  }; 
  
module.exports = {
    todosConQuienVisito
  }