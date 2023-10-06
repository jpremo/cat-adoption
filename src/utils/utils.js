//Old database name is OldDatabase
//New database name is NewDatabase

//Todo: move the base url to environment varaible
const BASE_URL = 'https://api.airtable.com/v0'

export const getTableData = async (databaseName) => {
    const res = await fetch(
        `${BASE_URL}/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${databaseName}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }
    );
    const data = await res.json();
    return data;
};


export const addCatToNewDB = async (newCatFields) => {
    const res = await fetch(
        `${BASE_URL}/${process.env.REACT_APP_AIRTABLE_BASE_ID}/NewDatabase`,
        {   method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
            body: JSON.stringify(newCatFields)
        }
    );
    const data = await res.json();
    return data;
};
