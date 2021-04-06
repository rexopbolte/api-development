const Cart = require('../models/cart');
const user = require('../models/user');


exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ erorr });
            if (cart) {
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product);
                let condition, update;

                if (item) {
                    condition = { "user": req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    };
                } else {
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    };
                }
                Cart.findOneAndUpdate(condition, update)
                    .exec((error, _cart) => {
                        if (error) {
                            return res.status(400).json({ error });
                        }
                        if (_cart) {
                            return res.status(201).json({ cart: _cart })
                        }
                    })

                //If Cart Already Exists Then Update Cart


                //res.status(200).json({ message: 'Cart' })

            } else {

                // If Cart Not Exist Then Create New Cart

                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ erorr });
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
            }

        })
}