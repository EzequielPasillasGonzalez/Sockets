const TicketModel = require("../models/ticket.models");

const ticketModel = new TicketModel()

const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    // Cuando un cliente se conecta
    socket.emit( 'ultimo_ticket', ticketModel.ultimo )
    socket.emit('estado_actual', ticketModel.ultimos4)
    socket.broadcast.emit('tickets_pendientes', ticketModel.tickets.length)
    
    socket.on('disconnect', () =>{
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('siguiente_ticket', (payload, callback) =>{
        
        const siguiente = ticketModel.siguiente()
        callback(siguiente)

    

        //ToDo: Notificar que hay un nuevo ticket que asignar
        socket.broadcast.emit('estado_actual', ticketModel.ultimos4)
        socket.broadcast.emit('tickets_pendientes', ticketModel.tickets.length)
    })

    socket.on('solicitar_ticket', ({ escritorio }, callback) => {
        
        if(!escritorio) {
            return callback({
                ok: false,
                body: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketModel.atender(escritorio)

        socket.broadcast.emit('estado_actual', ticketModel.ultimos4)
        socket.emit('tickets_pendientes', ticketModel.tickets.length)
        socket.broadcast.emit('tickets_pendientes', ticketModel.tickets.length)

        if( !ticket ){
            callback({
                ok: false,
                body: 'Ya no hay ticket pendiente'
            })
        } else{
            callback({
                ok: true,
                body: ticket
            })
        }

    })
}



module.exports = {
    socketController
}