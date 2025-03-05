import { Update } from "next/dist/build/swc/types";
import { Invoice } from "../../domain/models/Invoice";
import { IInvoiceRepository } from "../../domain/repository/IInvoiceRepository";
import {
  CreateInvoiceCommand,
  DeleteInvoiceCommand,
  UpdateInvoiceCommand,
} from "../commands/CreateInvoiceCommands";

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

export class UpdateInvoiceService
  extends InvoiceService
  implements ITransaction
{
  constructor(
    invoiceRepository: IInvoiceRepository,
    private readonly cmd: UpdateInvoiceCommand
  ) {
    super(invoiceRepository);
  }

  async execute(): Promise<void> {
    await this.update();
  }

  private async update() {
    // store monetary values in cents in database
    const amountInCents = this.cmd.amount * 100;
    await this.invoiceRepository.update(
      this.cmd.id,
      this.cmd.customerId,
      amountInCents,
      this.cmd.status
    );
  }
}

export class DeleteInvoiceService
  extends InvoiceService
  implements ITransaction
{
  constructor(
    invoiceRepository: IInvoiceRepository,
    private readonly cmd: DeleteInvoiceCommand
  ) {
    super(invoiceRepository);
  }
  async execute(): Promise<void> {
    this.delete();
  }

  private async delete() {
    await this.invoiceRepository.delete(this.cmd.id);
  }
}
