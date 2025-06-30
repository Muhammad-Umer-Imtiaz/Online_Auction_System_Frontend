import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../store/slice/superAdminSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const AllUser = () => {
  const { allUsers } = useSelector(
    (state) => state.superAdmin
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
      return;
    }
    dispatch(getAllUsers());
  }, [dispatch, isAuthenticated, navigateTo]);


  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Users",
        data: allUsers,
        borderColor: "#D6482B",
        fill: false,
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Users Registered",
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default AllUser