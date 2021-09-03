// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  verified: boolean;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ verified: false, error: "error" });
  }

  const { key } = req.body;
  if (key === process.env.NEXT_PUBLIC_VERIFIED_VALUE) {
    return res.status(200).json({ verified: true });
  }

  return res.status(400).json({ verified: false, error: "error" });
}
