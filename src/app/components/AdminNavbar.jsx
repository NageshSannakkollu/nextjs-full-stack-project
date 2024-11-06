import Link from 'next/link'
import React from 'react'

const AdminNavbar = () => {
  return (
  <div className='navSection'>
        <div className="title">
            <Link href="/" className="link">
                <h2>Holiday Resort</h2>
            </Link>
        </div>
        <p>Welcome: Admin </p>
        <Link href="/api/auth/signout" className='link'>
            <div className="logout">
                Logout
            </div>
        </Link>
    </div>
  )
}

export default AdminNavbar