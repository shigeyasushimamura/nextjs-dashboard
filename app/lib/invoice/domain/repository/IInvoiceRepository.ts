import { Invoice } from "../models/Invoice";

export interface IInvoiceRepository {
  save(invoice: Invoice): Promise<void>;
  update(
    id: string,
    customerId: string,
    amount: number,
    status: string
  ): Promise<void>;
  delete(id: string): Promise<void>;
}
