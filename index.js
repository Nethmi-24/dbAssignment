const express = require('express');
var app = express();
const PORT = 8081;

const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123@@',
    database: 'order_placement',
    
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
    
    
});


app.use(express.json());

    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`it's alive on http://localhost:${PORT}`)
    });





 

app.get('/order', (req, res) => {
    connection.query('SELECT * FROM order', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/order/:Order_ID', (req, res) => {
    connection.query('SELECT * FROM order WHERE Order_ID = ?',[req.params.id],(err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.delete('/order/:Order_ID', (req, res) => {
    connection.query('DELETE FROM order WHERE Order_ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
});

app.post('/order', (req, res) => {
    let odr = req.body;
    var sql = "SET @Order_ID = ?;SET @Item_ID = ?;SET @User_ID =?;SET @Order_Date =?;SET @Total = ?;SET @Discount = ?;SET @Sub_Total =?;SET @Payment_Method = ?; \
    CALL OrderAddOrEdit(@Order_ID,@Item_ID,@User_ID,@Order_Date,@Total,@Discount,@Sub_Total,@Payment_Method);";
    connection.query(sql, [odr.Order_ID,odr.Item_ID,odr.User_ID,odr.Order_Date,ode.Total,odr.Discount,odr.Sub_Total,odr.Payment_Method], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

  