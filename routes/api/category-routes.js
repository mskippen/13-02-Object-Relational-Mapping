const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "stock", "price", "category_id"]
      }
    ]
  }).then(category => {
    if(!category) res.status(404).json({success: false, message: "No Categories found"})
    res.json({success: true, category})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "stock", "price", "category_id"]
    }
  }).then(category => {
    if(!category){ 
      res.status(404).json({success: false, message: "No category found with the given id"})
      return
    }
    res.json({success: true, category})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.json(newCategory))
  .catch(er => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedCategory => {
    if(!updatedCategory) {
      res.json({success: false, message: "No category found with the given id"})
      return
    }
    res.json(updatedCategory)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(category => {
    if(!category) {
      res.json({success: false, message: "No category found with the given id"})
      return
    }
    res.json(category)
  })
});

module.exports = router;
