import React, { useState } from 'react';

function Orderd(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const accordionId = `accordion-${props.name}`; // Unique identifier for each accordion

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 col-10 mx-auto">
          <div className="mb-5 p-2 sign-box">
            <div className="mt-2 mb-1 col-12 col-md-6 col-lg-12 col-xl-12 detail-box ">
              <div className="accordion col" id={accordionId}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${props.name}`}>
                    <button
                      className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${props.name}`}
                      aria-expanded={isOpen ? 'true' : 'false'}
                      aria-controls={`collapse-${props.name}`}
                      onClick={toggleAccordion}
                    >
                      {props.name}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${props.name}`}
                    className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                    aria-labelledby={`heading-${props.name}`}
                    data-bs-parent={`#${accordionId}`}
                  >
                    <div className="accordion-body ab">
                      <h6>Orderd By: {props.name}</h6>
                      <h6>Phone No: {props.phone}</h6>
                      <pre><h6>E-mail: {props.email}</h6></pre>
                      
                      <h6>State: {props.state}</h6>
                      <h6>City: {props.city}</h6>
                      <h6>Address: {props.address}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orderd;
