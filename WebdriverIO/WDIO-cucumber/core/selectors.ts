const Selectors = {
  common: {
    navigationTile: "//div[contains(@class,'tile') and .//span[contains(.,'{{title1}}')] and .//span[contains(.,'{{title2}}')]]",
    btnCreate: "//button[contains(@class,'btn') and contains(.,'Create')]",
  }
};

export default Selectors;
