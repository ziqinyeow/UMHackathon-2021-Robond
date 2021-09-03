// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetch(
      "http://20.37.40.201:80/api/v1/service/myservice/score",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer lH5jefeVKSXaA7iTBJ5W2y8w9bzEspP7",
        },
        body: JSON.stringify([
          {
            "STOCK CODE": "123",
            AINTEREST: 123,
            "COUPON FREQUENCY": 2,
            "EVAL MID PRICE": 123,
            "EVAL MID YIELD": 123,
            "MODIFIED DURATION": 123,
            "NEXT COUPON RATE": 0,
            "DAYS TO MATURITY": 123,
            "CREDIT SPREAD": 12,
            "OPR MOVEMENT": 3,
            RATING: "AAA",
          },
          {
            "STOCK CODE": "1234",
            AINTEREST: 123,
            "COUPON FREQUENCY": 2,
            "EVAL MID PRICE": 123,
            "EVAL MID YIELD": 123,
            "MODIFIED DURATION": 123,
            "NEXT COUPON RATE": 0,
            "DAYS TO MATURITY": 123,
            "CREDIT SPREAD": 12,
            "OPR MOVEMENT": 3,
            RATING: "AAA",
          },
        ]),
      }
    );
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
