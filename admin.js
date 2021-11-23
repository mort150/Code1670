const express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
    res.render('adminIndex')
})
router.get('/addStaff',(req,res)=>{
    res.render('addStaff')
})
module.exports = router;