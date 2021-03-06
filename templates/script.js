
function insertRowWithTitle(sectionHash, sectionTitle) {
  sections[sectionHash]["rows"].push(sectionTitle);
  
  var dataInput = document.getElementById("data-input");
  var sectionTable = dataInput.getElementsByClassName(sectionHash)[0];
  // var tableRef = sectionTable.getElementsByTagName('tbody')[0];
  
  var tableRef =  sectionTable.tBodies[0]
  rowIndex = tableRef.rows.length
  var row = tableRef.insertRow(rowIndex);
  row.insertCell(0).innerHTML = sectionTitle;
  row.insertCell(1).innerHTML = "<a href=\"#\" onclick=\"deleteRow(\'"+sectionHash+"\', this)\" class=\"btn btn-danger\">Remove Cell</a>"
}

function insertRow(obj, sectionHash) {
  var rowTitle = obj.parentElement.parentElement.parentElement.parentElement.tFoot.getElementsByClassName("form-control")[0]
  insertRowWithTitle(sectionHash, rowTitle.value)
  reload()
}

function reload() {
  refreshTableView()
  reloadCode()
}

function refreshTableView() {
  $('.table-cell').remove()
  $('.table-separator').remove()

  iphone = $("#iphone")
  
  for (var key in sections) {
  //     array_keys.push(key);
  //     array_values.push(a[key]);
  // }
  
  
  // for (i = 0; i < sections.length; i++) {
    rows = sections[key]["rows"];
    
    iphone.append("<div class=\"row table-separator\"></div>");
    
    for (idx = 0; idx < rows.length; idx++) {
      title = rows[idx];
      if (idx == 0) {
        iphone.append("<div class=\"row table-cell\"><div class=\"table-cell-label table-cell-border\"><div class=\"table-cell-margin\">"+title+"</div></div></div>");
      } else {
        iphone.append("<div class=\"row table-cell\"><div class=\"table-cell-label table-cell-border table-cell-margin\">"+title+"</div></div>");
      }
    }
          
  }
  
  iphone.append("<div class=\"row table-separator\"></div>");
  
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function insertSection() {
  var hash = guidGenerator()
  
  sections[hash] = {"rows": []};

  index = sections.length - 1

  var dataInput = document.getElementById("data-input");

  var tbl  = document.createElement('table');
  tbl.id = "myTable"
  tbl.className = "myTable section-" + index + " section-container " + hash

  var header = tbl.createTHead();

  // tbody = tbl.insertAdjacentHTML('beforeend', "<tbody class=\"sortable\"></tbody>");
  var tbody  = document.createElement('tbody');
  tbody.className = "sortable"

  tbl.appendChild(tbody);

  var content = ""
  content += "<form action=\"#\"><td><b>"+hash+"</b></td>"
  content += "<td><a href=\"#\" onclick=\"deleteSection(\'"+hash+"\')\" class=\"btn btn-danger\">Delete Section</a></td>"
  content += "</form>"

  header.insertAdjacentHTML('beforeend', content);

  var footer = tbl.createTFoot();

  content = "<form action=\"#\"><td><div class=\"form-group\">"
  content += "<input type=\"text\" class=\"form-control\" id=\"section-title-"+index+"\" placeholder=\"Title\">"
  content += "</div></td><td><button onclick=\"insertRow(this, \'"+hash+"\')\" class=\"btn btn-primary\">Insert Cell</button>"
  content += "</td></form>"

  footer.insertAdjacentHTML('beforeend', content);

  dataInput.appendChild(tbl);

  enableSortable(hash)   
  
  return hash  
}

function deleteSection(sectionHash) {
  delete sections[sectionHash]
  
  var dataInput = document.getElementById("data-input");
  var section = dataInput.getElementsByClassName(sectionHash)[0];
  section.parentNode.removeChild(section);
  
  reload()
}

function onLoadTable() {

  sectionHash = insertSection()
  insertRowWithTitle(sectionHash, "About Us")
  insertRowWithTitle(sectionHash, "Privacy Policy")
  insertRowWithTitle(sectionHash, "Terms of Service")
  sectionHash = insertSection()
  insertRowWithTitle(sectionHash, "Logout")

  reload()
}

function deleteRow(sectionHash, obj) {
  var dataInput = document.getElementById("data-input");
  var sectionTable = dataInput.getElementsByClassName(sectionHash)[0];
  var tableRef = sectionTable.getElementsByTagName('tbody')[0];
  
  rowIndex = obj.parentElement.parentElement.rowIndex - 1
  tableRef.deleteRow(rowIndex);
  
  sections[sectionHash]["rows"].splice(rowIndex, 1)
  
  reload()
}

function enableSortable(hash) {
  $("."+ hash+" > tbody").sortable({
      start: function(event, ui) {
          var start_pos = ui.item.index();
          ui.item.data('start_pos', start_pos);
      },
      change: function(event, ui) {
      },
      update: function(event, ui) {
        var start_pos = ui.item.data('start_pos');
        var index = ui.item.index();            
        updatedRows = array_move(sections[hash]["rows"], start_pos, index)
        sections[hash]["rows"] = updatedRows
        
        reload()
      }
  });
}

function onLoadFunctions() {
  onLoadTable()
  reloadCode()
}


window.onload = onLoadFunctions;