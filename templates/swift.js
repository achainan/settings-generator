var contentTop = `{% include "swift/top.swift" %}`
var contentBottom = `{% include "swift/bottom.swift" %}`

var sectionTop = `{% include "swift/section-top.swift" %}`
var sectionBottom = `{% include "swift/section-bottom.swift" %}`

function swiftRow(title) {
  row =  newLine + tab + tab + `cell = UITableViewCell(style: UITableViewCell.CellStyle.default, reuseIdentifier: nil)`
  row += newLine + tab + tab + `cell.textLabel?.text = "`+ title +`"`
  row += newLine + tab + tab + `manager = SettingsRowManager(tableViewCell: cell) {`
  row += newLine + tab + tab + tab + `// #warning Incomplete implementation, add action here`
  row += newLine + tab + tab + `}`
  row += newLine + tab + tab + `rows.append(manager)`
  return row
}

function swiftCode() {
  newLine = `\n`
  tab = "  "
  var content = contentTop
  content += newLine    
  
  for (var key in sections) {
    content += newLine + tab + tab +`// Start section`
    content += newLine + tab + tab + `rows = []`
    content += newLine

    rows = sections[key]["rows"];
    for (idx = 0; idx < rows.length; idx++) {
      title = rows[idx];
      content += swiftRow(title)
    }            

    content += newLine
    content += newLine + tab + tab + `// End section`
    content += newLine + tab + tab + `data.append(SettingsSectionManager(title: "", rows: rows))`
  }
  
  content += contentBottom
  return content    
}

function reloadCode() {
  var code = document.getElementsByTagName('code')[0];
  code.innerHTML = swiftCode()    
}