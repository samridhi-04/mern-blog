import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Projects from "./pages/Projects";

import Header1 from "./Components/Header1";
import FooterCom from "./Components/FooterCom";
import PrivateRoute from "./Components/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
    
    <Header1></Header1>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<DashBoard/>}/>
      </Route>
      <Route path="/projects" element={<Projects/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  );
}

export default App;
