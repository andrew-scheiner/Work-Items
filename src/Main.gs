function createMenu() {
  const ui = SpreadsheetApp.getUi();
  let customMenu = ui.createMenu('Custom')
    .addItem('Backup Spreadsheet', 'backupSpreadsheet')
    .addItem('Hide Done Actions', 'hideDoneActions')
    .addItem('Reset Filter', 'resetFilter')
    .addItem('Sort Sheet','sortActiveSheet')
    .addSeparator()
    .addSubMenu(ui.createMenu('Update Data Source(s)')
      .addItem('All', 'refreshDataSources')
      .addItem('Initiatives','setInitiativeNameDropdownList')
      .addItem('Priority', 'setPriorityDropdownList')
      .addItem('Status','setStatusDropdownList'));
    customMenu.addToUi();
}

  
  