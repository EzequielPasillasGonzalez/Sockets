const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);
    
    socket.on('disconnect', () =>{
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('enviar-mensaje', (payload, callback) =>{
        
        const { id } = payload

        callback({                         // Regresar objetos al emisor
            id, 
            fecha: new Date().getTime()
        }) 

        socket.broadcast.emit('enviar-mensaje', payload)

    })
}

module.exports = {
    socketController
}