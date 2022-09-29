import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Tambah = () => {
  // For navigate page
  const history = useHistory();

  // Use formik and yup for dealing form
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      stock: "",
      status: false,
    },
    onSubmit: function (values) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("status", values.status);

      try {
        axios.post("/api/v1/product", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        alert("Produk berhasil di tambah")
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

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.touched.name && formik.errors.name && (
            <ul>
              <li
                style={{
                  color: "red",
                  marginTop: "-10px",
                  marginLeft: "20px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.name}
              </li>
            </ul>
          )}
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && (
            <ul>
              <li
                style={{
                  color: "red",
                  marginTop: "-10px",
                  marginLeft: "20px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.price}
              </li>
            </ul>
          )}

          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />

          {formik.touched.stock && formik.errors.stock && (
            <ul>
              <li
                style={{
                  color: "red",
                  marginTop: "-10px",
                  marginLeft: "20px",
                  fontSize: "12px",
                }}
              >
                {formik.errors.stock}
              </li>
            </ul>
          )}

          <Input name="status" type="checkbox" label="Active" value={formik.values.status} onChange={formik.handleChange}/>
          <button type="submit" className="btn btn-primary button-save">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;