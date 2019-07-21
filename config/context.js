const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
  // Only DEV
  // await require('./tests/simularUsuarioLogado')(req)

  const auth = req.headers.authorization
  const token = auth && auth.substring(7)

  let user = null
  let isAdmin = false

  if (token) {
    try {
      let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET)
      if (new Date(tokenContent.exp * 1000) > new Date()) {
        user = tokenContent
      }
    } catch (e) {
      // invalid token
      throw new Error(e.message)
    }
  }

  if (user && user.perfis) {
    isAdmin = user.perfis.includes('admin')
  }

  const err = new Error('Access danied!')

  return {
    user,
    isAdmin,
    userValidate() {
      if (!user) throw err
    },
    isAdmin() {
      if (!isAdmin) throw err
    },
    userFilterValidate({ id, email }) {
      if (isAdmin) return
      if (!user) throw err
      if (!id && !email) throw err
      if (id && id !== user.id) throw err
      if (email && email !== user.email) throw err
    }
  }
}