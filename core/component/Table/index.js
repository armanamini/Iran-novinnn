import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const Table = ({ data }) => {
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
  const paginationRange = 2; // Number of pages to show before and after the current page
  const firstPage = Math.max(1, currentPage - paginationRange);
  const lastPage = Math.min(totalPages, currentPage + paginationRange);

  // Generate an array of page numbers for the visible pages
  const visiblePageNumbers = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index
  );

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* Filters */}
      <div className="flex justify-between mb-4 bg-[#FEF9F9] p-8 gap-4">
        {/* Filter 1 */}
        <input
          type="text"
          className="w-[25%] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="جستجو"
          onChange={handleSearch}
        />

        {/* Filter 2 */}
        <select
          className="w-[25%] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="default"
        >
          <option value="default" disabled>
            همه کمپین ها
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          {/* Add more options as needed */}
        </select>

        {/* Filter 3 */}
        <select
          className="w-[50%] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="default"
        >
          <option value="default" disabled>
            همه وضعیت ها
          </option>
          <option value="option1">فعال</option>
          <option value="option2">غیرفعال</option>

          {/* Add more options as needed */}
        </select>
      </div>

      {/* Table */}
      <table
        className="w-full border border-gray-300"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              عنوان
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              نوع
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              قیمت
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              بودجه روزانه
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              هزینه امروز
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              عملیات
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              فعال
            </th>
            <th className="border-l p-3 border-gray-[#000000] bg-[#FAFAFA] text-start">
              نمایش
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="p-3 border border-gray-[#000000]">{item.title}</td>
              <td className="p-3 border border-gray-[#000000]">
                {item.type_name}
              </td>
              <td className="p-3 border border-gray-[#000000]">
                {item.balance}
              </td>
              <td className="p-3 border border-gray-[#000000]">
                {item.amount}
              </td>
              <td className="p-3 border border-gray-[#000000]">
                {item.payment_status}
              </td>
              <td className="p-3 border border-gray-[#000000]">
                دیتایی وارد نشده
              </td>
              <td className="p-3 border border-gray-[#000000]">
                <button className="bg-[#DAE1FF] p-2 rounded-[4px] text-[#002113] font-[14px]">
                  در حال اجرا
                </button>
              </td>
              <td className="p-3 border border-gray-[#000000]">
                <Link href={`/campaign/campaignList/reportDetail/${item.id}`}>
                  <button className="bg-[#BFFFDA] p-2 rounded-[4px] text-[#002113] font-[14px]">
                    نمایش
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          {/* Show dots at the beginning if not on the first page */}
          {currentPage > paginationRange + 1 && (
            <>
              <span className="mx-1">...</span>
            </>
          )}

          {/* Show visible page numbers */}
          {visiblePageNumbers.map((pageNumber) => (
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

          {/* Show dots at the end if not on the last page */}
          {currentPage < totalPages - paginationRange && (
            <>
              <span className="mx-1">...</span>
            </>
          )}
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

export default Table;
