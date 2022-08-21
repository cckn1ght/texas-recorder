import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import {ChipData, ChipsData, dataInMemory, saveDataToFile} from "../chips-data";


export type ChipDataRes = {
    data: ChipData
}
export default function updateChipData(
    req: NextApiRequest,
    res: NextApiResponse<ChipDataRes>
) {
    if (req.method === 'PUT') {
        const { index } = req.query;
        if (index) {
            const data = req.body as ChipData;
            console.log({data, index})
            dataInMemory[Number(index)] = data;
            res.status(200).json({data});
        }
        saveDataToFile();
    }
}
