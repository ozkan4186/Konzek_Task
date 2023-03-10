import React from 'react'
import { FormTypes } from '../Types/FormTypes'




const Language:React.FC<FormTypes> = ({inputData,updateInputData}) => {
  return (
    <div className="form-group">
          <label className="text-black" htmlFor="exampleInputEmail1">
          Language
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Search Language"
            id="code"
            value={inputData}
            onChange={updateInputData}
          />
        </div>
  )
}

export default Language