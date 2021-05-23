const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


// GET list of all categories
// http://localhost:3000/api/v1/categories/
router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false});
    } 
    res.status(200).send(categoryList);
});


// GET one category by ID
// http://localhost:3000/api/v1/categories/6055a6a8eafaa314670475cf
router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'});
    } 
    res.status(200).send(category);
});


// POST (add) a new category
// http://localhost:3000/api/v1/categories/
// + Body (with the new category info)
router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!');

    res.send(category);
});


// PUT (update) one category by ID
// http://localhost:3000/api/v1/categories/6055a6a8eafaa314670475cf
// + Body (with updated info)
router.put('/:id',async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true}
    );

    if(!category)
    return res.status(400).send('The category cannot be created!');

    res.send(category);
});



// DELET one category by ID
// http://localhost:3000/api/v1/categories/6055a6a8eafaa314670475cf
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'The category is deleted!'});
        } else {
            return res.status(404).json({success: false , message: 'The category was not found!'});
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err});
    })
});

module.exports = router;
