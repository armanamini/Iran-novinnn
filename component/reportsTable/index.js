import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const ReportsTable = ({ data, row, head }) => {
  console.log("data", data);
  console.log("row", row);
  // console.log("head_fields", JSON.parse(head));

  let parsedHead = [];
  try {
    parsedHead = JSON.parse(head);
  } catch (error) {
    console.error("Error parsing head JSON:", error);
  }

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* Filters */}
      <div className="flex justify-between mb-4 bg-[#FEF9F9] p-8 gap-4">
        {/* Filter 1 */}
        <inputs
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
            <th className="border p-3 w-auto bg-[#FAFAFA] text-start">عنوان</th>
            {parsedHead
              ?.filter((item) => item.is_report == 1)
              .map((item) => (
                <th
                  key={item.field_id}
                  className="px-6 py-4 border w-auto h-[50px] text-right text-[14px]"
                >
                  {item.name}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
          {row?.length === 0 ? (
            <tr className="border">
              <td className="p-3 border " colSpan={parsedHead.length + 1}>
                No data available
              </td>
            </tr>
          ) : (
            row?.map((item) => {
              const is_reportData = JSON.parse(item.fields);
              let nameData;
              is_reportData?.forEach((element) => {
                if (element.is_report == 1) {
                  nameData = element.value;
                }
              });

              return (
                <tr key={item.id} className="border">
                  <td className="p-3 border ">{item.name}</td>
                  {is_reportData?.map((item2) => {
                    if (item2.is_report == 1) {
                      return (
                        <>
                          <td className="p-3 border">{item2.value}</td>
                        </>
                      );
                    }
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
