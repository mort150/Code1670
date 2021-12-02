const express = require('express')
const app = express()
const session = require('express-session')
const { CheckUserRole } = require('./databaseHandler')
const { requiredLogin } = require('./projectLibrary')
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 1000 }, saveUninitialized: false, resave: false }))
app.use(express.static('public'))


app.get('/', requiredLogin, (req, res) => {
    const user = req.session["User"]
    res.render('index', { userInfo:user })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const name = req.body.txtName
    const pass = req.body.txtPass
    const role = await CheckUserRole(name, pass)
    if (role == -1) {
        res.render('login')
    } else {
        req.session["User"] = {
            name: name,
            role: role
        }
    }
    console.log("Ban dang dang nhap voi role la: " + role)
    res.render('index')
    // res.redirect('/index')
})



const adminController = require('./admin')
app.use('/admin', adminController)

// const staffController = require('./staff')
// app.use('/staff',staffController)

// const trainerController = require('./trainer')
// app.use('/trainer',trainerController)
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running with " + PORT)