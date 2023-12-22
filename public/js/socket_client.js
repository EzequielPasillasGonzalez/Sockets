

// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io()

socket.on('connect', () => { // El on es para escuchar un evento
    // console.log('Conectado');    

    lblOnline.style.display = ''
    lblOffline.style.display = 'none'
})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');

    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload.mensaje);
})


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value

    const payload = {
        mensaje,
        id: 'abc132',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server:', id);
    })             // El emit es para emitir un evento
})