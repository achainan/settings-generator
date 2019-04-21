import UIKit

class SettingsViewController: BaseSettingsViewController {

  override func loadData() -> [SettingsSectionManager] {
    var data: [SettingsSectionManager] = []

    var rows: [SettingsRowManager]
    var cell : UITableViewCell
    var manager : SettingsRowManager
