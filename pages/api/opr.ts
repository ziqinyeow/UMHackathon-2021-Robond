// the purpose of this page is to retrive the latest opr movement data from Bank Negara Malaysia
// https://api.bnm.gov.my/explorer?category=Rates%20and%20Volumes
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const OPRData = await fetch("https://api.bnm.gov.my/public/opr", {
      method: "GET",
      headers: {
        Accept: "application/vnd.BNM.API.v1+json",
      },
    });
    const {
      data: { new_opr_level: OprLevel },
      meta: { last_updated: OPRLevelLastUpdated },
    } = await OPRData.json();
    return res.status(200).json({ OprLevel, OPRLevelLastUpdated });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
