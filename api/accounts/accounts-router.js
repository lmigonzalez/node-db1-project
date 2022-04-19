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
 res.json(req.account)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id',
 md.checkAccountId,
 md.checkAccountPayload,
 md.checkAccountNameUnique,
  (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
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
