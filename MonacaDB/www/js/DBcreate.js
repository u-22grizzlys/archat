// This is a JavaScript file

/**
 * Created by kbc16a21 on 2017/07/13.
 */
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    window.alert("Create a database and display the content");

}


function executeQuery(tx) {
    tx.executeSql('DROP TABLE IF EXISTS TestTable');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TestTable (id unique, data)');
    tx.executeSql('INSERT INTO TestTable (id, data) VALUES (1, "Sample")');

}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM TestTable', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
    window.alert("There are " + len + " rows of records in the database.");
    for (var i=0; i<len; i++){
        document.writeln("row = " + i + " ID = " + results.rows.item(i).id + " Data = " + results.rows.item(i).data+"<br/>");
    }
}

//Callback function when the transaction is failed.
function errorCB(err) {
    console.log("Error occured while executing SQL: "+err.code);
}

// Callback function when the transaction is success.
function successCB() {
    var db = window.openDatabase("Database", "1.0", "TestDatabase", 200000);
    db.transaction(queryDB, errorCB);
}

function createDB(){
    var db = window.openDatabase("Database", "1.0", "TestDatabase", 200000);
    db.transaction(executeQuery, errorCB, successCB);

}