import * as React from "react";
import SelectSearch, {fuzzySearch} from "react-select-search";
import {useState} from "react";

import "./NewPochta.css";
import {
    apiKeyNovaPochta,
    calledMethodGetCitiesNovaPochta,
    calledMethodGeWarehousesNovaPochta,
    modelNameNovaPochta
} from "../../config/constants";


export function NewPochta({setSity, setNumberNP, setVisibleSity, setVisibleNumber}) {
    const [nameSity, setNameSity] = useState('');
    const [nameDepartment, setNameDepartment] = useState('');
    const [value, setValue] = useState('hidden-n-p');

    const sity = {
        apiKey: apiKeyNovaPochta,
        modelName: modelNameNovaPochta,
        calledMethod: calledMethodGetCitiesNovaPochta
    }
    const department = {
        apiKey: apiKeyNovaPochta,
        modelName: modelNameNovaPochta,
        calledMethod: calledMethodGeWarehousesNovaPochta,
        methodProperties: {
            CityName: nameSity
        }
    }

    const handleChangeSity = (event) => {
        setNameSity(event);
        setSity(event)

        setValue('visible-n-p')
        setVisibleSity('visible')
    };
    const handleChangeDepartment = (event) => {
        setNameDepartment(event);
        setNumberNP(event);

        setVisibleNumber('visible')
    };


    return (
        <div>
            <div className={'full-center'}>
                <div className={'input-center-full'}>
                    <SelectSearch

                        options={[]}
                        getOptions={() => {
                            return new Promise((resolve, reject) => {
                                fetch(
                                    `https://api.novaposhta.ua/v2.0/json/`,
                                    {
                                        method: 'POST',
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
                                    .catch(reject);
                            });
                        }}
                        // onChange={setNameSity}
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
                                fetch(
                                    `https://api.novaposhta.ua/v2.0/json/`,
                                    {
                                        method: 'POST',
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
                                    .catch(reject);
                            });
                        }}
                        //onChange={setNameDepartment}
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
