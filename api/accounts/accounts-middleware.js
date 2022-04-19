const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const name = req.body.name
  const budget = req.body.budget
  
  if(name === undefined || budget === undefined){
    res.status(400).json({ message: "name and budget are required" })
  }
  else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if(typeof budget !== 'number' || isNaN(budget)){
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if(budget < 0 || budget > 1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  }else{
    next()
  }

  // if(error.message){
  //   next(error)
  // }else{
  //   next()
  // }

  
}

exports.checkAccountNameUnique = async(req, res, next) => {
  try{
    const existing = await db('accounts').where('name',
    req.body.name.trim())
    .first()
    if(existing){
      next({status: 400, message: "that name is taken"})
    }else{
      next()
    }
  }
  catch(err){
  next(err) 
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC

  const account = await Account.getById(req.params.id)
  try{
    if(!account){
      res.status(404).json({message: "account not found"})
    }
    else{
      req.account = account
      next()
    }
  } catch(err){
    next(err)
  }
   
  
}
