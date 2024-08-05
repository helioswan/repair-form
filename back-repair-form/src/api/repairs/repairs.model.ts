import * as z from "zod";
import { db } from "../../db";
import { WithId } from "mongodb";

export const Repair = z.object({
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  address: z.string().min(1).max(100),
  zip: z.string().min(1).max(10),
  email: z.string().email(),
  phone: z.string().min(1).max(15),
  paymentOption: z.string(),
  generalTerms: z.literal<boolean>(true, {
    errorMap: () => ({
      message:
        "Vous devez accepter les conditions générales d’utilisation du service",
    }),
  }),
  retractTerms: z.literal<boolean>(true, {
    errorMap: () => ({
      message:
        "Vous devez accepter les dispositions relatives au droit de rétractation",
    }),
  }),
  commercialOffer: z.boolean().default(false),
  type: z.string(),
  location: z.string(),
  reason: z.string().optional(),
  detail: z.string().optional(),
  createdAt: z.date().optional(),
});

export type Repair = z.infer<typeof Repair>;
export type RepairWithId = WithId<Repair>;

export const Repairs = db.collection<Repair>("repairs");
