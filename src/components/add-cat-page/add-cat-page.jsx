import React from 'react';
import CatForm from '../cat-form/cat-form';
import { addCatToNewDB } from '../../utils/utils';

const AddCatPage = () => {
    const onSubmitForm = async (catData) => {
        /*
        I was trying to submit a fields using the fields paramter to create a single record as mentioned in the documentation.
        But I think we need to have it like {fields: {fields }} to fix the issue
        */
        const results = await addCatToNewDB({fields: catData})
        //Todo: alert the user in case of success or error
    };
    return (
        <div>
            <h1>Add a New Cat!</h1>
            <CatForm onSubmit={onSubmitForm} />
        </div>
    );
};

export default AddCatPage;
