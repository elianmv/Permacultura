import React from 'react'




const Input =  ({ name, type, placeholder, handleChange, param}) => {
  return (
    <div>
        <input className={param ?'input-loginError':'input-login'} 
                onChange={(e) => handleChange(e.target.name,e.target.value)} 
                name={name} 
                placeholder={placeholder}
                type={type}
                required="required"/>
    </div>
  )
}
export default Input