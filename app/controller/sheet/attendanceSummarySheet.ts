import { saveAs } from "file-saver";
import { format, addDays } from "date-fns";

const _ = require("lodash");
const ExcelJS = require("exceljs");

type AttendanceSummarySheet = {};

type DataTimeSheetDetail = {};

const ngayLe = [
  { day: "10", month: "3", title: "Giỗ Tổ" },
  { day: "2", month: "9", title: "Quốc Khánh" },
];

const attendanceSummarySheet = async (
  data: AttendanceSummarySheet,
  fileName: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Bảng Giờ Công");
  worksheet.font = {
    name: "Arial",
    size: 10,
  };

  const numCol = 16;
  const row1 = worksheet.addRow(["Đơn vị: DTC Software"]);
  const row2 = worksheet.addRow(["Địa chỉ: "]);
  const title = worksheet.addRow(["TỔNG HỢP CHẤM CÔNG"]);
  const timeTitle = worksheet.addRow(["Từ ngày  đến ngày"]);
  const row5 = worksheet.addRow([]);
  const header = worksheet.addRow([
    "STT",
    "Mã nhân viên",
    "Tên nhân viên",
    "Phòng ban",
    "Chức vụ",
    "Ngày vào làm",
    "Tổng công/Tháng",
    "Ngày công",
    "",
    "",
    "Giờ công",
    "",
    "",
    "Vào trễ",
    "",
    "Ra sớm",
    "",
    "Tăng ca",
    "",
    "",
    "Vắng KP",
    "Ngày nghỉ",
  ]);
  const headerChildren = worksheet.addRow([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Thường",
    "C.Tuần",
    "Q.Đêm",
    "Thường",
    "C.Tuần",
    "Q.Đêm",
    "Lần",
    "Phút",
    "Lần",
    "Phút",
    "TC1",
    "TC2",
    "TC3",
    "",
    "OM",
    "TS",
    "R",
    "Ro",
    "P",
    "F",
    "CO",
    "CD",
    "H",
    "CT",
    "Le",
  ]);

  worksheet.mergeCells("A1:AF1");
  worksheet.mergeCells("A2:AF2");
  worksheet.mergeCells("A3:AF3");
  worksheet.mergeCells("A4:AF4");
  worksheet.mergeCells("A6:A7");
  worksheet.mergeCells("B6:B7");
  worksheet.mergeCells("C6:C7");
  worksheet.mergeCells("D6:D7");
  worksheet.mergeCells("E6:E7");
  worksheet.mergeCells("F6:F7");
  worksheet.mergeCells("G6:G7");
  worksheet.mergeCells("H6:J6");
  worksheet.mergeCells("K6:M6");
  worksheet.mergeCells("N6:O6");
  worksheet.mergeCells("P6:Q6");
  worksheet.mergeCells("R6:T6");
  worksheet.mergeCells("V6:AF6");
  worksheet.mergeCells("U6:U7");

  headerChildren.height = 40;
  const table = worksheet.addTable({
    name: "MyTable",
    ref: "A8",
    headerRow: false,
    totalsRow: false,
    style: {
      showRowStripes: true,
      border: {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
      },
    },
    columns: [
      { name: "A" },
      { name: "B" },
      { name: "C" },
      { name: "D" },
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "H" },
      { name: "I" },
      { name: "J" },
      { name: "K" },
      { name: "L" },
      { name: "M" },
      { name: "N" },
      { name: "O" },
      { name: "P" },
      { name: "Q" },
      { name: "R" },
      { name: "S" },
      { name: "T" },
      { name: "U" },
      { name: "V" },
      { name: "W" },
      { name: "X" },
      { name: "Y" },
      { name: "Z" },
      { name: "AA" },
      { name: "AB" },
      { name: "AC" },
      { name: "AD" },
      { name: "AE" },
      { name: "AF" },
    ],
    rows: [],
  });
  title.eachCell((cell: any) => {
    cell.style = {
      alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      font: {
        size: 14,
        bold: true,
      },
    };
  });

  const headerRow = [headerChildren, header];
  _.forEach(headerRow, (row: any) => {
    row.eachCell((cell: any) => {
      cell.style = {
        font: {
          size: 10,
          bold: true,
        },
        alignment: { vertical: "middle", horizontal: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
        },
      };
    });
  });

  const buf = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};

const timeSheetDetail = async (
  data: AttendanceSummarySheet,
  fileName: string
) => {
  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;
  const worksheet = workbook.addWorksheet("Bảng chi tiết chấm công");
  worksheet.getColumn("A").width = 15;
  worksheet.font = {
    name: "Arial",
    size: 10,
  };
  const numCol = 16;
  let title: any[] = [];
  title[1] = worksheet.addRow(["Bảng chi tiết chấm công"]);
  title[1].font = {
    name: "Arial",
    size: 14,
    underline: false,
    bold: true,
  };
  title[1].alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  title[2] = worksheet.addRow([`Mã nhân viên: Tên nhân viên: Bộ phận: `]);
  title[3] = worksheet.addRow([
    "Ngày thường",
    "",
    "0",
    "0",
    "",
    "Tăng ca 1",
    "",
    "0",
    "",
    "Đi trễ",
    "",
    "",
    "",
    "Về sớm",
    "",
    "",
  ]);
  title[4] = worksheet.addRow([
    "Cuối tuần",
    "",
    "0",
    "0",
    "",
    "Tăng ca 2",
    "",
    "0",
    "",
    "Số lần",
    "",
    "0",
    "",
    "Số lần",
    "",
    "0",
  ]);
  title[5] = worksheet.addRow([
    "TỔNG",
    "",
    "0",
    "0",
    "",
    "Tăng ca 3",
    "",
    "0",
    "",
    "Số phút",
    "",
    "0",
    "",
    "Số phút",
    "",
    "0",
  ]);
  title[6] = worksheet.addRow(["", "Các loại vắng"]);
  title[7] = worksheet.addRow([
    "",
    "V",
    "OM",
    "TS",
    "R",
    "Ro",
    "P",
    "F",
    "CO",
    "CD",
    "H",
    "CT",
    "Le",
    "",
    "",
  ]);
  title[8] = worksheet.addRow([
    "",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "",
    "",
  ]);
  title[9] = worksheet.addRow(["Chi tiết"]);
  title[10] = worksheet.addRow([
    "Ngày",
    "Thứ",
    "1",
    "",
    "2",
    "",
    "3",
    "",
    "Trễ",
    "Sớm",
    "Công",
    "T.Giờ",
    "T.Ca1",
    "T.Ca2",
    "T.Ca3",
    "Nơi làm việc",
  ]);
  title[11] = worksheet.addRow([
    "Ngày",
    "Thứ",
    "Vào",
    "Ra",
    "Vào",
    "Ra",
    "Vào",
    "Ra",
    "Trễ",
    "Sớm",
    "Công",
    "T.Giờ",
    "T.Ca1",
    "T.Ca2",
    "T.Ca3",
    "Nơi làm việc",
  ]);

  worksheet.mergeCells("A1:P1");
  worksheet.mergeCells("A2:P2");
  worksheet.mergeCells("A3:B3");
  worksheet.mergeCells("A4:B4");
  worksheet.mergeCells("A5:B5");
  worksheet.mergeCells("E3:E5");
  worksheet.mergeCells("I3:I5");
  worksheet.mergeCells("M3:M5");
  worksheet.mergeCells("A6:A8");
  worksheet.mergeCells("P6:P8");
  worksheet.mergeCells("B6:O6");
  worksheet.mergeCells("A9:P9");
  worksheet.mergeCells("F3:G3");
  worksheet.mergeCells("F4:G4");
  worksheet.mergeCells("F5:G5");
  worksheet.mergeCells("J3:L3");
  worksheet.mergeCells("J4:K4");
  worksheet.mergeCells("J5:K5");
  worksheet.mergeCells("N3:P3");
  worksheet.mergeCells("N4:O4");
  worksheet.mergeCells("C10:D10");
  worksheet.mergeCells("E10:F10");
  worksheet.mergeCells("G10:H10");
  worksheet.mergeCells("N5:O5");
  worksheet.mergeCells("A10:A11");
  worksheet.mergeCells("B10:B11");
  worksheet.mergeCells("I10:I11");
  worksheet.mergeCells("J10:J11");
  worksheet.mergeCells("K10:K11");
  worksheet.mergeCells("L10:L11");
  worksheet.mergeCells("M10:M11");
  worksheet.mergeCells("N10:N11");
  worksheet.mergeCells("O10:O11");
  worksheet.mergeCells("P10:P11");

  let rowsData: any[] = [];
  let cuoiTuan = 0;
  let le = 0;
  let ngayThuong = 0;
  let slDiTre = 0;
  let spDiTre = 0;
  let slVeSom = 0;
  let spVeSom = 0;
  let ot = 0;
  _.map(data, (value: any) => {
    const date = new Date(value.date);
    const dayOfWeek = date.getDay();
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    const dayName = daysOfWeek[dayOfWeek];

    if (value.ot != "") {
      let ot_time = value.ot.split(":");
      ot += 60 * parseInt(ot_time[0]) + parseInt(ot_time[1]);
    }

    if (value.late != "") {
      slDiTre += 1;
      let late_time = value.late.split(":");
      spDiTre += 60 * parseInt(late_time[0]) + parseInt(late_time[1]);
    }

    if (value.early != "") {
      slVeSom += 1 + 2;
      let early_time = value.early.split(":");
      spVeSom += 60 * parseInt(early_time[0]) + parseInt(early_time[1]);
    }

    if (_.findKey(ngayLe, { day: date.getDate(), month: date.getMonth() })) {
      le += 1;
    } else if (dayName == "Chủ Nhật" || dayName == "Thứ Bảy") {
      cuoiTuan += 1;
    } else {
      ngayThuong += 1;
    }

    let row = worksheet.addRow([
      format(date, "dd-MM-Y"),
      dayName,
      value.check_in,
      value.check_out,
      "",
      "",
      "",
      "",
      value.late,
      value.early,
      value.work_time,
      value.in_office,
      value.ot,
    ]);
    rowsData.push(row);
  });

  worksheet.getCell("C3").value = ngayThuong;
  worksheet.getCell("C4").value = cuoiTuan;
  worksheet.getCell("C5").value = { formula: "C3+C4" };

  worksheet.getCell("D3").value = ngayThuong * 8;
  worksheet.getCell("D4").value = cuoiTuan * 8;
  worksheet.getCell("D5").value = { formula: "D3+D4" };

  worksheet.getCell("H3").value = ot;
  worksheet.getCell("L4").value = slDiTre;
  worksheet.getCell("L5").value = spDiTre;
  worksheet.getCell("P4").value = slVeSom;
  worksheet.getCell("P5").value = spVeSom;

  worksheet.eachRow((row: any) => {
    if (row) {
      for (let i = 0; i < numCol; i++) {
        row.getCell(i + 1).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }
  });

  _.forEach(title, (row: any, id: any) => {
    if (row) {
      if (id != 1) {
        row.eachCell((cell: any) => {
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
          };
          cell.font = {
            bold: true,
          };
        });
      }
      if (id >= 3 && id <= 5) {
        row.eachCell((cell: any) => {
          cell.alignment = {};
          cell.font = {
            bold: true,
            italy: true,
          };
        });
      }
    }
  });

  _.forEach(rowsData, (row: any, id: any) => {
    if (row) {
      row.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      if (
        row.getCell("B").value == "Chủ Nhật" ||
        row.getCell("B").value == "Thứ Bảy"
      ) {
        for (let i = 0; i < numCol; i++) {
          row.getCell(i + 1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFF00" },
          };
        }
      }
    }
  });

  const buf = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};

module.exports = {
  attendanceSummarySheet,
  timeSheetDetail,
};
