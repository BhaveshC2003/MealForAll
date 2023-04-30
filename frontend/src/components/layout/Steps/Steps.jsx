import React from 'react'
import {Typography,Stepper,Step,StepLabel } from '@material-ui/core'
import {FaShippingFast} from 'react-icons/fa'
import {BsFillCartCheckFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'

const Steps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon : <FaShippingFast size={25} />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon : <BsFillCartCheckFill size={25} />
        },
        {
            label: <Typography>Payment</Typography>,
            icon : <MdPayment size={25} />
        }
    ]

  return (
    <>
        <Stepper alternativeLabel activeStep={activeStep}>
            {
                steps.map((step,i)=>
                <Step key={i} active={activeStep===i ? true : false} completed={activeStep>=i ? true : false}>
                    <StepLabel style={{color:activeStep>=i ? 'tomato' : 'black'}} icon={step.icon}>{step.label}</StepLabel>
                </Step>)
            }
        </Stepper>
    
    </>
  )
}

export default Steps