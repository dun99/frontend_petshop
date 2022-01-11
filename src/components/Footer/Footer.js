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
import { useTranslation } from "react-i18next";

function FooterApp() {
  const { t } = useTranslation();
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
            <p className="policy">{t("Policy")}</p>
            <p>{t("Shopping guide")}</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <p class="city">Ha Noi (9h-22h)</p>
            <p>8 Ba Trieu, Hai Ba Trung</p>
            <p>241 Chua Boc, Dong Da</p>
            <p>60 Tran Dai Nghia, Hai Ba Trung</p>
            <p>226 Nguyen Trai, Nam Tu Liem</p>
            <p>60 Tran Dai Nghia, Hai Ba Trung</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <p class="city">TP.Ho Chi Minh</p>
            <p>92 Ho Tung Mau, Q.1</p>
            <p>45 Nguyen Dinh CHieu, Q.3</p>
            <p>708 Su van Hanh, Q.10</p>
            <p>86 Bau Cat, Q.Tan Binh</p>
          </div>
          <div class="col-xl-3 col-md-6 info-footer">
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <p>{t("Connect with us")}</p>
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
