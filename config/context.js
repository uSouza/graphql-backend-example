module.exports = async ({ req }) => {
  await require('./tests/simularUsuarioLogado')(req)
  const auth = req.headers.authorization
  //console.log(auth)
}