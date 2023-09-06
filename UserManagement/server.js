const express = require("express");
const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: false }));


const UserRoutes = require("./routers/userRoute");
app.use("/api/user",UserRoutes);




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
