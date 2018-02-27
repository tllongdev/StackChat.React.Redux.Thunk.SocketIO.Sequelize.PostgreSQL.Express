const app = require('./app')
const db = require('./db')
const socketio = require('socket.io')
const {green, yellow} = require('chalk')
const PORT = 3000

const main = async () => {
  await db.sync()
  const server = app.listen(PORT, () => console.log(green(`\nListening on port: ${yellow(PORT)}`)))
  const io = socketio(server)

  io.on('connection', (socket) => {
    console.log(
      green('\nSocket connected: '),
      yellow(socket.id)
    )
    // your "socket command center" goes here
  })
}

main()
