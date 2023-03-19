import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LEVELS } from '../../models/filter.enum';


const Filter = ({filterItems}) => {

    const selectionRef = useRef(LEVELS.ALL)

    const getResult = (e) => {
        e.preventDefault();
        filterItems(selectionRef.current.value)
    }

    return (
        <div className='d-flex'>
            <h4>Filter todos:</h4>
            <form className='ms-3'>
                <select ref={selectionRef} onChange={ (e) => getResult(e)} defaultValue={LEVELS.ALL}>
                    <option value={LEVELS.ALL}>{LEVELS.ALL}</option>
                    <option value={LEVELS.ACTIVE}>{LEVELS.ACTIVE}</option>
                    <option value={LEVELS.COMPLETED}>{LEVELS.COMPLETED}</option>
                </select>
            </form>
        </div>
    );
};


Filter.propTypes = {
    filterItems: PropTypes.func.isRequired,
};


export default Filter;
