const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Maybe this has to be put in a seperate file
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

router.get('/users/me', function (req, res) {
    try {
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me', function (req, res) {
    try {
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:userID', function (req, res) {
    try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/:userID', function (req, res) {
    try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:userID/booklists', function (req, res) {
    try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/:userID/booklists', function (req, res) {
    try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:userID/booklists/:booklistID', function (req, res) {
    try {
        // Access userId via: req.params.userID
        // Access booklistID via: req.params.booklistID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/:userID/booklists/:booklistID', function (req, res) {
    try {
        // Access userId via: req.params.userID
        // Access booklistID via: req.params.booklistID
    } catch (error) {
        res.status(500).send(error)
    }
})

/*router.get('/user/:userID/reviews', function (req, res) {
try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/:userID/reviews', function (req, res) {
try {
        // Access userId via: req.params.userID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:userID/reviews/:reviewID', function (req, res) {
try {
        // Access userId via: req.params.userID
        // Access reviewId via: req.params.reviewID
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/:userID/reviews/:reviewID', function (req, res) {
try {
        // Access userId via: req.params.userID
        // Access reviewId via: req.params.reviewID
    } catch (error) {
        res.status(500).send(error)
    }

})*/

module.exports = router