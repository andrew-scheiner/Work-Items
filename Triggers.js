function onOpen() {
  createMenu();
  //updateAllDataSources();
}



function onEditHandler(e) {
  const ctx = GASLibrary.parseEditEvent(e);
  if (!ctx.isValid) return;
  if (!ctx.isSingleCell) return;

  if (ctx.value === 'X Delete' && ctx.oldValue != null && ctx.oldValue !== 'X Delete') {
    ctx.sheet.deleteRow(ctx.row);
    return;
  }

  if (ctx.row != 1) {
    GASLibrary.addTimestampToUpdatedColumn(ctx.sheet, ctx.column, ctx.row);
  }

  if (ctx.isInNamedRange('form__namedRange')) {
    // add function(s) here
  }
}

/**
 * Installs the onEditHandler installable trigger.
 * Safe to run multiple times (won't create duplicates).
 */
function installOnEditTrigger() {
  const triggers = ScriptApp.getProjectTriggers();

  const exists = triggers.some(t =>
    t.getHandlerFunction() === 'onEditHandler' &&
    t.getEventType() === ScriptApp.EventType.ON_EDIT
  );

  if (!exists) {
    ScriptApp.newTrigger('onEditHandler')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
  }
}
