// const express=require('express');
// const router=express.Router();
// const User =require('../models/User')
// const { query, validationResult } = require('express-validator');

// //create a user using post  "/api/auth" . doesnt require auth 
// router.post('/', [
//     query('name').isLength({min:3}),
//      query('email').isEmail(),
//      query('password').isLength({min:5})

// ],(req, res)=>{
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     }).then(user => res.json(user));
  
//     res.send({ errors: result.array() });

// });
// module.exports=router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth/createuser". Doesn't require authentication.
router.post(
  '/createuser',
  [
    // Validation for request body
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  async (req, res) => {
    // Validate the request
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, return a 400 response with errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new user in the database
      //check whether the email exists already
      let user=await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({error: "user with this email already exists"})
      }
       user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Respond with the created user
      return res.status(201).json(user);
    } catch (err) {
      // Catch and handle database or server errors
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
