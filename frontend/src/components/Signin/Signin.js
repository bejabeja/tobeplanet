import React, {useState, useEffect} from 'react'
import './Signin.css'
import axios from 'axios'

const Signin = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [selectData, setSelectData] = useState([])
  const [selectValue, setSelectValue] = useState('')

  let apiUrl = process.env.API_URL|| 'http://localhost:4000/api';

  useEffect(() => {
    let apiUrl = process.env.API_URL|| 'http://localhost:4000/api';

    let processing = true 
    axiosFetchData(processing, apiUrl)
    return() => {
      processing = false
    }
  }, [])


  const axiosFetchData = async(processing, apiUrl) => {
    await axios.get(`${apiUrl}/users`)
    .then(res => {
      if(processing){
        setSelectData(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  const SelectDropdown = () => {
    return (
      <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
        {
          selectData?.map((user) => (
            <option value={user.email} key={user.email}> {user.email}</option>
          ))
        }
      </select>
    )
  }

  const axiosPostData = async() => {
    const postData = {
      email: email,
      name: name,
      lastName: lastName
    }

    await axios.post(`${apiUrl}/sign-in`, postData)
    .then(res => setError(<p className='succes'>{res.data}</p>))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selectValue)
    if(!email){
      setError(<p>'Need to introduce an email'</p>)
     }else{setError('')}

     setError('')
     axiosPostData()
  }

  return (
    <section className='section'>
        <h1>Sign In</h1>
        <form className='loggin--form' action='/api/contact-form'>
            <label>Name</label>
            <input type='text' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}></input>

            <label>Last Name</label>
            <input type='text' id='lastName' name='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>

            <label>Email</label>
            <input type='text' id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} ></input>

            <label>How did you hear about us?</label>
            <SelectDropdown></SelectDropdown>
           
            {error}
            <button type='submit' onClick={handleSubmit}>Login</button>
        </form>
    </section>
  )
}

export default Signin