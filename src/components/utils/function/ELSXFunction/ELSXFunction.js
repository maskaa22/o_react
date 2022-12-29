import FileSaver from "file-saver";

import {FILE_TYPE} from "../../../../config/constants";
import {WORD_ARRAY, WORD_DATA, WORD_XLSX} from "../../../../config/wordsConstants";

export function ELSXFunction (Heading, newData, nameFile)
{
    const XLSX = require(WORD_XLSX);

    const ws = XLSX.utils.json_to_sheet(Heading, {skipHeader: true, origin: 0});

    XLSX.utils.sheet_add_json(ws, newData, {skipHeader: true, origin: -1});
    const wb = { Sheets: { data: ws }, SheetNames: [WORD_DATA] };
    const excelBuffer = XLSX.write(wb, { bookType: WORD_XLSX, type: WORD_ARRAY });
    const data = new Blob([excelBuffer], { type: FILE_TYPE });
    FileSaver.saveAs(data, nameFile);
}
