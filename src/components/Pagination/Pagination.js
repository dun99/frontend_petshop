import React from "react";
import { Pagination } from "antd";
function PaginationApp() {
  return (
    <>
      <Pagination showQuickJumper defaultCurrent={1} total={50} />
    </>
  );
}

export default PaginationApp;
