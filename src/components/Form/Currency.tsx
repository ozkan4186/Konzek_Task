import React from 'react'
import { FormTypes } from '../Types/FormTypes'




const Currency:React.FC<FormTypes> = ({inputData,updateInputData}) => {
  return (
    <div className="form-group">
          <label className="text-white" htmlFor="exampleInputEmail1">
          Currency
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Search Currency"
            id="code"
            value={inputData}
            onChange={updateInputData}
          />
        </div>
  )
}

export default Currency