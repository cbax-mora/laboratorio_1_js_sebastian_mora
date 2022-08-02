;(() => {
    let baraja = []
    const tipos = ['C', 'D', 'H', 'S'],
      letras = ['J', 'Q', 'K', 'A']
  
    let puntosJugadores = [] //El ultimo jugador siempre es la computadora
  
    //Referencias al HTML
    const btnPedir = document.querySelector('#btn-pedir'),
      btnDetener = document.querySelector('#btn-detener'),
      btnNuevo = document.querySelector('#btn-nuevo'),
      puntosHTML = document.querySelectorAll('small'),
      divCartasJugadores = document.querySelectorAll('.divCartas')
  
    const inicializarJuego = (numJugadores = 2) => {
      console.clear()
      baraja = crearBaraja()
      puntosJugadores = []
      for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0)
      }
  
      puntosHTML.forEach((elem) => (elem.innerText = 0))
      divCartasJugadores.forEach((elem) => (elem.innerHTML = ''))
  
      btnPedir.disabled = false
      btnDetener.disabled = false
  
      // puntosJugador = 0
      // puntosComputadora = 0
      // crearBaraja()
    }
  
    const crearBaraja = () => {
      //Se reinicializa la baraja
      baraja = []
      //Se ha pobrlado el arreglo con los nÃºmeros y tipos de la baraja
      for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
          baraja.push(i + tipo)
        }
      }
      //Se ha poblado el arreglo con letras y con tipos de la baraja
      for (let letra of letras) {
        for (let tipo of tipos) baraja.push(letra + tipo)
      }
  
      return _.shuffle(baraja)
    }
  
    const pedirCarta = () => {
      const barajaTamanio = baraja.length
      if (barajaTamanio === 0) throw 'No hay cartas'
  
      return baraja.splice(Math.floor(Math.random() * barajaTamanio), 1)[0]
    }
  
    const valorCarta = (carta) => {
      const valor = carta.substring(0, carta.length - 1)
      return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
    }
  
    const acumularPuntos = (carta, turno) => {
      puntosJugadores[turno] += valorCarta(carta)
      puntosHTML[turno].innerText = puntosJugadores[turno]
      return puntosJugadores[turno]
    }
  
    const crearCarta = (carta, turno) => {
      const imgCarta = document.createElement('img')
      imgCarta.src = `assets/cartas/${carta}.png`
      imgCarta.classList.add('carta')
      divCartasJugadores[turno].append(imgCarta)
    }
  
    const determinarGanador = () => {
      const [puntosMinimos, puntosComputadora] = puntosJugadores
  
      setTimeout(() => {
        if (puntosMinimos === puntosComputadora)
          alert('Empate')
        else if (puntosMinimos > 21) alert('Gana la computadora')
        else if (puntosComputadora > 21)
          alert('Le ganaste a la computadora')
        else alert('gana la computadora')
      }, 100)
    }
  
    const turnoComputadora = (puntosMinimos) => {
      let puntosComputadora = 0
  
      do {
        const carta = pedirCarta()
  
        const turnoComputadora = puntosJugadores.length - 1
  
        puntosComputadora = acumularPuntos(carta, turnoComputadora)
        crearCarta(carta, turnoComputadora)
  
        if (puntosMinimos > 21) break
      } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21)
  
      determinarGanador()
    }
    //Eventos
  
    btnPedir.addEventListener('click', () => {
      const carta = pedirCarta()
      const puntosJugador = acumularPuntos(carta, 0)
      crearCarta(carta, 0)
  
      if (puntosJugador > 21) {
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)
      } else if (puntosJugador === 21) {
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugadores[0])
      }
    })
  
    btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugadores[0])
    })
  
    btnNuevo.addEventListener('click', () => {
      inicializarJuego()
  
      console.clear()
    })
  })()
  