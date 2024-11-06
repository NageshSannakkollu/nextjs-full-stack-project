import { redirect } from "next/navigation"
import { auth } from "../auth"
import Link from "next/link"
import AdminNavbar from "../components/AdminNavbar"
import AddProduct from "../components/AddProduct"



const AdminPage = async() => {
  const session = await auth()
  if(!session){
    redirect("/login")
  }
  return(
    <div>
    {session ?
      (<>
      <AdminNavbar/>
      <AddProduct/>
        <h1>This is Admin page</h1>
      </>):
      <p>Not Authorized</p>
    }
   
    </div>
  )
}

export default AdminPage