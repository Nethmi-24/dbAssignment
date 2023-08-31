const express = require("express");
const app = express();

const admin =  require("firebase-admin");
const credentials = require('./key.json');

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});
app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

app.post("/create",async(req,res)=>{
    try{
        console.log(req.body);
        const id = req.body.email;
        const userJson = { 
            
        email:req.body.email,
        Name:req.body.Name,
        Password:req.body.Password
        }
        console.log(userJson);
    const response =  await db.collection("users").add(userJson);
console.log("Firestore Response:", response);
        console.log("hi",response);
    res.send(response);
 }catch(error){
res.send(error)
    }
    
    
})

app.get('/read/all',async (req, res) => {
    try{
        const usersRef =  db.collection("users");
        const response = await usersRef.get();

        let responseArr = [];
        response.forEach(doc =>
            {responseArr.push(doc.data());
            
            });

        res.send(responseArr);
    }catch(error){
        res.send(error);
    }
}

)

app.get('/read/:id', async (req, res) => {
     try{
        const userRef =  db.collection("users").doc(req.params.id);
        const response = await userRef.get();

       
        res.send(response.data());
    }catch(error){
        res.send(error);
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.params.id);

        // Assuming the request body contains the updated user data
        const updatedData = req.body;

        await userRef.update(updatedData);

        res.send("User data updated successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});


app.delete('/delete/:id',async (req, res) => {
    try{
        const response = await db.collection('users').doc(req.params.id).delete();
        res.send(response);
    }catch (error) {
        res.send(error);
    }
})


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}.`);
});
