import React, { useEffect, useState } from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function index() {
  const [tableData, setTableData] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setShowCopiedPopup(true);

    setTimeout(() => {
      setShowCopiedPopup(false);
    }, 1500); // Hide the popup after 1.5 seconds
  };
  const refetch = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type-item`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setTableData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    refetch();
  }, []);

  const handleCheckVerify = (id) => [
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type-item/check-meta?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.msg);
        }
        if (response.data.success == true) {
          toast.success(response.data.msg);
          refetch();
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      }),
  ];

  return (
    <CampaignLayout>
      <div className="max-w-[80rem] mx-auto pt-24">
        <div className="flex justify-center">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  پروفایل
                </th>

                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  اسم
                </th>

                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  قیمت
                </th>

                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  تگ متا
                </th>

                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  وضعیت
                </th>

                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-600 uppercase bg-gray-200">
                  وریفای
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr className="bg-white" key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <img src={item.name} />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {item.price}
                  </td>
                  <td
                    className={`px-6 py-4  whitespace-no-wrap border-b border-gray-200 cursor-pointer ${
                      copiedIndex === index ? "bg-green-100" : ""
                    }`}
                    onClick={() => copyToClipboard(item.meta_tag)}
                  >
                    <pre className="p-4 bg-gray-100 rounded-md font-roboto-mono">
                      <code className="text-gray-800">{item.meta_tag}</code>
                    </pre>
                  </td>
                  <td
                    className={
                      item.is_verify == 1
                        ? "px-6 py-4 whitespace-no-wrap border-b bg-green-400 border-gray-200"
                        : "px-6 py-4 whitespace-no-wrap border-b bg-red-400 border-gray-200"
                    }
                  >
                    {item.is_verify == 1 ? "وریفای شده" : "وریفای نشده"}
                  </td>
                  {item.type_mode == 3 || item.type_mode == 4 ? (
                    item.is_verify == 1 ? (
                      <td className="px-6 py-4 whitespace-no-wrap bg-gray-300 border-b cursor-pointer">
                        وریفای شده{" "}
                      </td>
                    ) : (
                      <td
                        className="px-6 py-4 whitespace-no-wrap bg-blue-300 border-b cursor-pointer"
                        onClick={() => handleCheckVerify(item.id)}
                      >
                        تایید وریفای
                      </td>
                    )
                  ) : (
                    <td className="px-6 py-4 whitespace-no-wrap bg-gray-300 border-b">
                      {/* Render an empty cell for other type_mode values */}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCopiedPopup && (
        <div className="fixed p-2 text-white bg-green-400 rounded shadow top-4 right-4">
          Meta Tag Copied!
        </div>
      )}
    </CampaignLayout>
  );
}

export default index;
