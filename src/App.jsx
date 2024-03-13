import React, { useState } from 'react';
import '../src/index.css';


function Curp() {
  const [validation, setValidation] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [primernombre, setPriNombre] = useState('');
  const [segundonombre, setSecNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [sexo, setSexo] = useState('');
  const [entidadNacimiento, setEntidadNacimiento] = useState('');
  const [curpGenerada, setCurpGenerada] = useState('');

  function generateRandomCode() {
    // Genera un código aleatorio de 4 dígitos
    return Math.floor(1000 + Math.random() * 9000);
  }

  const handleRandomCodeGeneration = () => {
    const code = generateRandomCode();
    setRandomCode(code);
  };

  const handleDiaChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 31)) {
      setDia(value);
    }
  };

  const handleMesChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12)) {
      setMes(value);
    }
  };

  const handleAnoChange = (e) => {
    const value = e.target.value;
    setAno(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validation !== randomCode.toString()) {
      alert('Código de verificación incorrecto.');
      return;
    }

    if (!primernombre || !primerApellido || !dia || !mes || !ano || !sexo || !entidadNacimiento) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    const curp = generarCURP();
    setCurpGenerada(curp);
  };

  const obtenerSegundaVocal = (apellido) => {
    const vocales = ['A', 'E', 'I', 'O', 'U'];
    let contadorVocales = 0;
    for (let letra of apellido) {
      const letraMayuscula = letra.toUpperCase();
      if (vocales.includes(letraMayuscula)) {
        contadorVocales++;
        if (contadorVocales === 1) {
          return letraMayuscula;
        }
      }
    }
    return '';
  };

  const obtenerConsonante = (palabra) => {
    const consonantes = 'BCDFGHJKLMNÑPQRSTVWXYZ';
    for (let letra of palabra) {
      const letraMayuscula = letra.toUpperCase();
      if (consonantes.includes(letraMayuscula)) {
        return letraMayuscula;
      }
    }
    return 'X';
  };

  const generarCURP = () => {
    let primerNombreGenerar = primernombre.toUpperCase();
    if (primerNombreGenerar === 'ANDRES' || primerNombreGenerar === 'MANUEL') {
      primerNombreGenerar = segundonombre.toUpperCase();
    }

    const primeraLetraPrimerNombre = primerNombreGenerar.charAt(0);
    const primeraLetraPrimerApellido = primerApellido.charAt(0).toUpperCase();
    const segundaConsonantePrimerApellido = obtenerConsonante(primerApellido.slice(1));
    const segundaVocalPrimerApellido = obtenerSegundaVocal(primerApellido);
    const primeraLetraSegundoApellido = segundoApellido ? segundoApellido.charAt(0).toUpperCase() : 'X';
    const segundaConsonanteSegundoApellido = obtenerConsonante(segundoApellido.slice(1));
    const primeraConsonantePrimerNombre = obtenerConsonante(primerNombreGenerar.slice(1));
    const fechaNacimiento = ano.slice(-2) + mes.padStart(2, '0') + dia.padStart(2, '0');
    const entidadAbreviatura = entidadNacimiento.slice(0, 2);
    const sexoMayusculas = sexo.toUpperCase();
    const curpGenerada = primeraLetraPrimerApellido + segundaVocalPrimerApellido + primeraLetraSegundoApellido + primeraLetraPrimerNombre + fechaNacimiento + sexoMayusculas + entidadAbreviatura + segundaConsonantePrimerApellido + segundaConsonanteSegundoApellido + primeraConsonantePrimerNombre;

    return curpGenerada;
  };

  return (


    <div className='container'>
      <div className='containerform'>
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex">
            <p className="title">Ingresa tus datos</p>
            <button className="generation" type="button" onClick={handleRandomCodeGeneration}>
              Generar código
            </button>
            <span>{randomCode}</span>
            <input
              className="input"
              type="text"
              placeholder="Código de verificación"
              value={validation}
              onChange={(e) => setValidation(e.target.value)}
            />
            <label>
              <input className="input" type="text" placeholder="Primer Nombre" required="" value={primernombre} onChange={(e) => setPriNombre(e.target.value)} />
            </label>
            <label>
              <input className="input" type="text" placeholder="Segundo Nombre (opcional)" value={segundonombre} onChange={(e) => setSecNombre(e.target.value)} />
            </label>
            <label>
              <input className="input" type="text" placeholder="Primer Apellido" required="" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
            </label>
            <label>
              <input className="input" type="text" placeholder="Segundo Apellido" required="" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
            </label>
          </div>
          <div className="flexdate">
            <div>
              <label>
                <input className="input" type="number" placeholder="Día de nacimiento" maxLength="2" required="" value={dia} onChange={handleDiaChange} />
              </label>
            </div>
            <div>
              <label>
                <input className="input" type="number" placeholder="Mes de nacimiento" maxLength="2" required="" value={mes} onChange={handleMesChange} />
              </label>
            </div>
            <div>
              <label>
                <input className="input" type="number" placeholder="Año de nacimiento" maxLength="4" required="" value={ano} onChange={handleAnoChange} />
              </label>
            </div>
          </div>
          <label>
            <select className="input" value={sexo} onChange={(e) => setSexo(e.target.value)}>
              <option value="">Género</option>
              <option value="H">Hombre</option>
              <option value="M">Mujer</option>
            </select>
          </label>
          <label>
            <select className="input" value={entidadNacimiento} onChange={(e) => setEntidadNacimiento(e.target.value)}>
              <option value="">Selecciona tu entidad de nacimiento</option>
              <option value="AS">Aguascalientes</option>
              <option value="BC">Baja California</option>
              <option value="BS">Baja California Sur</option>
              <option value="CC">Campeche</option>
              <option value="CS">Chiapas</option>
              <option value="CH">Chihuahua</option>
              <option value="CL">Coahuila</option>
              <option value="CM">Colima</option>
              <option value="DF">Ciudad de México</option>
              <option value="DG">Durango</option>
              <option value="GT">Guanajuato</option>
              <option value="GR">Guerrero</option>
              <option value="HG">Hidalgo</option>
              <option value="JC">Jalisco</option>
              <option value="MC">México</option>
              <option value="MN">Michoacán</option>
              <option value="MS">Morelos</option>
              <option value="NT">Nayarit</option>
              <option value="NL">Nuevo León</option>
              <option value="OC">Oaxaca</option>
              <option value="PL">Puebla</option>
              <option value="QT">Querétaro</option>
              <option value="QR">Quintana Roo</option>
              <option value="SP">San Luis Potosí</option>
              <option value="SL">Sinaloa</option>
              <option value="SR">Sonora</option>
              <option value="TC">Tabasco</option>
              <option value="TS">Tamaulipas</option>
              <option value="TL">Tlaxcala</option>
              <option value="VZ">Veracruz</option>
              <option value="YN">Yucatán</option>
              <option value="ZS">Zacatecas</option>
            </select>
          </label>
          <button className="generation" type="submit">Generar CURP</button>
        </form>
      </div>

      {curpGenerada && (
        <div className='curp'>
          <p>Datos del solicitante de la curp:</p>
          <p>Nombre(s): {primernombre} {segundonombre}</p>
          <p>Primer apellido: {primerApellido}</p>
          <p>Segundo apellido: {segundoApellido}</p>
          <p>Sexo: {sexo}</p>
          <p>Fecha de nacimiento: {dia}/{mes}/{ano}</p>
          <p>Entidad de nacimiento: {entidadNacimiento}</p>
          <p>CURP: {curpGenerada}</p>
        </div>
      )}

    </div>

  );
}

export default Curp;