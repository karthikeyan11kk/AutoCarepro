import React, { useState } from 'react';
import axios from "../axios/axiosConfig";
import { Homelogo } from '../assets';
import styles from '../style';
import { Footer, Navbar } from '../components/Landingpage';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from '../redux/alertSlice';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", formData);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Sucessfully Logged In");
        localStorage.setItem("token", response.data.token);
        navigate("/userdashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error:", errorMessage);
      dispatch(hideLoading());
      toast.error(`${errorMessage}`);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <section className="flex flex-col md:flex-row justify-center items-center py-10 md:py-20 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row justify-center items-center py-10 md:py-10 px-4 md:px-10 lg:px-10 shadow-2xl shadow-grey rounded-3xl">
          <div className="flex-1 w-full md:w-1/2 flex justify-center items-center p-6 md:p-8 lg:p-12">
            <img src={Homelogo} alt="Home logo" className="w-[90%] h-[90%] object-cover rounded-lg" />
          </div>
          <div className="flex-1 w-full md:w-1/2 bg-white p-6 md:p-8 lg:p-12 mb-10 md:mb-0">
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">Login</h2>
            <form onSubmit={onFinish}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <button
                  className="bg-yellowpro hover:bg-yellowprolight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <a className="text-yellowpro ml-10 font-semibold" href="/Register">Register Now</a>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className={`${styles.paddingX}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
