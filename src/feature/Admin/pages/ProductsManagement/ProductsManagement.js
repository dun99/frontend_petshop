import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import PaginationApp from "components/Pagination/Pagination";
import { storage } from "feature/Auth/firebase";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesRequest } from "redux/categoriesSlice";
import { getProductById } from "redux/productDetailSlice";
import {
  createProductRequest,
  deleteProductRequest,
  fetchProductsRequest,
  searchName,
  updateProductRequest,
} from "redux/productsSlice";
import { formatMoney } from "util/formatMoney";
import "./ProductsManagement.scss";
const { Search } = Input;
function ProductsManagement() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [urls, setUrls] = useState("");
  const products = useSelector((state) => state.products.list);
  const { categories } = useSelector((state) => state.categories);
  const filters = useSelector((state) => state.products.filters);
  const totalCount = useSelector((state) => state.products.count);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const typingTimeout = useRef(null); // debouce search

  useEffect(() => {
    setloading(true);

    setTimeout(() => {
      dispatch(fetchProductsRequest(filters));
      setloading(false);
    }, 1000);
  }, [filters, totalCount, dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);

  useEffect(() => {
    // add product
    if (!item) {
      setEditing(null);
      form.setFieldsValue({
        name: "",
        category: "",
        price: "",
        desc: "",
        image: "",
        quantity: "",
        freeShipping: "",
      });
      setUrls("");
    }
    // edit
    else {
      setEditing(item);
      if (editing !== null) {
        form.setFieldsValue({
          name: editing.name,
          category: editing.category._id,
          price: editing.price,
          desc: editing.desc,
          image: editing.image,
          quantity: editing.quantity,
          freeShipping: editing.freeShipping,
        });
      }
    }
  }, [item, isModalVisible, editing, products]);

  const showModal = () => {
    setIsModalVisible(true);
    setItem(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteProduct = (data) => {
    dispatch(deleteProductRequest(data));
  };

  const handleUpdateProduct = (data) => {
    setIsModalVisible(true);
    dispatch(getProductById(data._id));
    setUrls(data.image);
    setItem(data);
  };

  const columns = [
    {
      title: "No.",
      render: (text, record, index) => index + 1,
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => formatMoney(text),
      sorter: (record1, record2) => {
        return record1.price - record2.price;
      },
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      filters: categories.map((item) => ({
        value: item._id,
        text: item.name,
      })),
      onFilter: (value, record) => {
        // console.log(value, record.category);
        // return record.category._id.indexOf(value) === 0;
        // console.log(record);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdateProduct(record)}>Edit</a>
          <a onClick={() => handleDeleteProduct(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish = async (values) => {
    const newinfo = {
      ...values,
      price: parseFloat(values.price),
      image: urls,
      status: values.quantity === 0 ? "Out of stock" : "In stock",
    };
    if (editing === null) {
      dispatch(createProductRequest(newinfo));
    } else {
      await dispatch(
        updateProductRequest({
          ...newinfo,
          _id: item._id,
        })
      );
      dispatch(fetchProductsRequest(filters));
    }
    setIsModalVisible(false);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    setImageUrl(img);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (imageUrl) => {
      setUrls(imageUrl);
      setImageUrl(imageUrl);
    });
  };

  const uploadImage = () => {
    storage
      .ref("productImages/" + imageUrl.name)
      .put(imageUrl)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((url) => {
        setUrls(url);
      })
      .catch((error) => {
        return error;
      });
  };

  const handleSearch = (value) => {
    dispatch(searchName(value));
  };

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      dispatch(searchName(value));
    }, 1000);
  };

  return (
    <>
      <h1>Products Management</h1>
      <Search
        placeholder="search name"
        onSearch={handleSearch}
        onChange={handleChangeSearch}
        allowClear
        enterButton
      />
      <Button type="primary" onClick={showModal} className="add-product">
        Add New <PlusOutlined />
      </Button>
      <Modal
        title={!item ? "Add product" : "Edit product"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="profile">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="register-form"
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Categoriy">
              <Select>
                {categories.map((category) => (
                  <Select.Option value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="freeShipping" label="Free Shipping">
              <Select>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input
                type="number"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item name="desc" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={uploadImage}
              >
                {urls ? (
                  <img src={urls} alt="Image" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Table
        loading={loading}
        columns={columns}
        dataSource={products}
        total={totalCount}
        pagination={false}
      />
      <PaginationApp totalCount={totalCount} />
    </>
  );
}

export default ProductsManagement;
