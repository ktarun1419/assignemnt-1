import React, { useEffect, useState } from "react";
import "./listing.css";
import axios from "axios";
import Pagination from "./Pagination";
const Listing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [allData, setAllData] = useState([]);
  const pageSize = 10;
  useEffect(() => {
    if (data?.length <= 0) {
      axios
        .get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
        .then((res) => {
          let data = res?.data;
          handleAllData(data);
        });
    }
  }, []);
  const handleAllData = (data) => {
    if (data) {
      let newData =
        Array.isArray(data) &&
        data?.sort((a, b) => {
          return a?.id - b?.id;
        });
      // console.log({ newData, data });
      setData(newData?.slice(0, 10));
      setAllData(newData);
    }
  };
  const handleSelect = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected?.filter((a) => a?.id !== item?.id));
    }
  };
  const onPageChange = (currentPage) => {
    let newData = allData?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    console.log({ newData, currentPage });
    setPage(currentPage);
    setData(newData);
  };
  const handleSearch = (value) => {
    let timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (value?.length > 0) {
        let newData = allData?.filter((item) =>
          item?.name?.toLowerCase().includes(value.toLowerCase())
        );
        console.log({ newData });
        setData(newData);
      } else {
        handleAllData(allData);
      }
    }, 500);
  };
  const handleDelete=(item)=>{
    setData(data?.filter((a) => a?.id !== item?.id))
    setAllData(allData?.filter((a) => a?.id !== item?.id))
  }
  return (
    <div className="main">
      {console.log({ selected })}
      <div className="container">
        <div className="search-box">
          <input onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <div className="listing">
          <div className="header">
            <div>Name</div>
            <div>E-mail</div>
            <div>Role</div>
            <div>Actions</div>
          </div>

          {Array.isArray(data) &&
            data?.length > 0 &&
            data?.map((item) => (
              <div className="each">
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelect(e, item)}
                  />
                  {item?.name}
                </div>
                <div>{item?.email}</div>
                <div>{item?.role}</div>
                <div>
                  <div className="svg" onClick={()=>handleDelete(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                  </div>
                  <div className="svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="edit"
                    >
                      <path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Pagination
          currentPage={page}
          onPageChange={onPageChange}
          totalItems={allData?.length}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default Listing;
