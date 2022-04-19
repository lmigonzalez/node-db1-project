const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
  .then(accounts =>{
    res.status(200).json(accounts)
  })
  .catch(err=>{
    next(err)
  })
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC

 res.status(201).json(req.account)
})


router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
 try{
   req.body.name = req.body.name.trim()
   const newAccount = await Account.create(req.body)

   res.status(201).json(newAccount)
 }
 catch(err){
  next(err)
 }

})

router.put('/:id',
 md.checkAccountId,
 md.checkAccountPayload,
  async (req, res, next) => {
  // DO YOUR MAGIC
  const update = await Account.updateById(req.params.id, req.body)
  res.json(update)
});

router.delete('/:id', md.checkAccountId,(req, res, next) => {
  // DO YOUR MAGIC
  // try{
  //   await Account.deleteById(req.params.id)
  //   res.json(req.account)
  // }
  // catch(err){
  //   next(err)
  // }
  Account.deleteById(req.params.id)
  .then(account=>{
    res.status(201).json(account)
  })
  .catch(err=>{
    next(err)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})


router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    message: err.message,
  })
})
module.exports = router;
