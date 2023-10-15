import axios from "axios";
import { handleTimeSheets } from "@/controller/handleTime";
const _ = require("lodash");

const HOST = process.env.HOST;

export const getTimeSheetByDate = async (start_date: Date, end_date: Date) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${HOST}/api/user/export-timesheet/find-by-date`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          startDate: start_date,
          endDate: end_date,
        },
      })
      .then((response) => {
        if (response.data) {
          handleTimeSheets(response.data.results)
            .then((results) => {
              resolve(results);
            })
            .catch((err: any) => {
              reject(err);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
