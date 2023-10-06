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

    const compareCats = (cat1, cat2) => {
        if(cat1.name === cat2.name && cat1.intakeDate === cat2.intakeDate) {
            return true
        }
        return false
    }
    
    const updateFormat = (cat) => {
        const fields = cat.fields
        return {
            id: cat.id,
            createdTime: cat.createdTime,
            fields:  {
                name: fields.name,
                imageUrl: fields.image,
                intakeDate: fields.intakeDate,
                microchipped: fields.microchipped,
                vaccinated: "not provided",
                age: fields.age,
                description: "not provided"
            }
        }
    }
    
    const fetchCats = async () => {
        const newDBRecords = await getTableData('NewDatabase')

        const oldDBRecords = await getTableData('OldDatabase')

        const uniqueRecords = newDBRecords.records

        oldDBRecords.records.forEach((newCat) => {
            if(!uniqueRecords.some((cat) => compareCats(cat.fields, newCat.fields))) {
                uniqueRecords.push(updateFormat(newCat))
            }
        })
        setCatList(uniqueRecords)
    }

    useEffect(() => {
        fetchCats()
    }, []);

    return (
        <div className="adopt-page">
            <h1>Adopt One of These Cats!</h1>
            <table>
                <thead>
                    {tableHeaders.map((headerInfo) => {
                        return <th key={headerInfo.title} >{headerInfo.title}</th>;
                    })}
                </thead>
                <tbody>
                    {catList.map((catInfo, index) => {
                        return (
                            <tr className="cat-summary" key={index}>
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
                                <td>{catInfo.fields.vaccinated}</td>
                                <td>{catInfo.fields.microchipped}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptPage;
