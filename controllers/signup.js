const handleSignUp = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).res.json('invalid fields');
    }
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginemail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginemail[0],
                    joined: new Date()
                }).then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('ERROR: Unable to sign up'))   
}

module.exports = {
    handleSignUp
};