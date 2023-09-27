import React, { useState } from "react";

const BannerSelectionModal = ({ isOpen, banners, selectedBanners, onClose, onCPCChange }) => {
  const [cpcValues, setCPCValues] = useState({});

  const handleCPCChange = (bannerId, value) => {
    setCPCValues({
      ...cpcValues,
      [bannerId]: value,
    });
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Selected Banners</h2>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="modal-content">
            
              <div  className="banner-item">
                <div className="banner-info">
                  <p>{`Banner Size: ${banners[0]}`}</p>
                  {/* <span>{`CPC: ${cpcValues[banner.id] || ""}`}</span> */}
                </div>
                {/* <input
                  type="text"
                  placeholder="CPC"
                  value={cpcValues[banner.id] || ""}
                  onChange={(e) => handleCPCChange(banner.id, e.target.value)}
                /> */}
              </div>
            
          </div>
        </div>
      </div>
    )
  );
};

export default BannerSelectionModal;
