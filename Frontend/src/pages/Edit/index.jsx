import Input from "../../components/Input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Edit = () => {
  // useState for store backendData
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState();

  // For navigate page
  const history = useHistory();

  // Get ID from parameter URL
  const { id } = useParams([]);

  // Hook useEffect
  useEffect(() => {
    const getDataById = async () => {
      // Get data from server
      const res = await axios.get(`/api/v1/product/${id}`);
      //get response data
      const data = res.data
      console.log(res.data);

      //assign data to state
      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setStatus(data.status);
    };
    //Call function "getDataById"
    getDataById();
  }, [id]);

  // Use formik and yup for dealing form
  const formik = useFormik({
    initialValues: {
      id: id,
      name: name,
      price: price,
      stock: stock,
      status: status,
    },
    enableReinitialize: true,
    onSubmit: function (values) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("status", values.status);

      try {
        console.log(formData);
        axios.put(`/api/v1/product/${id}`, formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      stock: Yup.number().required("Stock is required"),
    }),
  });

  const notification = (event) => {
    if (window.confirm("Apakah anda yakin untuk update data?") === true) {
      alert("Data Berhasil di Update")
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            defaultValue={formik.values.name}
            onChange={formik.handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            defaultValue={formik.values.price}
            onChange={formik.handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            defaultValue={formik.values.stock}
            onChange={formik.handleChange}
          />
          <Input 
            name="status" 
            type="checkbox" 
            label="Active"
            defaultChecked={formik.values.status}
            onChange={formik.handleChange}
          />
          <button type="submit" className="btn btn-primary" onClick={notification}>
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;