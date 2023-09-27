import React, { useEffect, useState } from "react";
import CreateCampaginItemModal from "../../component/CreateCampaginItemModal";
import axios from "axios";
import CampaignLayout from "../../core/component/campaignLayout";
import CreateValue from "../../component/CreateValue";
import Cookies from "js-cookie";
import Stepper from "../../component/stepper";

const index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tabs, setTabs] = useState("1");
  const [customField, setCustomFields] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL_BACKEND}/campaign-type-item`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setCustomFields(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateModalOpen = () => {
    setShowCreateModal(true);
  };

  return (
    <CampaignLayout>
      <div className="w-full">
        <div className="flex items-center justify-center w-1/2 gap-4 mx-auto mt-4 bg-white">
          <div
            className={
              tabs == "1"
                ? "p-4 bg-green-700 text-white border cursor-pointer"
                : "cursor-pointer p-4 border"
            }
            onClick={() => setTabs("1")}
          >
            ساخت رسانه
          </div>
          <div
            className={
              tabs == "2"
                ? "p-4 bg-green-700 text-white border cursor-pointer"
                : "cursor-pointer p-4 border"
            }
            onClick={() => setTabs("2")}
          >
            همه رسانه ها
          </div>
        </div>
      </div>
      {tabs == "1" && (
        <>
          <CreateCampaginItemModal
            isOpen={true}
            onClose={() => setShowCreateModal(false)}
            fetchData={fetchData}
          />
        </>
      )}
      {tabs == "2" && (
        <div className="p-10">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {customField.map((item) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4">
                      <img
                        className="!w-[50x] !h-[50px] object-contain"
                        src={item.primary_image}
                      />
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>

                    <td class="px-6 py-4"> تومان{item.price}</td>
                    <td class="px-6 py-4">$2999</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CampaignLayout>
  );
};

export default index;
