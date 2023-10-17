import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './adopt-page.css';
import { getTableData } from '../../utils/utils.js';

const tableHeaders = [
    { title: 'Picture' },
    {
        title: 'Name',
    },
    {
        title: 'Age',
    },
    {
        title: 'Description',
    },
    {
        title: 'Vaccinated',
    },
    {
        title: 'Microchipped',
    },
];

const AdoptPage = () => {
    const [catList, setCatList] = useState([]);

    useEffect(() => {
        getTableData('NewDatabase').then((data) => {
            console.log(data);
            setCatList(data.records);
        });
    }, []);
    return (
        <div className="adopt-page">
            <h1>Adopt One of These Cats!</h1>
            <table>
                <thead>
                    {tableHeaders.map((headerInfo) => {
                        return <th>{headerInfo.title}</th>;
                    })}
                </thead>
                <tbody>
                    {catList.map((catInfo) => {
                        return (
                            <tr className="cat-summary">
                                <td>
                                    <img src={catInfo.fields.imageUrl} />
                                </td>
                                <td>
                                    <Link to={`/cat/${catInfo.id}`}>
                                        {catInfo.fields.name}
                                    </Link>
                                </td>
                                <td>{catInfo.fields.age}</td>
                                <td>{catInfo.fields.description}</td>
                                <td>{catInfo.fields.vaccinated === 1 ? 'Yes' : 'No'}</td>
                                <td>{catInfo.fields.microchipped === 1 ? 'Yes' : 'No'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptPage;
