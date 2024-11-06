
const { default: mongoose } = require("mongoose")


const DBConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully!!")
    }catch(error){
        console.log(error.message)
    }
}

export default DBConnection