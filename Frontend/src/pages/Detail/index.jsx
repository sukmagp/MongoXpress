import { Link } from "react-router-dom";
import "./index.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  //state
  const [backendData, setBackendData] = useState([]);

  // Get ID from parameter URL
  const { id } = useParams([]);

  // Hook useEffect
  useEffect(() => {
    const getDataById = async () => {
      // Get data from server
      const res = await axios.get(`/api/v1/product/${id}`);
      // Assign data
      setBackendData(res.data);
      console.log(res.data);
    };
    //Call function "getDataById"
    getDataById();
  }, [id]);


  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
          {typeof backendData == "undefined" ? (
            <p>Loading...</p>
          ) : (
            
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>: {backendData._id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>: {backendData.name}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>: {backendData.price}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>: {backendData.stock}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>: { backendData.status ? 'Active' : 'Not Active' }</td>
                </tr>
              </tbody>
            )}
          
      </table>
    </div>
  );
};

export default Detail;