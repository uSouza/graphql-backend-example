const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../Common/usuario')

module.exports = {
  async login(_, { dados }) {
    const usuario = await db('usuarios')
      .where({ email: dados.email })
      .first()

    if (!usuario) {
      throw new Error('Usuário/Senha inválido')
    }

    const saoIguais = bcrypt.compareSync(dados.senha,
      usuario.senha)

    if (!saoIguais) {
      throw new Error('Usuário/Senha inválido')
    }

    return getUsuarioLogado(usuario)
  },
  usuarios() {
    return db('usuarios')
  },
  usuario(_, { filtro }) {
    if (!filtro) return null
    const { id, email } = filtro
    if (id) {
      return db('usuarios')
        .where({ id })
        .first()
    } else if (email) {
      return db('usuarios')
        .where({ email })
        .first()
    } else {
      return null
    }
  },
}