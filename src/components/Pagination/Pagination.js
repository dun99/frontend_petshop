import { Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "redux/productsSlice";

function PaginationApp(props) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const handleChangePage = (current) => {
    const newFilters = {
      ...filters,
      _page: current,
    };
    dispatch(changePage(newFilters));
  };

  return (
    <>
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={props.totalCount}
        defaultPageSize={6}
        onChange={handleChangePage}
      />
    </>
  );
}

export default PaginationApp;
