const { Size } = require('../models/size')

const getSize = async(req, res) => {
    try {
        const size = await Size.findAll()
        console.log(size)
        res.status(200).json(size)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const addSize = async(req, res) => {
    const { name } = req.body
    console.log(name)
    const newSize = await Size.create({name})
    res.status(200).json(newSize)
}
module.exports = {
    getSize,
    addSize
}