const {
    create,
    getOrders,
    getOrdersByOrderID,
    updateOrders,
    deleteOrders} =require("./order.service");

//const {genSaltSync,hashSync} = require("bcrypt");

module.exports={
    createOrder:(req,res)=>{
        const body = req.body;
       // const salt = genSaltSync(10);
        //body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Databse connection error"
                });
            }

            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },

    getOrdersByOrderID: (req,res) =>{
        const Order_ID = req.params.Order_ID;
        getOrdersByOrderID(Order_ID,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            });

        });
    },

    getOrders: (req,res)=>{
        getOrders((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });

    },

    updateOrders:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateOrders(body, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message:"updated successfully"
            });
        });
    },

    deleteOrders:(req,res)=>{
        const data=req.body;
        deleteOrders(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                message:"Order deleted successfully"
            });
        });
    }

};
