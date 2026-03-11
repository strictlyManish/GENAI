import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import Footer from "./pages/Footer.jsx";
import Navbar from "./features/auth/components/Navbar.jsx";
import { InterviewProvider } from "./features/ai/interview.context.jsx";

function App() {
  return (
    <div className="bg-[#1a1919] text-white">
      <AuthProvider>
      <Navbar />
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
