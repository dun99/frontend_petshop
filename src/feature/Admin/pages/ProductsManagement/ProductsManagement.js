import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Space,
  Table,
  Upload,
  Form,
  Modal,
  Select,
} from "antd";
import PaginationApp from "components/Pagination/Pagination";
import { storage } from "feature/Auth/firebase";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getProductById } from "redux/productDetailSlice";
import {
  createProductRequest,
  deleteProductRequest,
  fetchProductsRequest,
  searchName,
  updateProductRequest,
} from "redux/productsSlice";
import { formatMoney } from "until/formatMoney";
import "./ProductsManagement.scss";
const { Search } = Input;
function ProductsManagement() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [urls, setUrls] = useState("");
  const products = useSelector((state) => state.products.list);
  const filters = useSelector((state) => state.products.filters);
  const totalCount = useSelector((state) => state.products.count);
  const productDetail = useSelector((state) => state.productDetail.product);
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
  }, [filters, totalCount, productDetail]);

  useEffect(() => {
    // add product
    if (!item) {
      setEditing(null);
      form.setFieldsValue({
        name: "",
        categories: "",
        price: "",
        description: "",
        image: "",
      });
      setUrls("");
    }
    // edit
    else {
      setEditing(item);
      if (editing !== null) {
        form.setFieldsValue({
          name: editing.name,
          categories: editing.categories,
          price: editing.price,
          description: editing.description,
          image: editing.image,
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
    dispatch(getProductById(data.id));
    setUrls(data.image);
    setItem(data);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
        return record1.price > record2.price;
      },
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      filters: [
        // tren doc em thay antd dung value la text luon a
        {
          text: "Quà lưu niệm",
          value: "Quà lưu niệm",
        },
        {
          text: "Dụng cụ cá nhân",
          value: "Dụng cụ cá nhân",
        },
        {
          text: "Sticker",
          value: "Sticker",
        },
        {
          text: "Đồ dùng học tập",
          value: "Đồ dùng học tập",
        },
      ],
      onFilter: (value, record) => {
        return record.categories.indexOf(value) === 0;
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

  const onFinish = (values) => {
    const newinfo = {
      ...values,
      price: parseFloat(values.price),
      image: urls,
    };
    if (editing === null) {
      dispatch(createProductRequest(newinfo));
    } else {
      dispatch(
        updateProductRequest({
          ...newinfo,
          id: item.id,
        })
      );
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
      <ToastContainer autoClose={2000} />
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
        title="Add Product"
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
            <Form.Item name="categories" label="Categoriy">
              <Select>
                <Select.Option value="Quà lưu niệm">Quà lưu niệm</Select.Option>
                <Select.Option value="Dụng cụ cá nhân">
                  Dụng cụ cá nhân
                </Select.Option>
                <Select.Option value="Sticker">Sticker</Select.Option>
                <Select.Option value="Đồ dùng học tập">
                  Đồ dùng học tập
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item name="description" label="Description">
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
