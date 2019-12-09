/* global fetch */

import React, { useEffect, useState } from 'react'
import Buscador from './components/Buscador'
import ListadoImagenes from './components/ListadoImagenes'

function App () {
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return

      const imagenesPorPagina = 24
      const key = '14544519-37006504098626f9d791a10c9'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      const calcularTotalPaginas = resultado.totalHits / imagenesPorPagina
      guardarTotalPaginas(Math.ceil(calcularTotalPaginas))

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }

    consultarApi()
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1
    guardarPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1
    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className='app container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>
        <Buscador guardarBusqueda={guardarBusqueda} />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes imagenes={imagenes} />

        {(paginaActual === 1) ? null
          : <button className='btn btn-info mr-1' onClick={paginaAnterior} type='button'>&laquo; Anterior</button>}
        {(paginaActual === totalPaginas) ? null
          : <button className='btn btn-info' onClick={paginaSiguiente} type='button'>Siguiente &raquo;</button>}
      </div>
    </div>
  )
}

export default App
