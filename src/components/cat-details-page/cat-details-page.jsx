import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCat, getCatInfo } from "../../utils/utils";

const CatDetailsPage = () => {
    const { catId, from } = useParams();
    const navigate = useNavigate();
    const [catInfo, setCatInfo] = useState();

    const databaseName = from === 'new' ? 'NewDatabase' : 'OldDatabase';

    useEffect(() => {
        if (!catId || !from) {
            return;
        }

        fetchCatInfo();
    }, [catId, from]);

    const fetchCatInfo = async () => {
        try {
            const data = await getCatInfo(databaseName, catId);
            setCatInfo(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCat(databaseName, catId);
            navigate('/adopt');
        } catch (err) {
            console.log(err);
        }
    }

    if (!catInfo) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="cat-details">
            <div>
                <img alt={catInfo.fields.name} src={catInfo.fields.imageUrl || catInfo.fields.image} />
            </div>
            <div>Name: {catInfo.fields.name}</div>
            <div>Age: {catInfo.fields.age}</div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CatDetailsPage;
