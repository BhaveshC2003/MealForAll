import React,{useEffect,useState} from 'react'
import './Dashboard.css'
import DashboardMenu from './DashboardMenu/DashboardMenu'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Chart from "chart.js/auto";
import { Line,Doughnut } from "react-chartjs-2";
import {useSelector,useDispatch} from 'react-redux'
import { getAdminProducts } from '../../../Reducers/productReducer/actions'
import Loading from '../../Loading/Loading'

const Dashboard = () => {
  const {products,error,loading} = useSelector(state=>state.productReducer)
  const dispatch = useDispatch()
  const labels = ["January", "February", "March", "April", "May", "June"];

  let inStock = 0;
  let outOfStock=0;
  products && products.forEach(product=> product.Stock > 0 ? inStock++ : outOfStock++)

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "white",
        borderColor: 'dodgerblue',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const doughnutData = {
    labels:['Stock','OutOfStock'],
    datasets:[
      {
      label:'Order Data',
      backgroundColor: ["lightgreen","red"],
      data:[inStock,outOfStock]
    }
    ]
  }


  useEffect(()=>{
    dispatch(getAdminProducts)
  },[dispatch])



  return (
    <>
      {
        loading === true ? <Loading />:
        <div className='ecom__dashboard'>
        <DashboardMenu />
        <div className='dashboard-container'>
          <Typography component="h1">Dashboard</Typography>
          <div className='dashboard-amount'>
            <p>Total Amount:</p>
            <p>$10000</p>
          </div>
          <div className='dashboard-details'>
            <div>
              <Link to='/admin/products'>
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
            </div>
            <div>
              <Link to='/admin/orders'>
                <p>Orders</p>
                <p>10</p>
              </Link>
            </div>
            <div>
              <Link to='/admin/users'>
                <p>Users</p>
                <p>25</p>
              </Link>
            </div>
          </div>
          <div className='dashboard-line-chart'>
              <Line data={lineData} />
          </div>
          <div className='dashboard-doughnut-chart'>
            <Doughnut data={doughnutData}/>
          </div>
        </div>

        


    </div>
      }
    </>
  )
}

export default Dashboard