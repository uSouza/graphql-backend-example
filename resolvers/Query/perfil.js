const db = require('../../config/db')

module.exports = {
  perfis(_, __, ctx) {
    ctx && ctx.isAdmin()
    return db('perfis')
  },
  perfil(_, { filtro }, ctx) {
    ctx && ctx.isAdmin()
    if (!filtro) return null
    const { id, nome } = filtro
    if (id) {
      return db('perfis')
        .where({ id })
        .first()
    } else if (nome) {
      return db('perfis')
        .where({ nome })
        .first()
    } else {
      return null
    }
  }
}