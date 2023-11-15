import React, {  useCallback, useEffect, useRef, useState } from 'react'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [special, setSpecial] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)




  const passwordGenerator = useCallback(() => {
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if (number) str += "0123456789"
     if (special) str += "!@#$&*_%"


     for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
      
     }

    setPassword(pass)

  }, [length, number, special , setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    toast.info('Text Copied to Clipboard') 
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, number, special, passwordGenerator])



  return (
    <>
    <div className=' flex justify-center h-screen mt-36'>
      <div className='  w-3/4 h-1/2 bg-transparent justify-center md:w-1/3 shadow-lg rounded-2xl shadow-slate-600'>
        <h1 className=' mt-3 py-3 flex justify-center text-blue-500 font-bold text-2xl'>Password Generator</h1>

        <div className=' mt-4 justify-center flex'>
          <input 
          className=' w-3/4 rounded flex justify-center font-bold text-blue-500 py-1 px-3'
          placeholder='Password'
          readOnly
          value={password}
          type="text" 
          ref={passwordRef}
          />

          <button className='bg-blue-600 text-white rounded w-14 shrink-0
          hover:bg-transparent hover:text-blue-500 hover:font-bold hover:border-blue-500 hover:border-2'
          onClick={copyPassword}
          >Copy</button>

        </div>
        <div className=' mt-8 justify-center flex text-blue-500 font-bold px-2 gap-1 md:gap-3'>
          <input 
          className='p-1 w-20'
          max={20}
          min={8}
          type="range" 
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='text-sm'>Length: {length} </label>

          <input 
          type="checkbox" 
          defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev)
          }}
          />
          <label className='text-sm'>Number</label>

          <input 
          type="checkbox" 
          defaultChecked={special}
          onChange={() => {
            setSpecial((prev) => !prev)
          }}
          />
          <label className='text-sm'>Special</label>

        </div>

      </div>
        
    </div>

    <ToastContainer />
        
    </>
  )
}

export default App