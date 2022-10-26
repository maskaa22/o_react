import FileSaver from "file-saver";

import {FILE_TYPE} from "../../../../config/constants";

export function ELSXFunction (Heading, newData, nameFile)
{
    const XLSX = require("xlsx");

    const ws = XLSX.utils.json_to_sheet(Heading, {skipHeader: true, origin: 0});

    XLSX.utils.sheet_add_json(ws, newData, {skipHeader: true, origin: -1});
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: FILE_TYPE });
    FileSaver.saveAs(data, nameFile);
}
