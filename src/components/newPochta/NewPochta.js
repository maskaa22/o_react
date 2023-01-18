import * as React from "react";
import {useState} from "react";
import SelectSearch, {fuzzySearch} from "react-select-search";

import "./NewPochta.css";
import './NewPochta@media.css';
import {
    apiKeyNovaPochta,
    calledMethodGetCitiesNovaPochta,
    calledMethodGeWarehousesNovaPochta,
    modelNameNovaPochta
} from "../../config/constants";
import {NEW_POCHTA_URL} from "../../config/URL";
import {
    WORD_HIDDEN,
    WORD_POST, WORD_SWAL_ERROR, WORD_SWAL_OK,
    WORD_SWAL_TEXT_ERROR,
    WORD_VISIBLE,
    WORD_VISIBLE_N_P
} from "../../config/wordsConstants";
import {SwalFunction} from "../utils/function";

export function NewPochta({setSity, setNumberNP, setVisibleSity, setVisibleNumber}) {

    const [nameSity, setNameSity] = useState('');
    const [nameDepartment, setNameDepartment] = useState('');
    const [value, setValue] = useState(WORD_HIDDEN);

    const sity = {
        apiKey: apiKeyNovaPochta,
        modelName: modelNameNovaPochta,
        calledMethod: calledMethodGetCitiesNovaPochta
    };

    const department = {
        apiKey: apiKeyNovaPochta,
        modelName: modelNameNovaPochta,
        calledMethod: calledMethodGeWarehousesNovaPochta,
        methodProperties: {
            CityName: nameSity
        }
    };

    const handleChangeSity = (event) => {
        setNameSity(event);
        setSity(event);
        setValue(WORD_VISIBLE_N_P);
        setVisibleSity(WORD_VISIBLE);
    };

    const handleChangeDepartment = (event) => {
        setNameDepartment(event);
        setNumberNP(event);
        setVisibleNumber(WORD_VISIBLE)
    };

    return (
        <div>
            <div className={'full-center'}>
                <div className={'input-center-full'}>
                    <SelectSearch
                        options={[]}
                        getOptions={() => {
                            return new Promise((resolve, reject) => {
                                fetch(NEW_POCHTA_URL,
                                    {
                                        method: WORD_POST,
                                        body: JSON.stringify(sity)
                                    }
                                )
                                    .then((response) => response.json())
                                    .then(({data}) => {

                                        resolve(
                                            data.map(({Description}) => ({
                                                value: Description,
                                                name: Description
                                            }))
                                        );
                                    })
                                    .catch((reject) => {
                                        SwalFunction(WORD_SWAL_TEXT_ERROR, reject, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
                                    });
                            });
                        }}
                        onChange={handleChangeSity}
                        search
                        filterOptions={fuzzySearch}
                        placeholder="Оберіть місто"
                    />
                </div>
            </div>
            <div className={`full-center ${value}`}>
                <div className={'input-center-full select-search-last'}>
                    <SelectSearch
                        options={[]}
                        getOptions={() => {
                            return new Promise((resolve, reject) => {
                                fetch(NEW_POCHTA_URL,
                                    {
                                        method: WORD_POST,
                                        body: JSON.stringify(department)
                                    }
                                )
                                    .then((response) => response.json())
                                    .then(({data}) => {

                                        resolve(
                                            data.map(({Description, Number}, index) => ({
                                                value: Number,
                                                name: Description,
                                                index: index
                                            }))
                                        );
                                    })
                                    .catch((reject) => {
                                        SwalFunction(WORD_SWAL_TEXT_ERROR, reject, WORD_SWAL_ERROR, WORD_SWAL_OK, true);
                                    });
                            });
                        }}
                        onChange={handleChangeDepartment}
                        search
                        filterOptions={fuzzySearch}
                        placeholder="Оберіть № відділення"
                    />
                </div>
            </div>
        </div>
    );
}
