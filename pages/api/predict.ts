// this page is to handle predictions request for next month bond price
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid" });
  }
  try {
    const data = await fetch(
      "http://20.37.40.201:80/api/v1/service/myservice/score",
      {
        method: "POST",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": process.env.AUTHORIZATION_HEADER,
        },
        body: req.body,
      }
    );
    const result = await data.json();

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
