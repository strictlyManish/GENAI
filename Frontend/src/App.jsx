import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import Footer from "./pages/Footer.jsx";
import Navbar from "./pages/Navbar.jsx";
import { InterviewProvider } from "./features/ai/Interview.context.jsx";

function App() {
  return (
    <div className="bg-[#1a1919] min-h-screen text-white">
      <Navbar />
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
