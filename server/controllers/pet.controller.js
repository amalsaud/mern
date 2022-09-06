const { Pet } = require('../models/pet.model');

module.exports.getAllPets = (request, response) => {
    Pet.find({}).sort("petType")
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.createPet = (request, response) => {
    const { petName, petType, petDesc, skill1, skill2, skill3 } = request.body;
    Pet.create({
        petName, petType, petDesc, skill1, skill2, skill3
    })
        .then(pet => response.json(pet))
        .catch(err => response.status(400).json(err))
}

module.exports.getPet = (request, response) => {
    Pet.findOne({ _id: request.params.id })
        .then(pet => response.json(pet))
        .catch(err => response.json(err))
}

module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedPet => res.json({ pet: updatedPet }))
        .catch(err => res.status(400).json( err ));
    }

module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}
