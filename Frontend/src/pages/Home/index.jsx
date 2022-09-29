import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.scss";
import axios from 'axios';
import debounce from 'lodash.debounce';

const Home = () => {
  // Define state
  const [backendData, setBackendData] = useState([]);
  const [query, setQuery] = useState([]);

  // Update query to search
  const updateQuery = e => setQuery(e?.target?.value)

  // Debounce function to wait before update query to search in this case 300 ms
  const debouncedOnChange = debounce(updateQuery, 300)

  // Function to delete data
  const deleteItem = async (id) => {
    if (window.confirm("Apakah anda yakin untuk hapus data?") === true) {
      await axios.delete(`/api/v1/product/${id}`)
      alert("Data Berhasil di hapus")
      fetchData();
    } else {
      return function(e) {
        e.preventDefault()
      };
    }
  }

  // Function to fetch data from backend
  const fetchData = async () => {
    const res = await axios.get(`/api/v1/product?q=${query}`);
    setBackendData(res.data);
    console.log(res.data);
  };

  // Use useEffect to synchronize data from backend
  useEffect(() => {
    // other code
    fetchData();
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [query])
 

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary button-add">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={debouncedOnChange}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        
          {(typeof backendData == "undefined") ? (
            <p>Loading...</p>
          ) : (
            backendData.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>{item.name}</td>
                <td className="text-right">RP. {item.price}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="/#" onClick={() => deleteItem(item._id)} className="btn btn-sm btn-danger">
                    Delete
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;