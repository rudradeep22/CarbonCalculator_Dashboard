import React, { useState } from 'react';
import Excel from 'exceljs';

const fetchURL = import.meta.env.VITE_URL + "/register";
console.log(fetchURL);
const ExcelUploader = ({setLectures, setProjects, setPapers}) => {
    const data_from_excel = [];
    const name = "lectures";

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            const [newLectures, newProjects, newPapers] = [[], [], []];
            wb.xlsx.load(buffer).then( async (workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row) => {
                        data_from_excel.push(row.values);
                    });
                });
                data_from_excel.slice(1).forEach(data => {
                    newLectures.push(data[1]);
                    newProjects.push(data[2]);
                    newPapers.push(data[3]);
                })
                setLectures(newLectures);
                setProjects(newProjects);
                setPapers(newPapers);
                let result = await fetch(
                    fetchURL, {
                        method: "post",
                        body: JSON.stringify({name, newLectures, newProjects, newPapers}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                result = await result.json();
                console.log(result);
                if(result)
                    console.log("Data saved succefully");
            });
        };
    };
    return (
        <div>
            <input 
                    type='file' 
                    onChange={(e) => handleChange(e)} 
                    id="excel-input" 
                    className="hidden" // Hide the default input appearance
                />
            <label 
                htmlFor="excel-input" // Associate label with the input element
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer"
            >
                Upload Excel File
            </label>

        </div>
    );
};

export default ExcelUploader;
