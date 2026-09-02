function createMenu() {
  const ui = SpreadsheetApp.getUi();
  let customMenu = ui.createMenu('Custom')
    .addItem('Backup Spreadsheet', 'backupSpreadsheet')
    .addItem('Hide Done Actions', 'hideDoneActions')
    .addItem('Reset Filter', 'resetFilter')
    .addItem('Filter WorkItems', 'showWorkItemsInitiativeSidebar')
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

function getWorkItemsFilterColumns() {
  const sheet = SS.getSheetByName('WorkItems');
  if (!sheet) {
    throw new Error('Sheet "WorkItems" was not found.');
  }

  const values = sheet.getDataRange().getValues();
  if (!values.length) {
    return [];
  }

  return values[0]
    .map(header => String(header == null ? '' : header).trim())
    .filter(Boolean);
}

function filterWorkItemsByFields(filters) {
  const sheet = SS.getSheetByName('WorkItems');
  if (!sheet) {
    throw new Error('Sheet "WorkItems" was not found.');
  }

  const dataRange = sheet.getDataRange();
  if (dataRange.getNumRows() < 2 || dataRange.getNumColumns() < 1) {
    return;
  }

  const headers = dataRange.getValues()[0].map(header => String(header == null ? '' : header).trim());
  const normalizedFilters = filters && typeof filters === 'object' ? filters : {};
  const activeFilters = Object.entries(normalizedFilters)
    .map(([header, value]) => ({
      header: String(header == null ? '' : header).trim(),
      value: String(value == null ? '' : value).trim()
    }))
    .filter(entry => entry.header && entry.value);

  const existingFilter = sheet.getFilter();
  if (existingFilter) {
    existingFilter.remove();
  }

  if (!activeFilters.length) {
    return;
  }

  const filter = dataRange.createFilter();
  activeFilters.forEach(entry => {
    const columnIndex = headers.indexOf(entry.header) + 1;
    if (columnIndex > 0) {
      const criteria = SpreadsheetApp.newFilterCriteria()
        .whenTextContains(entry.value)
        .build();
      filter.setColumnFilterCriteria(columnIndex, criteria);
    }
  });
}

  
  