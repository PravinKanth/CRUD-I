const express = require('express');
const cors = require('cors')
const multer = require('multer');

const app = express();
const upload = multer();
const db = require("./knexConfig");

const port = 3000;

app.use(cors())
app.use(express.json());


// Employee Table
if(!db.schema.hasTable("Employees")){
db.schema.createTable("Employees", (table)=>{
  table.string("id").primary();
  table.string("name");

})

.then(()=>{
  console.log("Employee table has been created successfully!");
})

.catch((err)=>{
  console.error("Error creating Employee table", err);
})

}

// Addresses Table

if(!db.schema.hasTable("Addresses")){
db.schema.createTable("Addresses", (table)=>{
  table.string("id").primary();
  table.string("address");
  table.string("city");
  table.string("state");

})

.then(()=>{
  console.log("Addresses table has been created successfully!");
})

.catch((err)=>{
  console.error("Error creating Addresses table", err);
})
}

// Departments Table

if(!db.schema.hasTable("Departments")){
db.schema.createTable("Departments", (table)=>{
  table.string("id").primary();
  table.string("department");
})

.then(()=>{
  console.log("Departments table has been created successfully!");
})

.catch((err)=>{
  console.error("Error creating Departments table", err);
})

}

// INSERT INTO EMPLOYEES

async function insertEmployees(id, name){
  try{
    await db("Employees").insert({id:id, name:name}).onConflict("id").ignore();
  }

  catch (error){
    console.error('Error inserting value:', error);
  }
}

// INSERT INTO ADDRESSES

async function insertAddresses(id, address,city, state){
  try{
    await db("Addresses").insert({id:id, address:address, city:city, state:state}).onConflict("id").ignore();
  }

  catch (error){
    console.error('Error inserting value:', error);
  }
}

// INSERT INTO DEPARTMENTS

async function insertDepartments(id, department){
  try{
    await db("Departments").insert({id:id, department:department}).onConflict("id").ignore();
  }

  catch (error){
    console.error('Error inserting value:', error);
  }
}


app.post("/postdata",upload.none(), async (req, res)=>{
  try{
    await Promise.all([
      insertEmployees(req.body.id, req.body.name),
      insertAddresses(req.body.id, req.body.address, req.body.city, req.body.state),
      insertDepartments(req.body.id, req.body.department)
  ]);


  const data = await db("Employees")
  .select("Employees.id", "Employees.name", "Departments.department", "Addresses.address", "Addresses.city", "Addresses.state")
  .leftJoin("Addresses", "Employees.id", "Addresses.id")
  .leftJoin("Departments", "Employees.id", "Departments.id");

  // console.log(data);

  res.status(200).json(data)

  }

  catch(error){ 
    console.log(error)
    res.status(500).json({ message: `Error: ${error}` });
  }

});

app.get("/getdata",async (req,res)=>{
  try{
  const data = await db("Employees")
  .select("Employees.id", "Employees.name", "Departments.department", "Addresses.address", "Addresses.city", "Addresses.state")
  .leftJoin("Addresses", "Employees.id", "Addresses.id")
  .leftJoin("Departments", "Employees.id", "Departments.id");

  res.status(200).json(data);
  }
  catch(err){
    res.status(500).json("Error")
  }
})

app.post("/postdelete", async (req, res)=>{
  try{
    const id= req.body.id;
    await db.transaction(async (tr)=>{
      await tr("Employees").where("id", id).del();
      await tr("Addresses").where("id", id).del();
      await tr("Departments").where("id", id).del();
    })

    const data = await db("Employees")
    .select("Employees.id", "Employees.name", "Departments.department", "Addresses.address", "Addresses.city", "Addresses.state")
    .leftJoin("Addresses", "Employees.id", "Addresses.id")
    .leftJoin("Departments", "Employees.id", "Departments.id");

    res.status(200).json(data);
  }
  catch(error){
    console.log(error)
    res.status(500).json("Error")
  }
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });