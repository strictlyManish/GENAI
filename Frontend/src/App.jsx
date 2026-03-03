import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx"

function App() {
  return (
    <div className='bg-[#1a1919] min-h-screen text-white'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App