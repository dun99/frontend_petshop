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
        defaultCurrent={filters._page}
        current={filters._page}
        total={props.totalCount}
        defaultPageSize={filters._limit}
        onChange={handleChangePage}
      />
    </>
  );
}

export default PaginationApp;
