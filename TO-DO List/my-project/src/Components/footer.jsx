import React from 'react'

const footer = () => {
  return (
    <div>
        <footer className="bg-gray-600 text-amber-100 p-4 text-center border-t-2 border-black shadow-md">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Taskify. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default footer;
