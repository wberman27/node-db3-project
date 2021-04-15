const Schemes = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const scheme = await Schemes.findById(req.params.scheme_id)
    if(scheme){
      req.scheme = scheme
      next()
    }else{
      res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found` })
    }
  }catch(err){
    res.status(500).json(err.message)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try{
    if(!req.body.name || req.body.name === "" || typeof req.body.name !== "string"){
      res.status(400).json({message: "invalid scheme_name"})
    }else{
      next()
    }
  }catch(err){
    res.status(500).json(err.message)
  }
}


/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try{
    if(
      !req.body.step_number ||
      !req.body.instructions ||
      req.body.instructions === "" ||
      typeof req.body.instructions !== "string" ||
      req.body.step_number < 1 ||
      typeof req.body.step_number !== "number"
      ){
        res.status(400).json({message: "invalid step"})
      }else{
        next()
      }
  }catch(err){
    res.status(500).json(err.message)
  }
}


module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
