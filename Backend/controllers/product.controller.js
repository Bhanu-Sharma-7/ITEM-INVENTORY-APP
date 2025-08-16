import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ succes: true, data: products })
    } catch (error) {
        res.status().json({ status: false, message: "Server Error" })
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ succes: false, message: "Please Provide all fields" })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ succes: true, data: newProduct })
    } catch (error) {
        console.error("Error is Create product: ", error.message)
        res.status(500).json({ succes: false, message: "Server Error" })
    }
}

export const upadateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: false, message: "Invalid Product id" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(200).json({ success: false, message: "Server Error"})
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ succes: true, message: "Product Deleted" })
    } catch (error) {
        res.status(500).json({ succes: false, message: "Server Error" })
    }
}