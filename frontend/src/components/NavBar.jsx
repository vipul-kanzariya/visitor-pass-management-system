import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">VPMS</div>
       <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
        <Link to="/visitor" className="hover:text-blue-200">Visitors</Link>
        <Link to="/pass" className="hover:text-blue-200">Pass</Link>
       </div>
      <div className="flex items-center gap-4">
          <span>Hello, {user?.name}</span>
        <button  onClick={handleLogOut}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
        >Logout</button>
      </div>
      </div>
    </>
  );
}

export default NavBar;
