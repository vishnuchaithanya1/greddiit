import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Buffer from "./Buffer";
import { useState } from "react";
import { useEffect } from "react";
const host = "https://redditbackend.onrender.com";

function DateUserGraph(props) {
  const [data, setdata] = useState(null);
  const getdata = async () => {
    const response = await fetch(`${host}/api/subgreddit/reportedpostsgrowth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gredditid: props.id }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.error) setdata(json);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      {!data && <Buffer />}
      {data && (
        <ResponsiveContainer width="60%" height={400}>
          <BarChart width={"60%"} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reports" fill="#8884d8" />
            <Bar dataKey="deletions" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

export default DateUserGraph;
