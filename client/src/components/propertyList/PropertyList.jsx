import React from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Hotel_Sayaji%2CKolhapur.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/2006-06-14_Villa_Clooney_in_Laglio.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/db/Sani_Resort.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/ba/Sch%C3%B6nau_an_der_Triesting_-_Villa_%28Kirchengasse_11%29.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/Hiltonhotel.jpg",
  ];
  const { data, loading, error } = useFetch("/hotels/countByType");

  return (
    <div className="pList">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
