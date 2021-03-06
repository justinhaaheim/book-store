const { query } = require('./client.js')

module.exports = {
  /**
    CREATE
    */

  create: (user) =>
    query(`INSERT INTO
            users (username, email, encrypted_password, role)
          VALUES  ($1, $2, $3, $4)
          RETURNING *`, [user.username, user.email, user.password, user.role]),

  /**
    READ
   */

  getAll: () =>
   query(`SELECT * FROM users`),


  getBy: (property, value) => {
    if (!property || !value)
      throw new Error('At users#getBy: Did not receive an arg.'+property+value)

    return query(`SELECT * FROM users WHERE ${property} = $1`,[value])
    },

  /**
    UPDATE
   */

  update: (user) => {
    const { id, name, email, encrypted_password, role } = user
    return query(`UPDATE users
      SET username = $1, email = $2, encrypted_password = $3, role = $4
      WHERE id = $5  RETURNING *`,[name, email, encrypted_password, role, id])
  },

  /**
    DESTROY
   */

  destroy: (id) =>
    query(`DELETE FROM users WHERE id=$1`, [id])

}
