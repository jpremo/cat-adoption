//Old database name is OldDatabase
//New database name is NewDatabase
export const getTableData = async (databaseName) => {
    const res = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${databaseName}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }
    );
    const data = await res.json();
    return data;
};

export const getCatInfo = async (databaseName, id) => {
    const res = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${databaseName}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }
    );
    const data = await res.json();
    return data;
};

export const deleteCat = async (databaseName, id) => {
    const res = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${databaseName}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
            method: 'DELETE',
        }
    );
    const data = await res.json();
    return data;
};
