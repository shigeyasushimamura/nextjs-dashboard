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

  async update(
    id: string,
    customerId: string,
    amount: number,
    status: string
  ): Promise<void> {
    try {
      await this.sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amount}, 
        status = ${status} where id = ${id}
      `;
    } catch (error) {
      throw new Error("Failed to update invoice");
    }
  }

  async delete(id: string) {
    try {
      await this.sql`
      DELETE FROM invoices WHERE id=${id}
      `;
    } catch (error) {
      throw new Error("Failed to delete invoice");
    }
  }
}
