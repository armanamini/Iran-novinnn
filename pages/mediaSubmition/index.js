import React, { useEffect, useState } from "react";
import CreateCampaginItemModal from "../../component/CreateCampaginItemModal";
import axios from "axios";
import CampaignLayout from "../../core/component/campaignLayout";

const index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL_BACKEND}/campaign-type-item`)
      .then((response) => {
        setCustomFields(response.data);
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
      <CreateCampaginItemModal
        isOpen={true}
        onClose={() => setShowCreateModal(false)}
        fetchData={fetchData} // Close the modal
      />
    </CampaignLayout>
  );
};

export default index;
