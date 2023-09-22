const express=require("express")
const app=express();
const mongoose =require("mongoose")
const morgan=require("morgan")
const helmet=require("helmet")
const dotenv=require("dotenv")
const userRoute=require("./routes1/users")
const authRoute=require("./routes1/auth")
const postRoute=require("./routes1/posts")
const multer=require("multer")
const path=require("path")

dotenv.config()
// mongoose.connect('process.env.MONGO_URL',{useNewUrlParser:true},()=>{
//     console.log("connected to MongoDb")
// })
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Further code goes here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.use("/images", express.static(path.join(__dirname, "public/images")));
  //middleware
  app.use(express.json())
  app.use(helmet())
  app.use(morgan("common"))

  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

  

  app.use("/api/users",userRoute)
  app.use("/api/auth",authRoute)
  app.use("/api/posts",postRoute)
app.listen(3000,()=>{
    console.log("server running on port 3000")
})