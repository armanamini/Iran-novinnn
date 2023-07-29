import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
const TicketTable = ({ data }) => {
  const itemsPerPage = 8; // Number of items to display per page

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const [currentData, setCurrentData] = useState([]);

  const filteredData = useMemo(() => {
    return data?.length > 0 ? data.slice(startIndex, endIndex) : [];
  }, [data, startIndex, endIndex]);

  useEffect(() => {
    setCurrentData(filteredData);
  }, [filteredData]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    const enteredData = e.target.value;
    setCurrentData(data?.filter((item) => item.title.includes(enteredData)));
  };
  // Calculate total number of pages
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* Filters */}

      <p className="text-[24px] pb-5">تیکت های من</p>
      {/* Table */}
      <table
        className="w-full border border-gray-300"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              شناسه
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              نام
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              نام خانوادگی
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              شماره تماس
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              ایمیل
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border border-gray-[#000000]">
                {item.campaign_id}
              </td>
              <td className="p-3 border border-gray-[#000000]">{item.title}</td>
              <td className="p-3 border border-gray-[#000000]">
                {item.balance}
              </td>
              <td className="p-3 border border-gray-[#000000]">
                {item.amount}
              </td>

              <td className="p-3 border border-gray-[#000000]">
                دیتایی وارد نشده
              </td>
              <td className="p-3 border border-gray-[#000000]">
                <Link href={`/support/supportDetail/${item.id}`}>
                <button className="bg-[#BFFFDA] p-2 rounded-[4px] text-[#002113] font-[14px]">
                  نمایش
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length <= 0 && (
        <div className="flex flex-col items-center justify-center w-full py-10 mx-auto bg-white ">
          <h3 className="text-[24px] pb-2 font-[600]">هیچ تیکتی وجود ندارد</h3>
          <p className="text-[16px] text-[#AAAAB4]">
            شما هنوز هیچ تیکتی ثبت نکرده اید
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-start mt-4 ltr">
        <button
          className="px-4 py-2 font-bold text-black "
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <GoChevronLeft />
        </button>
        <div className="flex ltr">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-1 rounded  ${
                currentPage === pageNumber
                  ? "border-[#1890FF] border text-[#1890FF]"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 font-bold text-black "
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TicketTable;
