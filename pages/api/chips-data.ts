// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from "path";
import fs from "fs";

export type ChipData = {
  name: string;
  borrowed: number;
  left?: number;
  total?: number;
}
export type ChipsData = {data: ChipData[]};
const chipsDataFilePath = path.join(process.cwd(), 'chips_data', 'chips-data.json');

export let dataInMemory: ChipData[];
export const saveDataToFile = () => {
  fs.writeFileSync(chipsDataFilePath, JSON.stringify(dataInMemory), {encoding: 'utf-8'});
}

const restoreData = () => {
  if (fs.existsSync(chipsDataFilePath)) {
    dataInMemory = JSON.parse(fs.readFileSync(chipsDataFilePath, {encoding: 'utf-8'}));
  } else {
    dataInMemory = [];
    saveDataToFile();
  }
}
restoreData();

export default function chipsData(
  req: NextApiRequest,
  res: NextApiResponse<ChipsData>
) {
  if (req.method === 'POST') {
    const { index } = req.query;
    if (index) {
      dataInMemory[Number(index)] = req.body[0];
    } else {
      const {data} = req.body as ChipsData;
      dataInMemory = data;
    }
    saveDataToFile();
  }
  res.status(200).json({data: dataInMemory});
}
