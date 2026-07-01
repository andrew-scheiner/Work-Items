
function refreshDataSources() {
  setInitiativeNameDropdownList();
  setPriorityDropdownList();
  setStatusDropdownList();
  SpreadsheetApp.getActiveSpreadsheet().toast('Data sources updated', 'Status', 5);
}


function setInitiativeNameDropdownList() {
  GASLibrary.setProjectNameDropdownListValues('workItems__effort', 1);
}


function setPriorityDropdownList() {
  GASLibrary.setGlobalLookupDropdownList('WorkItem', 'Priority', 'workItems__priority',1, { invalidHandling: "reject" });
  GASLibrary.setGlobalLookupDropdownList('ConfigChange', 'Priority', 'cpi__priority',1, { invalidHandling: "reject" });
}

function setStatusDropdownList() {
  GASLibrary.setGlobalLookupDropdownList('WorkItem', 'Status', 'workItems__status',1, { invalidHandling: "reject" });
  GASLibrary.setGlobalLookupDropdownList('ConfigChange', 'Status', 'cpi__status',1,  { invalidHandling: "reject" });
}
