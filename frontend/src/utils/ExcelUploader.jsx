import React, { useState } from 'react';
import Excel from 'exceljs';

const fetchURL = import.meta.env.VITE_URL + "/api/register";
console.log(fetchURL);
const ExcelUploader = ({setLinkedinPosts, setTwitterArticles, setNewsPaperArticles,  setProjects, setPapers, setNetZeroIITKStatus, setNetZeroArmyCanttStatus, setOutreachActicities}) => {
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
            const [newLinkedinPosts, newTwitterArticles, newNewsPaperArticles, newProjects, newPapers] = [[], [], [], [], []];
            let [newNetZeroIITKStatus, newNetZeroArmyCanttStatus, newOutreachActivities] = ["", "", ""];
            wb.xlsx.load(buffer).then( async (workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row) => {
                        data_from_excel.push(row.values);
                    });
                });
                data_from_excel.slice(1).forEach(data => {
                    newLinkedinPosts.push(data[1]);
                    newTwitterArticles.push(data[2]);
                    newNewsPaperArticles.push(data[3]);
                    newProjects.push(data[4]);
                    newPapers.push(data[5]);
                })
                newNetZeroIITKStatus += data_from_excel[1][6];
                newNetZeroArmyCanttStatus += data_from_excel[1][7];
                newOutreachActivities += data_from_excel[1][8];
                setLinkedinPosts(newLinkedinPosts);
                setTwitterArticles(newTwitterArticles);
                setNewsPaperArticles(newNewsPaperArticles);
                setProjects(newProjects);
                setPapers(newPapers);
                setNetZeroIITKStatus(newNetZeroIITKStatus);
                setNetZeroArmyCanttStatus(newNetZeroArmyCanttStatus);
                setOutreachActicities(newOutreachActivities);
                console.log("Hey! " +newOutreachActivities);
                let result = await fetch(
                    fetchURL, {
                        method: "post",
                        body: JSON.stringify({name, newLinkedinPosts, newTwitterArticles ,newNewsPaperArticles , newProjects, newPapers, newNetZeroIITKStatus, newNetZeroArmyCanttStatus, newOutreachActivities}),
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
