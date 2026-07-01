// ===================Global constants =================================

const SS = SpreadsheetApp.getActiveSpreadsheet();

//const DRIVE_COPY_FOLDER_ID = SS.getRangeByName('settings__driveCopyFolderId').getValue(); 


const SORT_CONFIGS = {
  Cpi: {
    sortColumns: [
      { column: 3, ascending: true },
      { column: 4, ascending: true },
      { column: 2, ascending: true }
    ],
    headerRows: 1
  },
  WorkItems: {
    sortColumns: [
      { column: 5, ascending: true },
      { column: 4, ascending: true },
      { column: 6, ascending: true },
      { column: 3, ascending: true }
    ],
    headerRows: 1
  },
  Sheet1: {
    sortColumns: [{ column: 3, ascending: true }]
  }
};



