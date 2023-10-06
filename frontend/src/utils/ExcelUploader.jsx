import React, { useState } from 'react';
import Excel from 'exceljs';

const fetchURL = import.meta.env.VITE_URL + "/api/register";
console.log(fetchURL);
const ExcelUploader = ({setLinkedinPosts, setNewsPaperArticles,  setProjects, setPapers, setNetZeroIITKStatus, setNetZeroArmyCanttStatus, setOutreachActicities}) => {
    const data_from_excel = [];
    const name = "statistics";

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            const [newLinkedinPosts, newNewsPaperArticles, newProjects, newPapers, newOutreachActivities] = [[], [], [], [], []];
            let [newNetZeroIITKStatus, newNetZeroArmyCanttStatus] = ["", "", ""];
            wb.xlsx.load(buffer).then( async (workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row) => {
                        data_from_excel.push(row.values);
                    });
                });
                // console.log("data from excel" + data_from_excel);
                data_from_excel.slice(1).forEach(data => {
                    newLinkedinPosts.push(data[1]);
                    newNewsPaperArticles.push(data[2]);
                    newProjects.push(data[3]);
                    newPapers.push(data[4]);
                    newOutreachActivities.push(data[7]);
                })
                newNetZeroIITKStatus += data_from_excel[1][5];
                newNetZeroArmyCanttStatus += data_from_excel[1][6];
                setLinkedinPosts(newLinkedinPosts);
                setNewsPaperArticles(newNewsPaperArticles);
                setProjects(newProjects);
                setPapers(newPapers);
                setNetZeroIITKStatus(newNetZeroIITKStatus);
                setNetZeroArmyCanttStatus(newNetZeroArmyCanttStatus);
                setOutreachActicities(newOutreachActivities);
                let result = await fetch(
                    fetchURL, {
                        method: "post",
                        body: JSON.stringify({name, newLinkedinPosts, newNewsPaperArticles , newProjects, newPapers, newNetZeroIITKStatus, newNetZeroArmyCanttStatus, newOutreachActivities}),
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
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-lg hover:bg-green-700"
            >
                Upload Excel File
            </label>


        </div>
    );
};

export default ExcelUploader;
