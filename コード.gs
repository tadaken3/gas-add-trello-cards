var scriptProp =  PropertiesService.getScriptProperties().getProperties();
var trelloKey　　　　　　　　 = scriptProp.TRELLO_API_KEY;
var trelloToken 　　　　= scriptProp.TRELLO_TOKEN;
var username 　　　　　　　　　　= scriptProp.TRELLO_USERNAME;
var trelloBaseURL = "https://trello.com/1/"

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
    Logger.log([idx][0])
    
    if (values[idx][0] == '') {
      continue;
    }
    
    Logger.log(values[idx][2])
    Logger.log(values[idx][3])
    Logger.log(values[idx][4])
     
    var options = {
      'method' : 'post',
      'muteHttpExceptions' : true,
      'payload' : {
        'name'      : values[idx][0],
        'desc'      : values[idx][1],
        'idList'    : values[idx][2]
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
  var sheet = spreadsheet.getSheetByName('everyday');
  var range = sheet.getRange('B3:D24');
  var values = range.getValues();
  Logger.log(values)
  return values;
}