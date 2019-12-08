import React, { useState } from 'react'
import Error from './Error'

const Buscador = ({ guardarBusqueda }) => {
  const [terminoBusqueda, guardarTerminoBusqueda] = useState('')
  const [error, guardarError] = useState(false)

  const buscarImagen = e => {
    e.preventDefault()

    if (terminoBusqueda === '') {
      guardarError(true)
      return
    }

    guardarError(false)
    guardarBusqueda(terminoBusqueda)
  }

  return (
    <form
      onSubmit={buscarImagen}
    >
      <div className='row'>
        <div className='form-group col-md-8'>
          <input
            className='form-control form-control-lg'
            onChange={e => guardarTerminoBusqueda(e.target.value)}
            placeholder='Busca una imagen, ejemplo: Fútbol o Café'
            type='text'
          />
        </div>
        <div className='form-group col-md-4'>
          <input
            className='btn btn-lg btn-danger btn-block'
            type='submit'
            value='Buscar'
          />
        </div>

        {(error) ? <Error mensaje='Agrega un término de búsqueda' /> : null}
      </div>
    </form>
  )
}

export default Buscador
