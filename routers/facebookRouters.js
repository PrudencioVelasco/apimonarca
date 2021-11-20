const facebookController = require('../controllers/facebookController'); 
module.exports = app => {  
    app.post("/monarca/facebook/singInFacebook", facebookController.singInFacebook);  
}
