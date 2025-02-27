import { Invoice } from "../models/Invoice";

export interface IInvoiceRepository {
  save(invoice: Invoice): Promise<void>;
}
