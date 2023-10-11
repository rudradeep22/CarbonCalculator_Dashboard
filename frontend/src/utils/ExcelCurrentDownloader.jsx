import React from 'react';
import Excel from 'exceljs';

class ExcelDownload extends React.Component {
  downloadExcel = () => {
    const { linkedinPosts, newTwitterArticles, newsPaperArticles, projects, papers, outreachActivities, netZeroIITKStatus, netZeroArmyCanttStatus } = this.props;

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define columns
    const columns = [
      { header: 'Linkedin Posts', key: 'linkedinPosts', width: 15, style: { font: { bold: true } } },
      { header: 'Twitter Articles', key: 'twitterArticles', width: 15, style: { font: { bold: true } } },
      { header: 'Newspaper Articles', key: 'newsPaperArticles', width: 15, style: { font: { bold: true } } },
      { header: 'Projects', key: 'projects', width: 15, style: { font: { bold: true } } },
      { header: 'Papers', key: 'papers', width: 15, style: { font: { bold: true } } },
    ];

    if (netZeroIITKStatus !== undefined && netZeroArmyCanttStatus !== undefined) {
      columns.push(
        { header: 'Status of Net Zero IITK', key: 'netZeroIITKStatus', width: 15, style: { font: { bold: true } } },
        { header: 'Status of Net Zero Army Cantt', key: 'netZeroArmyCanttStatus', width: 15, style: { font: { bold: true } } }
      );
    }
    columns.push({ header: 'Outreach Activities', key: 'outreachActivities', width: 15, style: { font: { bold: true } } });
    worksheet.columns = columns;

    linkedinPosts.forEach((val, index) => {
      const row = { linkedinPosts: val, newTwitterArticles: newTwitterArticles[index], newsPaperArticles: newsPaperArticles[index], projects: projects[index], papers: papers[index], outreachActivities: outreachActivities[index] };
    
      if (index === 0) {
        row.netZeroIITKStatus = netZeroIITKStatus;
        row.netZeroArmyCanttStatus = netZeroArmyCanttStatus;
      }

      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'current_data.xlsx';
      a.click();
    });
  };

  render() {
    return (
      <button onClick={this.downloadExcel} className='bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-block cursor-pointer text-base transition-all duration-300 ease-in-out hover:text-lg hover:bg-green-700'>
        Download Current Data
      </button>
    );
  }
}

export default ExcelDownload;
