import React, { useEffect, useState } from 'react';
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
        fetchCats();
    }, []);

    const fetchCats = async () => {
        try {
            const [{ records: newRecords }, { records: oldRecords }] = await Promise.all([
                getTableData('NewDatabase'),
                getTableData('OldDatabase'),
            ]);

            const catMap = [...oldRecords.map(record => ({...record, old: true})), ...newRecords].reduce((result, record) => {
                const key = record.fields.name + (record.fields.imageUrl || record.fields.image);

                return {
                    ...result,
                    [key]: {
                        ...record,
                        fields: {
                            ...record.fields,
                            imageUrl: record.fields.imageUrl || record.fields.image,
                        },
                    },
                }
            }, {});

            setCatList(Object.values(catMap));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="adopt-page">
            <h1>Adopt One of These Cats!</h1>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((headerInfo) => {
                            return <th key={headerInfo.title}>{headerInfo.title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {catList.map((catInfo) => {
                        return (
                            <tr className="cat-summary" key={catInfo.id}>
                                <td>
                                    <img src={catInfo.fields.imageUrl} />
                                </td>
                                <td>
                                    <Link to={`/cat/${catInfo.old ? 'old' : 'new'}/${catInfo.id}`}>
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
