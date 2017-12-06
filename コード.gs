var scriptProp =  PropertiesService.getScriptProperties().getProperties();
var trelloKey　　　　　　　　 = scriptProp.TRELLO_API_KEY;
var trelloToken 　　　　= scriptProp.TRELLO_TOKEN;
var username 　　　　　　　　　　= scriptProp.TRELLO_USERNAME;
var trelloBaseURL = scriptProp.TRELLO_BASE_URL;

function addTrelloCard(){
  var values = getSpreadsheet();

  // リクエスト用のURL文字列を作成
  var url = trelloBaseURL + 'cards/?key=' + trelloKey + '&token=' + trelloToken;
  /** 内容
   * name      :カードタイトル;
   * desc      :カード詳細
   * idList    :リストId
   * idLabels  :ラベルId   
   */
  
  for (var idx in values) {
    
    if (values[idx][0] == '') {
      continue;
    }
    
    var options = {
      'method' : 'post',
      'muteHttpExceptions' : true,
      'payload' : {
        'name'      : values[idx][1],
        'desc'      : values[idx][2],
        'idList'    : values[idx][4],
        'idLabels'  : values[idx][5]
      }
    }
    /** ------------------------------- */
    // APIを利用し、Trelloにカードを作成
    /** ------------------------------- */
    try {
      Logger.log("◆カードを作成");
      var result = UrlFetchApp.fetch(url, options);
    } catch (e) {
      Logger.log("Error:Trelloのカード登録に失敗しました。");
    }
  }
}

function getSpreadsheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('毎週月曜日');
  var range = sheet.getRange('B7:G24');
  var values = range.getValues();
  return values;
}