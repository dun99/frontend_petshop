import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { storage } from "feature/Auth/firebase";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "redux/userSlice";
import "./Profile.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile() {
  const [imageUrl, setimageUrl] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userInfo = useSelector((state) => state.users.user);
  const [urls, setUrls] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      dispatch(fetchUserById(currentUser.uid));
      setimageUrl(userInfo.avatar);
      form.setFieldsValue({
        email: userInfo.email,
        nickname: userInfo.nickname,
        phone: userInfo.phone,
        avatar: userInfo.avatar,
      });
    }
  }, [currentUser, userInfo.email, imageUrl]);

  useEffect(() => {
    dispatch(fetchUserById(currentUser.uid));
    setUrls(userInfo.avatar);
  }, [userInfo.avatar]);

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
      id: userInfo.id,
      avatar: urls,
    };
    dispatch(updateUser(newinfo));
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
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
      setimageUrl(imageUrl);
    });
  };

  const uploadAvatar = () => {
    storage
      .ref("images/" + imageUrl.name)
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

  return (
    <div className="profile">
      <ToastContainer autoClose={2000} />
      <h1 className="profile-title">Hồ sơ của tôi</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          email: userInfo.email,
          nickname: userInfo.nickname,
          phone: userInfo.phone,
          avatar: userInfo.avatar,
        }}
        className="register-form"
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="nickname" label="Nickname">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item name="avatar" label="Avatar">
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={uploadAvatar}
          >
            {urls ? (
              <img src={urls} alt="avatar" style={{ width: "100%" }} />
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
  );
}

export default Profile;
