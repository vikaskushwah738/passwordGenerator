import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "~!@#$%^&*()_{}]["

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClick = useCallback(() =>{
    passwordRef.current?.select()  
   window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect( () =>{
   passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full mt-5 max-w-md mx-auto shadow-md rounded-xl px-4 py-8 text-orange-500 bg-gray-700'>
     <h1 className='text-center text-white text-xl py-2'>Password Genratore</h1>
      <div className='flex shadow rounded-lg mb-8 overflow-hidden'>
        <input
          type="text"
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
          className='outline-none bg-white w-full py-1 px-3'
        />
        <button
          onClick={copyPasswordToClick}
          className='bg-orange-500 hover:bg-orange-600 text-white px-3'
        >
          Copy
        </button>
      </div>
      <div className='flex gap-5'>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
           <input 
           type="range"
           min = {6}
           max = {100}
           value={length}
           className='cursor-pointer'
           onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
           type="checkbox"
           defaultChecked={numberAllowed}
           id='numberInput'
           onChange={() => {setNumberAllowed((prev) => !prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
           type="checkbox"
           defaultChecked={charAllowed}
           id='characterInput'
           onChange={() => {setCharAllowed((prev) => !prev)}}
          />
          <label htmlFor='characterInput'>Character</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
