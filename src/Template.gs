function backupSpreadsheet() {
  GASLibrary.copySpreadsheetToDrive(DRIVE_COPY_FOLDER_ID, "Backup");
}


function hideDoneActions() {
  GASLibrary.hideDoneActions();
}

function resetFilter() {
  GASLibrary.resetFilter();
}

function showNamedRangesInSheetOrder(){
  GASLibrary.showNamedRangesInSheetOrder()
}

function sortActiveSheet() {
  GASLibrary.sortSheetByConfig(SS, SORT_CONFIGS);
  hideDoneActions();
}
