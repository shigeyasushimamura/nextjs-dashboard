import { Invoice } from "../../domain/models/Invoice";
import { IInvoiceRepository } from "../../domain/repository/IInvoiceRepository";
import postgres from "postgres";

export class PostgresInvoiceRepository implements IInvoiceRepository {
  constructor(private readonly sql: postgres.Sql) {}

  async save(invoice: Invoice): Promise<void> {
    try {
      await this.sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${invoice.getCustomerId()}, ${invoice.getAmount()}, ${invoice.getStatus()}, ${invoice.getDate()})
        `;
      //   console.log("Invoice inserted successfully");
    } catch (error) {
      //   console.error("Error inserting invoice:", error);
      throw new Error("Failed to insert invoice");
    }
  }
}
