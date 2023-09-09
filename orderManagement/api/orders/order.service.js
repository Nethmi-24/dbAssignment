const pool = require("../../config/database.js");

module.exports={
    create:(data,callBack) =>{
        pool.query( " insert into order(Order_ID,Item_ID,User_ID,Order_Date,Total,Discount,Sub_Total,Payment_Method),values(?,?,?,?,?,?,?,?)",
            [
                data.Order_ID,
                data.Item_ID,
                data.User_ID,
                data.Order_Date,
                data.Total,
                data.Discount,
                data.Sub_Total,
                data.Payment_Method 
            ],

            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    //get orders
    getOrders: callBack =>{
        pool.query(
            'select Order_ID,Item_ID,User_ID,Order_Date,Total,Discount,Sub_Total,Payment_Method  from order',
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    //get orderbyId
    getOrdersByOrderID: (Order_ID,callBack) =>{
        pool.query(
            'select Order_ID,Item_ID,User_ID,Order_Date,Total,Discount,Sub_Total,Payment_Method  from order where id =?',
            [Order_ID],
            (error,results,fields)=>{
                if(error){
                   callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

    //update order
    updateOrders: (data,callBack) =>{
        pool.query(
            'update order set Item_ID=?,User_ID=?,Order_Date=?,Total=?,Discount=?,Sub_Total=?,Payment_Method=? where Order_ID=? ',
            [
                data.Item_ID,
                data.User_ID,
                data.Order_Date,
                data.Total,
                data.Discount,
                data.Sub_Total,
                data.Payment_Method,
                data.Order_ID
            ],
            (error,results,fields)=>{
                if(error){
                   callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

    //delete order
    deleteOrders: (data,callBack) =>{
        pool.query(
            'delete from order where Order_ID = ? ',
            [data.Order_ID],
            (error,results,fields)=>{
                if(error){
                   callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }
};