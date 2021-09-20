import React from "react";
import "./Footer.scss";
import logo from "assets/images/logo-f.png";
import {
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
function FooterApp() {
  return (
    <footer class="font-weight-bold">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-md-6 info-footer">
            <div>
              <span class="contact-icon">
                <PhoneOutlined class="mr-2 contact-icon" />
              </span>
              <span class="contact-icon">0899.179.989</span>
            </div>
            <div>
              <span class="contact-icon">
                <MailOutlined />
              </span>
              cskh@moji.com
            </div>
            <p className="policy">Chính sách mua hàng</p>
            <p>Hướng dẫn mua hàng</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <p class="city">Hà Nội (9h-22h)</p>
            <p>8 Bà Triệu, Hai Bà Trưng</p>
            <p>241 Chùa Bộc, Đống Đa</p>
            <p>60 Trần Đại Nghĩa, Hai Bà Trưng</p>
            <p>226 Nguyễn Trãi, Nam Từ Liêmuoc</p>
            <p>60 Trần Đại Nghĩa, Hai Bà Trưng</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <p class="city">TP.Hồ Chí Minh</p>
            <p>92 Hồ Tùng Mậu, Q.1</p>
            <p>45 Nguyễn Đình Chiểu, Q.3</p>
            <p>708 Sư Vạn Hạnh, Q.10</p>
            <p>86 Bàu Cát, Q.Tân Bình</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <p>Hãy kết nối với chúng mình</p>
            <div class="icon-social">
              <YoutubeOutlined />
              <FacebookOutlined />
              <LinkedinOutlined />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterApp;
