const { timeSheetDetail } = require("./sheet/attendanceSummarySheet.ts");

const exportFileExcel = async (data: JSON) => {
  return await timeSheetDetail(data, "new Excel");
};

module.exports = {
  exportFileExcel,
};
