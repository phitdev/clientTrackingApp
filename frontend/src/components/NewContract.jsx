import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createContract, reset } from '../features/contracts/contractSlice'
import Spinner from './Spinner'

function NewContract() {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message} = useSelector((state) => state.contract)

  const [ sender ] = useState(user.email)
  const [ receiver, setReceiver ] = useState('')
  const [ sentAt, setSentAt ] = useState(Date)
  const [ service, setService ] = useState('Nutrition Coaching')
  const [ length, setLength ] = useState(0)
  const [ startDate, setStartDate ] = useState('')
  const [ completionDate, setCompletionDate ] = useState('')
  const [ paymentInterval, setPaymentInterval ] = useState('Monthly')
  const [ paymentAmount, setPaymentAmount ] = useState(Number)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      dispatch(reset())
      navigate('/api/dashboard')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.prevent.Default()

    dispatch(createContract(
      {"users" : {
            sender: sender,
            receiver: receiver
        },
            "details": {
            // sentAt: sentAt, 
            startDate: startDate, 
            completionDate: completionDate, 
            paymentInterval: paymentInterval, 
            paymentAmount: paymentAmount, 
            service: service, 
            length: length
        },
        "status": 'pending'
    },{ new: true }
    ))
  }

  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>Create New Contract</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="sender">Contractor Email</label>
          <input 
            className="form-control" 
            type='email' 
            value={user.email} 
            disabled/>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="receiver">Recipient Email</label>
            <input 
              className="form-control" 
              type='email'
              placeholder='example@example.com' 
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}/>
          </div>
          {/* <div className="form-group">
            <label htmlFor="sentAt">Date Requested</label>
            <input 
              className="form-control" 
              type='date' 
              value={sentAt}
              disabled
              />
          </div> */}
          <div className="form-group">
            <label htmlFor="service">Service</label>
            <select 
              name="service" 
              id="service" 
              value={service} 
              onChange={(e) => setService(e.target.value)}>
              <option value="Nutrition Coaching">Nutrition Coaching</option>
              <option value="Life Performance Coaching">Life Performance Coaching</option>
              <option value="Mental Performance Coaching">Mental Performance Coaching</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input 
              className="form-control" 
              type='date' 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="completionDate">Completion Date</label>
            <input 
              className="form-control" 
              type='date' 
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}/>
          </div>
          {/* <div className="form-group">
            <label htmlFor="length">Length of Contact (Months)</label>
            <input 
              className="form-control" 
              type='number' 
              value={length}
              disabled/>
          </div> */}
          <div className="form-group">
            <label htmlFor="paymentAmount">Payment Amount (USD)</label>
            <input 
              className="form-control" 
              type='number' 
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label htmlFor="receiver">Payment Interval</label>
            <select name="paymentInterval" id="paymentInterval" value={paymentInterval} onChange={(e) => setPaymentInterval(e.target.value)}>
              <option value="Weekly">Weekly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Bi-Yearly">Bi-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewContract