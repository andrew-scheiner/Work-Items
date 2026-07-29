function createMenu() {
  const ui = SpreadsheetApp.getUi();
  let customMenu = ui.createMenu('Custom')
    .addItem('Backup Spreadsheet', 'backupSpreadsheet')
    .addItem('Hide Done Actions', 'hideDoneActions')
    .addItem('Reset Filter', 'resetFilter')
    .addItem('Filter WorkItems by Initiative', 'showWorkItemsInitiativeSidebar')
    .addItem('Sort Sheet','sortActiveSheet')
    .addSeparator()
    .addSubMenu(ui.createMenu('Update Data Source(s)')
      .addItem('All', 'refreshDataSources')
      .addItem('Config Items', 'importConfigItems')
      .addItem('Initiatives','setInitiativeNameDropdownList')
      .addItem('Priority', 'setPriorityDropdownList')
      .addItem('Status','setStatusDropdownList'));
    customMenu.addToUi();
}

function showWorkItemsInitiativeSidebar() {
  let html;
  try {
    html = HtmlService.createHtmlOutputFromFile('src/InitiativeFilterSidebar');
  } catch (err) {
    // Fallback if file is later moved to project root.
    html = HtmlService.createHtmlOutputFromFile('InitiativeFilterSidebar');
  }

  html.setTitle('Filter WorkItems');

  SpreadsheetApp.getUi().showSidebar(html);
}

function getWorkItemsInitiatives() {
  const sheet = SS.getSheetByName('WorkItems');
  if (!sheet) {
    throw new Error('Sheet "WorkItems" was not found.');
  }

  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  if (values.length < 2) {
    return [];
  }

  const headers = values[0].map(h => String(h).trim());
  const initiativeColIndex = headers.indexOf('Initiative');
  if (initiativeColIndex === -1) {
    throw new Error('Column "Initiative" was not found on WorkItems.');
  }

  const unique = new Set();
  for (let i = 1; i < values.length; i++) {
    const cell = values[i][initiativeColIndex];
    const initiative = String(cell == null ? '' : cell).trim();
    if (initiative) {
      unique.add(initiative);
    }
  }

  return Array.from(unique).sort((a, b) => a.localeCompare(b));
}

function filterWorkItemsByInitiative(initiative) {
  const sheet = SS.getSheetByName('WorkItems');
  if (!sheet) {
    throw new Error('Sheet "WorkItems" was not found.');
  }

  const dataRange = sheet.getDataRange();
  if (dataRange.getNumRows() < 2 || dataRange.getNumColumns() < 1) {
    return;
  }

  const headers = dataRange.getValues()[0].map(h => String(h).trim());
  const initiativeCol = headers.indexOf('Initiative') + 1;
  if (initiativeCol === 0) {
    throw new Error('Column "Initiative" was not found on WorkItems.');
  }

  let filter = sheet.getFilter();
  if (!filter) {
    filter = dataRange.createFilter();
  }

  const selected = String(initiative == null ? '' : initiative).trim();
  if (!selected) {
    filter.removeColumnFilterCriteria(initiativeCol);
    return;
  }

  const criteria = SpreadsheetApp.newFilterCriteria()
    .whenTextEqualTo(selected)
    .build();

  filter.setColumnFilterCriteria(initiativeCol, criteria);
}

  
  