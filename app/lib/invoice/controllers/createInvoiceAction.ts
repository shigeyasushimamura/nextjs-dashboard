"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateInvoiceService } from "@/app/lib/invoice/application/services/InvoiceService";
import { PostgresInvoiceRepository } from "@/app/lib/invoice/infrastructures/repositories/InvoiceRepository";
import { sql } from "@/app/lib/shared/db";
import { CreateInvoiceCommand } from "@/app/lib/invoice/application/commands/CreateInvoiceCommands";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const repository = new PostgresInvoiceRepository(sql);
  const cmd = new CreateInvoiceCommand(customerId, amount, status);
  const service = new CreateInvoiceService(repository, cmd);

  await service.execute();

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
