import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const Table = ({ data }) => {
  const router = useRouter();
  const filteredData = data?.campaigns;
  const visiblePageNumbers = Array.from(
    { length: data?.pageCount },
    (_, index) => 1 + index
  );

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    router.push(`/campaign/campaignList?page=${pageNumber}`);
  };

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* Filters */}
      <div className="flex justify-between mb-4 bg-[#FEF9F9] p-8 gap-4">
        {/* Filter 1 */}
        <input
          type="text"
          className="w-[25%] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="جستجو"
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
          {filteredData?.map((item) => (
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
        {/* Button to go to the previous page */}
        <button
          className="px-4 py-2 font-bold text-black"
          disabled={router.query.page === 1}
          onClick={() => handlePageChange(router.query.page - 1)}
        >
          <GoChevronLeft />
        </button>

        <div className="flex ltr">
          {/* Show visible page numbers */}
          {visiblePageNumbers.map((pageNumber, index) => {
            if (
              Math.abs(router.query.page - pageNumber) <= 4 ||
              index === 0 ||
              index === visiblePageNumbers.length - 1
            ) {
              return (
                <button
                  key={pageNumber}
                  className={`mx-1 px-3 py-1 rounded ${
                    router.query.page === pageNumber
                      ? "border-[#1890FF] border text-[#1890FF]"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            } else if (Math.abs(router.query.page - pageNumber) === 5) {
              return (
                <span key="ellipsis" className="mx-1">
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        {/* Button to go to the next page */}
        <button
          className="px-4 py-2 font-bold text-black"
          // disabled={currentPage}
          onClick={() => handlePageChange(router.query.page + 1)}
        >
          <GoChevronRight />
        </button>
      </div>
      
    </div>
  );
};

export default Table;
