
import { redirect } from "next/navigation"
import { auth } from "./auth"
import DBConnection from "./utils/config/db"
import UserNavigation from "./components/UserNavigation"
import AdminPage from "./admin/page"
import ProductCollection from "./components/ProductCollection"

const HomePage = async() => {
  const session = await auth()
  await DBConnection()
  if(!session){
    redirect("/login")
  }    
  const userName = session.username ;
  return (
    <div>
      {session.role ==="user" && 
      <>
        <UserNavigation username={userName}/>
        <h3>WELCOME TO TOUR PAGE</h3>
        <ProductCollection/>
        </>
      }
      {session.role === 'admin' && 
        <div>
          <AdminPage/>
        </div>
      }
    </div>
  )
}

export default HomePage