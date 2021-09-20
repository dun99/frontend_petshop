import { Line } from "@ant-design/charts";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataStatistic } from "redux/statisticSlice";
function Home() {
  const dispatch = useDispatch();
  const revenue = useSelector((state) => state.revenue.list);

  useEffect(() => {
    dispatch(fetchDataStatistic());
  }, []);

  const config = {
    data: revenue,
    height: 400,
    xField: "time",
    yField: "total",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return (
    <>
      <h1>Revenue</h1>
      <Line {...config} />
    </>
  );
}

export default Home;
