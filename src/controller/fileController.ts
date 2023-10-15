const { timeSheetDetail } = require("./sheet/attendanceSummarySheet.ts");
const ExcelJS = require("exceljs");
import { saveAs } from "file-saver";
import { differenceInCalendarMonths, addMonths } from "date-fns";

import { getTimeSheetByDate } from "@/controller/callAPI/timeSheet";

const makeNameFile = (name: string) => {
  const now = new Date();
  const newName = name + "_" + now.getTime();
  return newName;
};

const createMonthlyTimeSheets = async (startDate: Date, endDate: Date) => {
  const sMonth = startDate.getMonth();
  const sYear = startDate.getFullYear();
  const numMonth = differenceInCalendarMonths(endDate, startDate);
  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;

  for (let i = 0; i <= numMonth; i++) {
    let start = i == 0 ? startDate : new Date(sYear, sMonth + i, 1);
    let end = i == numMonth ? endDate : new Date(sYear, sMonth + i + 1, 0);
    try {
      const data = await getTimeSheetByDate(start, end);
      let name = `Chi tiết tháng ${sMonth + i + 1}`;
      await timeSheetDetail(data, name, workbook);
    } catch (err) {
      console.log(err);
    }
  }

  return workbook;
};

export const exportDetailsTimeSheet = async (
  startDate: Date,
  endDate: Date
) => {
  const workbook = await createMonthlyTimeSheets(startDate, endDate);

  const buf = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${makeNameFile("cham_cong")}.xlsx`);
};
