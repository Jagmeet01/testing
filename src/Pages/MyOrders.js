import React, { useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../Redux/actions/orderAction';
import Loader from '../component/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../component/MetaData';
import LaunchIcon from "@mui/icons-material/Launch";


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders} = useSelector((state)=> state.myOrders);
    const { user } = useSelector((state)=> state.user);

    const columns = [
        {field: "id", headerName: "Order ID", minWidth:300, flex: 1},

        {
            field: "status",
            headerName: "Status",
            minWidth:150,
            flex: 0.5,
            cellClassName: (params) =>{
                return params.row.status === "Delivered"
                ? "greenColor" : "redColor" 
            }
        },
        {
            field: "itemsQty",
            headerName: "Items QTy",
            type: "number",
            minWidth:150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type:"number",
            minWidth:150,
            flex: 0.5
        },
        {
            field: "actions",
            headerName: "Actions",
            type:"number",
            minWidth:150,
            flex: 0.3,
            sortable: false,
            renderCell: (params)=> {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <LaunchIcon />
                    </Link>
                )
            }
        },
    ];
    const rows = [];

    orders &&
    orders.forEach((item, index)=> {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        })
    })

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      dispatch( myOrders());
    }, [dispatch, alert, error]);
    
  return (
    <>
    
        <MetaData title={`${user?.name} - Orders`} />

        {loading ? (<Loader />) : (
            <div className="myOrdersPage">
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableRowSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
               />

               <Typography className="myOrdersHeading" >{user?.name}'s Orders</Typography>

            </div>
        )}
    </>
  )
}

export default MyOrders
