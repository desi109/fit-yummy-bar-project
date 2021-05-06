const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// GET list of all users
// http://localhost:3000/api/v1/users
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false});
    } 
    res.send(userList);
});


// GET one user by ID
// http://localhost:3000/api/v1/users/6055a6a8eafaa314670475cf
router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'});
    } 
    res.status(200).send(user);
});

router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    user = await user.save();

    if(!user)
    return res.status(400).send('The user cannot be created!');

    res.send(user);
});

// POST (registration) of a new user 
// http://localhost:3000/api/v1/users/registration
router.post('/registration', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    user = await user.save();

    if(!user)
    return res.status(400).send('The user cannot be created!');

    res.send(user);
});


// POST (login) of an existing user
// http://localhost:3000/api/v1/users/login
router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user does not exists.');
    }

    if(user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        );
       
        res.status(200).send({user: user.email , token: token});
    } else {
       res.status(400).send('Password is wrong!');
    }
});


// PUT (edit) user information
// http://localhost:3000/api/v1/users/6055a6a8eafaa314670475cf
router.put('/:id',async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPasswordHash;
    if(req.body.passwordHash) {
        newPasswordHash = bcrypt.hashSync(req.body.passwordHash, 10);
    } else {
        newPasswordHash = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPasswordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    );

    if(!user)
    return res.status(400).send('The user cannot be created!');

    res.send(user);
});


// DELETE one user by ID
// http://localhost:3000/api/v1/users/6055a6a8eafaa314670475cf
router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'The user is deleted!'});
        } else {
            return res.status(404).json({success: false , message: 'The user was not found!'});
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err});
    })
});


// GET number of all users
// http://localhost:3000/api/v1/users/get/count
router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count);

    if(!userCount) {
        res.status(500).json({success: false});
    } 
    res.send({
        userCount: userCount
    });
});


module.exports = router;
