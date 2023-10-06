import React, { useState } from 'react';
import Excel from 'exceljs';

const ExcelDownloader = () => {

    const handleDownload = () => {
        const url = '/template.xlsx';
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template.xlsx';
        a.click();
      };

    return(
        <div>
            <button onClick={handleDownload} className='bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-lg hover:bg-green-700'>
                Download Input Template
            </button>
        </div>
    );
}

export default ExcelDownloader;