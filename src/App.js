/* global fetch */

import React, { useEffect, useState } from 'react'
import Buscador from './components/Buscador'
import ListadoImagenes from './components/ListadoImagenes'

function App () {
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return

      const imagenesPorPagina = 30
      const key = '14544519-37006504098626f9d791a10c9'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)
    }

    consultarApi()
  }, [busqueda])

  return (
    <div className='app container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>
        <Buscador guardarBusqueda={guardarBusqueda} />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes imagenes={imagenes} />
      </div>
    </div>
  )
}

export default App
