import { Invoice } from "../../domain/models/Invoice";
import { IInvoiceRepository } from "../../domain/repository/IInvoiceRepository";
import { CreateInvoiceCommand } from "../commands/CreateInvoiceCommands";

interface ITransaction {
  execute(): Promise<void>;
}

export abstract class InvoiceService {
  constructor(protected readonly invoiceRepository: IInvoiceRepository) {}
}

export class CreateInvoiceService
  extends InvoiceService
  implements ITransaction
{
  constructor(
    invoiceRepository: IInvoiceRepository,
    private readonly cmd: CreateInvoiceCommand
  ) {
    super(invoiceRepository);
  }

  async execute(): Promise<void> {
    await this.create();
  }

  private async create() {
    // store monetary values in cents in database
    const amountInCents = this.cmd.amount * 100;
    // 世界標準時
    const date = new Date().toISOString().split("T")[0];

    const invoice = new Invoice(
      null,
      this.cmd.customerId,
      amountInCents,
      this.cmd.status,
      date
    );

    await this.invoiceRepository.save(invoice);
  }
}
