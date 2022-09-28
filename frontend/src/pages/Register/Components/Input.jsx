import React from 'react'




const InputRegister =  ({ name, type, placeholder, handleChange, param,id}) => {
  return (
    <div>
        <input className={param ?'input-loginError':'input-login'} 
                onChange={(e) => handleChange(e.target.name,e.target.value)} 
                name={name} 
                placeholder={placeholder}
                type={type}
                required="required"
                id={id}/>
    </div>
  )
}
export default InputRegister