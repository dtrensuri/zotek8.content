import {
  differenceInMinutes,
  isAfter,
  isBefore,
  minutesToHours,
} from "date-fns";

export function toHourAndMinute(minute: number) {
  if (minute > 0) {
    let h = minutesToHours(minute);
    let m = minute - h * 60;
    return `${h}:${m}`;
  }
  return "";
}

export function handleTimeSheets(timeSheetData: any[]) {
  return new Promise(async (resolve, reject) => {
    try {
      const dataTimeSheet = await timeSheetData.map(
        (dataRow: any, key: any) => {
          const time_in = new Date(dataRow.time_in);
          const time_out = new Date(dataRow.time_out);
          const time_shifts = {
            morning: {
              time_in: new Date(dataRow.time_in).setHours(8, 30),
              time_out: new Date(dataRow.time_in).setHours(12, 0),
            },
            afternoon: {
              time_in: new Date(dataRow.time_in).setHours(13, 0),
              time_out: new Date(dataRow.time_in).setHours(17, 30),
            },
          };
          const late = isAfter(time_in.getTime(), time_shifts.morning.time_in)
            ? differenceInMinutes(
                time_in.getTime(),
                time_shifts.morning.time_in
              )
            : 0;
          const early = isBefore(
            time_out.getTime(),
            time_shifts.afternoon.time_out
          )
            ? differenceInMinutes(
                time_shifts.afternoon.time_out,
                time_out.getTime()
              )
            : 0;
          const m_in_office =
            differenceInMinutes(
              time_shifts.morning.time_out,
              time_in.getTime()
            ) +
            differenceInMinutes(
              time_out.getTime(),
              time_shifts.afternoon.time_in
            );
          const ot = isAfter(time_out.getTime(), time_shifts.afternoon.time_out)
            ? differenceInMinutes(
                time_out.getTime(),
                time_shifts.afternoon.time_out
              )
            : 0;
          const work_time =
            differenceInMinutes(
              time_shifts.morning.time_out,
              time_shifts.morning.time_in
            ) +
            differenceInMinutes(
              time_shifts.afternoon.time_out,
              time_shifts.afternoon.time_in
            ) -
            late -
            early;

          const lack = late + early;

          return {
            no: key + 1,
            date: time_in,
            check_in: time_in,
            check_out: time_out,
            late: late,
            early: early,
            in_office: m_in_office,
            ot: ot,
            lack: lack,
            note: "",
            work_time: work_time,
            action: {
              Forget: true,
              "Late/Early": true,
              Leave: true,
            },
          };
        }
      );
      resolve(dataTimeSheet);
    } catch (err) {
      reject(err);
    }
  });
}
