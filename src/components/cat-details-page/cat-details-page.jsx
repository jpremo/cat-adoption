import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const CatDetailsPage = () => {
    const [catData, setCatData] = useState([]);

    //https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${databaseName}/${catId}

    async function getIndivCat() {
        const res = await fetch(
            `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/NewDatabase/${catId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
                },
            }
        )
        let returnData = await res.json();
        return returnData;
    }

    useEffect(() => {
        getIndivCat().then((data) => {
            console.log(data);
            setCatData(data);
        });
    }, [])

    let { catId } = useParams(); 
    console.log(catId);
    console.log(catData);
    //for the calls for tr and td html elements, we talked about changing these
    return (
        <div className="cat-details">
            <tr className="cat-summary">
                <td>
                    <img src={catData.fields.imageUrl} />
                </td>
                <td>{catData.fields.name}</td>
                <td>{catData.fields.age}</td>
                <td>{catData.fields.description}</td>
                <td>{catData.fields.vaccinated === 1 ? 'Yes' : 'No'}</td>
                <td>{catData.fields.microchipped === 1 ? 'Yes' : 'No'}</td>
            </tr>
        </div>
    );
};

export default CatDetailsPage;
