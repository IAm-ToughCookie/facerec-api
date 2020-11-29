const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd0b79f9433334901b62833594dcb4f7e'
});

const handleClarifaiCall = () => (req, res) => {
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unsuccessful API call'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to update entries'))
}

module.exports = {
    handleImage, handleClarifaiCall
};